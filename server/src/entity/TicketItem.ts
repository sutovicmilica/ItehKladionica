import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quota } from "./Quota";
import { Ticket } from "./Ticket";



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

  @Column({
    type: 'enum',
    enum: ['PENDING', 'WON', 'LOST']
  })
  status: 'PENDING' | 'WON' | 'LOST';

  @ManyToOne(() => Quota, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  @JoinColumn({ name: 'quotaId' })
  quota?: Quota;
}