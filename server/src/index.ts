import * as express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import * as jwt from 'jsonwebtoken'
import { TOKEN } from "./entity/types"
import { User } from "./entity/User"
import { login, register } from "./handler/userHandler"
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.json())


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
    })

    // register express routes from defined application routes
    Routes.forEach(route => {
        app[route.method](route.path, ...route.actions)
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
