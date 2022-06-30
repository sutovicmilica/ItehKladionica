import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketItem } from "./TicketItem";
import { User } from "./User";


@Entity()
export class Ticket {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date

  @Column({
    type: 'enum',
    enum: ['PENDING', 'WON', 'LOST']
  })
  status: 'PENDING' | 'WON' | 'LOST';

  @ManyToOne(() => User, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  user?: User;


  @OneToMany(() => TicketItem, i => i.ticket, { cascade: ['insert'] })
  items: TicketItem[]
}