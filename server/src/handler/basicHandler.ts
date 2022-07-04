import { Request, Response } from "express";
import { ObjectType } from "typeorm";
import { AppDataSource } from "../data-source";


export function getEntities<T>(val: ObjectType<T>) {
  return async function f(req: Request, res: Response) {
    const data = await AppDataSource.getRepository(val).find();
    res.json(data);
  }
}