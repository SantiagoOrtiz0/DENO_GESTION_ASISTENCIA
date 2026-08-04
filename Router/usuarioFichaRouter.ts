import { Router } from "../Dependencies/dependencias.ts";
import { getUsuarioFicha } from "../Controller/usuarioFichaController.ts";

const usuarioFichaRouter = new Router();
usuarioFichaRouter.get("/usuarioficha", getUsuarioFicha);
export {usuarioFichaRouter};