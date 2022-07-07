import * as express from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import * as jwt from 'jsonwebtoken'
import { TOKEN } from "./entity/types"
import { User } from "./entity/User"
import * as cors from 'cors'
import { login, register } from "./handler/userHandler"
AppDataSource.initialize().then(async () => {

    const app = express()
    app.use(express.json())
    app.use(cors());


    app.post('/login', login);
    app.post('/register', register);



    app.use(async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.sendStatus(401);
            return;
        }
        const splitted = authorization.split(' ');
        if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
            res.sendStatus(401);
            return;
        }
        try {
            const parsed = jwt.verify(splitted[1], TOKEN) as { id: number }
            const user = await AppDataSource.getRepository(User).findOne({
                where: {
                    id: parsed.id
                }
            })
            if (!user) {
                res.sendStatus(401);
                return;
            }
            (req as any).user = user;
            next();
        } catch (error) {
            res.status(400).json({ error })
        }
    })

    Routes.forEach(route => {
        app[route.method](route.path, ...route.actions)
    })

    app.listen(5000, () => {
        console.log("Express server has started on port 5000. Open http://localhost:5000/users to see results")
    })



}).catch((error: any) => console.log({
    ...error
}))
