import Express from "express";
import dotenv from "dotenv";

import rotasProdutos from './routes/produtos';

dotenv.config();

const server = Express();

server.use(rotasProdutos);

server.listen(process.env.PORT);
console.log(`Rodando na porta: ${process.env.PORT}`);