import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Quota } from "../entity/Quota";
import { Ticket } from "../entity/Ticket";
import { TicketItem } from "../entity/TicketItem";
import { User } from "../entity/User";


interface TicketDto {
  amount: number,
  quotas: number[]
}


export async function getClientTickets(request: Request, response: Response) {
  const user = (request as any).user as User;
  const tickets = await AppDataSource.getRepository(Ticket)
    .find({
      relations: {
        items: {
          quota: {
            game: {
              host: true,
              guest: true
            },
            play: true
          }
        }
      },
      where: {
        user: {
          id: user.id
        }
      }
    });
  response.json(tickets);
}

export async function getAdminTickets(request: Request, response: Response) {
  const tickets = await AppDataSource.getRepository(Ticket)
    .find({
      relations: {
        user: true,
        items: {
          quota: {
            game: {
              host: true,
              guest: true
            },
            play: true
          }
        }
      },
    });
  response.json(tickets);
}

export async function createTicket(request: Request, response: Response) {
  const data = request.body as TicketDto;
  const user = (request as any).user as User;
  const now = new Date()
  const ticket = await AppDataSource.manager.transaction(async manager => {
    let newTicket = await manager.save(Ticket, {
      user,
      amount: data.amount,
      date: now,
      status: 'PENDING',
      items: [],
      posibleWin: data.amount
    });

    for (let quotaId of data.quotas) {
      const quota = await manager.findOne(Quota, {
        relations: { game: true },
        where: { id: quotaId }
      });

      if (!quota || new Date(quota.game.date) <= now) {
        throw new Error('qouta invalid');
      }
      const ticketItem = await manager.save(TicketItem, {
        quota,
        quotaId: quotaId,
        quotaValue: quota.value,
        ticketId: newTicket.id,
      })
      newTicket.items.push(ticketItem);
      newTicket.posibleWin = newTicket.posibleWin * quota.value;
      newTicket = await manager.save(Ticket, newTicket);
    }
    return newTicket;
  })

  response.json(ticket);
}
