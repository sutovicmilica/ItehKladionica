import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quota } from "./Quota";
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

  @OneToMany(() => Quota, q => q.game)
  quotas: Quota[];
}