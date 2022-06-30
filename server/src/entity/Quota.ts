import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";
import { Play } from "./Play";



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
}

