export interface Game {
  id?: number,
  date: string,
  host: Team,
  guest: Team,
  quotas?: Quota[]
}

export interface Play {
  id: number,
  name: string
}

export interface Quota {
  id?: number,
  value: number,
  game?: Game,
  play: Play,
  status: PlayStatus | 'CANCELED'
}

export interface Team {
  id: number,
  name: string,
  fieldName: string
}

export interface Ticket {
  id?: number,
  date: string,
  status: PlayStatus,
  user?: User,
  items: TicketItem[],
  amount: number,
  posibleWin: number
}

export interface TicketItem {
  id?: number,
  ticketId?: number,
  quotaId?: number,
  quotaValue: number,
  quota?: Quota
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  birthDate: string | Date | number,
  email: string,
  token?: string,
  type: 'user' | 'admin'
}
export type PlayStatus = 'PENDING' | 'WON' | 'LOST';


export interface LoginUser {
  email: string,
  password: string
}

export type RegisterUser = User & { password: string }


export interface Page<T> {
  data: T[],
  total: number
}

export interface QoutaCollection {
  [key: number]: Quota
}