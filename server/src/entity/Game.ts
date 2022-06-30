import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./Team";


@Entity()
export class Game {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  host: Team;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  guest: Team;
}