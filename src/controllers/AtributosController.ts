import { Request, Response } from "express";
import { Adicionar } from "./schema/AtributosSchema";
import { AtributosServiceFactory } from "../factories/AtributosFactory";

class AtributosController {

    async adicionar(Req: Request, Res: Response) {
        try {
            await Adicionar.validate(Req.body);
            const retorno = await AtributosServiceFactory.adicionar(Req.body);
            Res.status(201).json(retorno);
        } catch (err: any) {
            Res.status(400).json({ error: err.message });
        }
    }

}

export default AtributosController;