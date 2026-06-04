import { Router } from "express";
import AtributosController from "../../controllers/AtributosController";

const routes = Router();
const atributosController = new AtributosController();

routes.post('/produtos', atributosController.adicionar);

export default routes;