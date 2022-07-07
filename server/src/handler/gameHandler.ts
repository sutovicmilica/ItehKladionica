import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { Quota } from "../entity/Quota";
import { Team } from "../entity/Team";
import { TicketItem } from "../entity/TicketItem";

interface GameDto {
  date: number,
  hostId: number,
  guestId: number
}


export async function createGame(request: Request, response: Response) {
  const body = request.body as GameDto;
  const host = await AppDataSource.getRepository(Team).findOne({ where: { id: body.hostId } })
  const guest = await AppDataSource.getRepository(Team).findOne({ where: { id: body.guestId } })
  const game = await AppDataSource.getRepository(Game).save({
    date: new Date(body.date),
    guest,
    host,
  })
  response.json(game);
}

export async function getGame(request: Request, response: Response) {
  const id = Number(request.params.id);
  const game = await AppDataSource.getRepository(Game)
    .findOne({
      where: {
        id
      },
      relations: {
        guest: true,
        host: true,
        quotas: {
          play: true
        }
      },
    });
  response.json(game);
}


export async function getGames(request: Request, response: Response) {
  const page = Number(request.query.page) || 0;
  const size = Number(request.query.size) || 20;
  const date = request.query.date ? new Date(Number(request.query.date)) : undefined;
  const search = request.query.search || '';

  const queryBuilder = AppDataSource.getRepository(Game)
    .createQueryBuilder('g')
    .leftJoinAndSelect('g.host', 'host')
    .leftJoinAndSelect('g.guest', 'guest')
  if (date) {
    queryBuilder.where('DATE(g.date) >= DATE(:d)', { d: date });
    if (search) {
      queryBuilder.andWhere(`CONCAT(host.name,'-',guest.name) LIKE :search`, {
        search: `%${search}%`
      })
    }
  }
  if (search && !date) {
    queryBuilder.where(`CONCAT(host.name,'-',guest.name) LIKE :search`, {
      search: `%${search}%`
    })
  }
  const [games, count] = await queryBuilder.orderBy('g.date', 'ASC').limit(size).offset(page * size).getManyAndCount();
  response.json({
    data: games,
    total: count
  })
}

export async function deleteGame(request: Request, response: Response) {
  const id = Number(request.params.id);

  await AppDataSource.manager.transaction(async manager => {
    const ticketItems = await manager.find(TicketItem, {
      where: {
        quota: {
          game: {
            id
          }
        }
      }
    })

    const quotas = await manager.find(Quota, {
      where: {
        game: {
          id
        }
      }
    })
    quotas.forEach(quota => {
      quota.status = 'CANCELED'
    })
    await manager.save(Quota, quotas);
    ticketItems.forEach(item => {
      item.quotaValue = 1;

    })
    await manager.save(TicketItem, ticketItems);
    await manager.delete(Game, { id: id });
  })

  response.sendStatus(204);
}