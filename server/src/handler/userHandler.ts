import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken'
import { TOKEN } from "../entity/types";
import * as dateFns from 'date-fns'
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

  const birthDate = new Date(request.body.birthDate);

  if (dateFns.intervalToDuration({
    start: birthDate,
    end: new Date()
  }).years < 18) {
    response.status(400).json({ error: 'You must be at least 18 years old' });
    return;
  }

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
  user = await userRepository.save({
    ...request.body,
    birthDate: new Date(request.body.birthDate),
    type: 'user'
  });
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