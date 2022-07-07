import { NextFunction, Request, Response } from "express"
import { Play } from "./entity/Play";
import { Team } from "./entity/Team";
import { User } from "./entity/User"
import { getEntities } from "./handler/basicHandler";
import { createGame, deleteGame, getGame, getGames } from "./handler/gameHandler";
import { changeStatus, createQuota, getQuotas } from "./handler/quotaHandler";
import { getStatistics } from "./handler/statisticsHandler";
import { createTicket, getAdminTickets, getClientTickets } from "./handler/ticketHandler";
import { check } from "./handler/userHandler";
import { getWeather } from "./handler/weatherHandler";


interface Route {
  method: 'get' | 'post' | 'patch' | 'delete',
  path: string,
  actions: any[]
}


const typeMiddleware = (userType: 'user' | 'admin') => (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as User;
  if (user.type !== userType) {
    res.sendStatus(403);
    return;
  }
  next();
}

export const Routes: Route[] = [
  {
    method: 'get',
    path: '/user',
    actions: [check]
  },
  {
    method: 'get',
    path: '/user/ticket',
    actions: [typeMiddleware('user'), getClientTickets]
  },
  {
    method: 'get',
    path: '/admin/ticket',
    actions: [typeMiddleware('admin'), getAdminTickets]
  },
  {
    method: 'post',
    path: '/user/ticket',
    actions: [typeMiddleware('user'), createTicket]
  },
  {
    method: 'get',
    path: '/play',
    actions: [getEntities(Play)]
  },
  {
    method: 'get',
    path: '/team',
    actions: [getEntities(Team)]
  },
  {
    method: 'get',
    path: '/weather',
    actions: [getWeather]
  },
  {
    method: 'get',
    path: '/admin/quota',
    actions: [typeMiddleware('admin'), getQuotas]
  },
  {
    method: 'post',
    path: '/admin/quota',
    actions: [typeMiddleware('admin'), createQuota]
  },
  {
    method: 'patch',
    path: '/admin/quota/:id',
    actions: [typeMiddleware('admin'), changeStatus]
  },
  {
    method: 'get',
    path: '/game',
    actions: [getGames]
  },
  {
    method: 'get',
    path: '/game/:id',
    actions: [getGame]
  },
  {
    method: 'post',
    path: '/game',
    actions: [typeMiddleware('admin'), createGame]
  },
  {
    method: 'delete',
    path: '/game/:id',
    actions: [typeMiddleware('admin'), deleteGame]
  },
  {
    method: 'get',
    path: '/statistics',
    actions: [typeMiddleware('admin'), getStatistics]
  },
]