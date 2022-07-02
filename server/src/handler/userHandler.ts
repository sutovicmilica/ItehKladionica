import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken'
import { TOKEN } from "../entity/types";

export async function login(request: Request, response: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: request.body.email,
      password: request.body.password
    }
  });
  if (!user) {
    response.status(400).json({
      error: 'No such user'
    });
    return;
  }
  (request as any).user = user;
  const token = jwt.sign({ id: user.id }, TOKEN)
  response.json({
    ...user,
    token
  });
}

export async function register(request: Request, response: Response) {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOne({
    where: {
      email: request.body.email
    }
  });
  if (user) {
    response.status(400).json({
      error: 'User already exists'
    });
    return;
  }
  const insertResult = await userRepository.insert({
    ...request.body,
    type: 'user'
  });
  const id = insertResult.identifiers[0].id;
  user = await userRepository.findOne(id);
  (request as any).user = user;
  const token = jwt.sign({ id: user.id }, TOKEN)
  response.json({
    ...user,
    token
  });
}

export function check(request: Request, response: Response) {
  response.json((request as any).user);
}