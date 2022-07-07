import { Request, Response } from "express";
import { Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { Play } from "../entity/Play";
import { Quota } from "../entity/Quota";
import { Ticket } from "../entity/Ticket";
import { TicketItem } from "../entity/TicketItem";
interface QuotaDto {
  value: number,
  gameId: number,
  playId: number,
}

export async function getQuotas(request: Request, response: Response) {

  const quotas = await AppDataSource.getRepository(Quota).find({
    relations: {
      play: true,
      game: {
        guest: true,
        host: true
      }
    }
  });
  response.json(quotas);
}


export async function createQuota(request: Request, response: Response) {
  const data = request.body as QuotaDto;
  const play = await AppDataSource.getRepository(Play).findOne({ where: { id: data.playId } });
  const game = await AppDataSource.getRepository(Game).findOne({ where: { id: data.gameId }, relations: { host: true, guest: true } });

  const quota = await AppDataSource.getRepository(Quota).save({
    game,
    play,
    value: data.value,
    status: 'PENDING'
  })
  response.json(quota);
}

export async function changeStatus(request: Request, response: Response) {
  const status = request.body.status;
  const id = Number(request.params.id);

  try {
    await AppDataSource.manager.transaction(async manager => {
      const quota = await manager.findOne(Quota, {
        where: { id },
        relations: {
          game: true
        }
      })
      if (quota.game.date > new Date()) {
        throw new Error('Game not started yet')
      }
      await manager.save(Quota, { id, status });
      const qb = manager.createQueryBuilder(Ticket, 't')
      const tickets = await qb
        .innerJoinAndSelect('t.items', 'item')
        .innerJoinAndSelect('item.quota', 'quota')
        .where(':id IN ' +
          qb.subQuery()
            .select('ti1.quotaId')
            .from(TicketItem, 'ti1')
            .where('ti1.ticketId = t.id')
            .getQuery()
        )
        .setParameter('id', id)
        .getMany();
      for (let ticket of tickets) {
        let rejected = false;
        let pending = false;
        let total = 1;
        for (let ticketItem of ticket.items) {
          total = total * (ticketItem.quota.status === 'CANCELED' ? 1 : ticketItem.quotaValue);
          let itemStatus = ticketItem.quota.status;
          if (itemStatus === 'LOST') {
            rejected = true;
            continue;
          }
          if (itemStatus === 'PENDING') {
            pending = true;
          }
        }
        ticket.posibleWin = ticket.amount * total;
        if (rejected) {
          ticket.status = 'LOST';
          continue;
        }
        if (pending) {
          ticket.status = 'PENDING';
          continue;
        }
        ticket.status = 'WON';
      }
      await manager.save(Ticket, tickets);
    });
  } catch (error) {
    response.status(400).json({ error })
    return;
  }

  response.sendStatus(204);

}