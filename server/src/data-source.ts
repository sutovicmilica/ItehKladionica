import "reflect-metadata"
import { DataSource } from "typeorm"
import { Game } from "./entity/Game"
import { Play } from "./entity/Play"
import { Quota } from "./entity/Quota"
import { Team } from "./entity/Team"
import { Ticket } from "./entity/Ticket"
import { TicketItem } from "./entity/TicketItem"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "kladionica",
    logging: false,
    entities: [Game, Play, Quota, Team, Ticket, TicketItem, User],
    migrations: ["src/migration/**/*.ts"],
})
