import { Request, Response } from "express";
import { AppDataSource } from "../data-source";



export function getEntities(val: any) {
  return async function f(req: Request, res: Response) {
    const data = await AppDataSource.getRepository(val).find();
    res.json(data);
  }
}