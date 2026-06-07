import { Request, Response } from "express";
import { Adicionar, AdicionarValor, EditarAtributo, EditarValor } from "./schema/AtributosSchema";
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

    async adicionarValorAtributo(Req: Request<{id: string}>, Res: Response) {
        try {
            await AdicionarValor.validate(Req.body);

            if(!Req.params.id) {
                throw new Error("Por favor, selecione um atributo para adicionar o valor.")
            }

            const atributos = await AtributosServiceFactory.adicionarValorAtributo(Req.body, Req.params.id);

            Res.status(201).json(atributos);

            console.log(Req.body, Req.params.id)
        } catch(err: any) {
            Res.status(400).json({ error:  err.message });
        }
    }

    async editarAtributo(Req: Request<{id: string}>, Res: Response) {
        try {
            await EditarAtributo.validate(Req.body);

            const atributoEditado = await AtributosServiceFactory.editarAtributo(Req.body, Req.params.id);
            Res.status(200).json(atributoEditado);

        } catch (err:any){
            Res.status(400).json({ error: err.message});
        }
    }

    async editarValorAtributo(Req: Request<{id: string}>, Res: Response) {
        try {

            await EditarValor.validate(Req.body);

            const valorAtributoEditado = await AtributosServiceFactory.editarValorAtributo(Req.body, Req.params.id);
            Res.status(200).json(valorAtributoEditado);

        } catch (err:any){
            Res.status(400).json({ error: err.message});
        }
    }

}

export default AtributosController;