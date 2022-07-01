import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quota } from "./Quota";
import { Ticket } from "./Ticket";
import { PlayStatus } from "./types";



@Entity()
export class TicketItem {

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  ticketId: number;

  @ManyToOne(() => Ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @Column({ nullable: true })
  quotaId?: number;

  @Column()
  quotaValue: number;

  @ManyToOne(() => Quota, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  @JoinColumn({ name: 'quotaId' })
  quota?: Quota;
}