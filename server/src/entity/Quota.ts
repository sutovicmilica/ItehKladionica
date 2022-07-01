import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";
import { Play } from "./Play";
import { PlayStatus } from "./types";



@Entity()
export class Quota {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => Game)
  game: Game;

  @ManyToOne(() => Play)
  play: Play;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'WON', 'LOST']
  })
  status: PlayStatus;
}

