import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import bodyParser from "body-parser";
import cors from 'cors';
import { Task } from "./tasks/tasks.entity";

const app: Express = express();
dotenv.config();

// init middlewares
app.use(bodyParser.json());
app.use(cors());

// Create connection
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Task],
    synchronize: true,
});

const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
    res.send('Demo Todo Api using Typescript');
})

AppDataSource.initialize().then(() => {
    app.listen(port, () => console.log('listening port', port));
    console.log('Data source initialized...!');
}).catch((error) => {
    console.log(`Error while initialize data source: ${error}`);
})
