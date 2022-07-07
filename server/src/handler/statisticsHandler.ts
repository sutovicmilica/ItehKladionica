import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Play } from "../entity/Play";
import { Quota } from "../entity/Quota";

export async function getStatistics(request: Request, response: Response) {

  const statistics = await AppDataSource
    .getRepository(Play)
    .createQueryBuilder('p')
    .select('p.id', 'id')
    .addSelect('p.name', 'name')
    .addSelect(`SUM(CASE WHEN q.status='PENDING' THEN 1 ELSE 0 END)`, 'totalPending')
    .addSelect(`SUM(CASE WHEN q.status='WON' THEN 1 ELSE 0 END)`, 'totalWon')
    .addSelect(`SUM(CASE WHEN q.status='LOST' THEN 1 ELSE 0 END)`, 'totalLost')
    .addSelect(`SUM(CASE WHEN q.status='CANCELED' THEN 1 ELSE 0 END)`, 'totalCanceled')
    .leftJoin(Quota, 'q', 'q.play.id = p.id')
    .groupBy('p.id')
    .getRawMany();

  response.json(statistics);
}