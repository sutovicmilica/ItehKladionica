import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";
import { Team } from "../entity/Team";

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

export async function getGames(request: Request, response: Response) {
  const page = Number(request.query.page) || 0;
  const size = Number(request.query.size) || 20;
  const date = Number(request.query.size) || undefined;

  const queryBuilder = AppDataSource.getRepository(Game)
    .createQueryBuilder('g')

  if (date) {
    queryBuilder.where('DATE(g.date) = DATE(:d)', { d: date });
  }
  const [games, count] = await queryBuilder.limit(size).offset(page * size).getManyAndCount();
  response.json({
    data: games,
    total: count
  })
}
