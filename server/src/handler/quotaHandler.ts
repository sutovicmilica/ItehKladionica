import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { Play } from "../entity/Play";
import { Quota } from "../entity/Quota";
import { Ticket } from "../entity/Ticket";
import { TicketItem } from "../entity/TicketItem";
import { PlayStatus } from "../entity/types";
interface QuotaDto {
  value: number,
  gameId: number,
  playId: number,
}

export async function getQuotas(request: Request, response: Response) {

  const quotas = await AppDataSource.getRepository(Quota).find({
    relations: {
      play: true,
      game: true
    }
  });
  response.json(quotas);
}

export async function createQuota(request: Request, response: Response) {
  const data = request.body as QuotaDto;
  const play = await AppDataSource.getRepository(Play).findOne({ where: { id: data.playId } });
  const game = await AppDataSource.getRepository(Game).findOne({ where: { id: data.gameId } });

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

  await AppDataSource.manager.transaction(async manager => {
    await manager.save(Quota, { id, status });
    const qb = manager.createQueryBuilder(Ticket, 't')
    const tickets = await qb
      .innerJoinAndSelect('t.items', 'item')
      .innerJoinAndSelect('item.quota', 'quota')
      .where(':id IN ' +
        qb.subQuery()
          .select('id')
          .from(TicketItem, 'ti1')
          .where('ti1.ticketId = t.id')
          .getQuery()
      )
      .setParameter('id', id)
      .getMany();

    for (let ticket of tickets) {
      let rejected = false;
      let pending = false;
      for (let ticketItem of ticket.items) {
        let itemStatus = ticketItem.quota.status;
        if (itemStatus === 'LOST') {
          rejected = true;
          break;
        }
        if (itemStatus === 'PENDING') {
          pending = true;
        }
      }
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

  });

  response.sendStatus(204);

}