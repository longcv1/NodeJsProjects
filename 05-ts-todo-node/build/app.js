"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const tasks_entity_1 = require("./tasks/tasks.entity");
const app = (0, express_1.default)();
dotenv_1.default.config();
// init middlewares
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Create connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true,
});
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Demo Todo Api using Typescript');
});
exports.AppDataSource.initialize().then(() => {
    app.listen(port, () => console.log('listening port', port));
    console.log('Data source initialized...!');
}).catch((error) => {
    console.log(`Error while initialize data source: ${error}`);
});
