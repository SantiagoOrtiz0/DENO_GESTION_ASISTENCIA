import { Router } from "../Dependencies/dependencias.ts";
import { getFicha } from "../Controller/fichaController.ts"

const fichaRouter = new Router();
fichaRouter.get("/ficha", getFicha);
export {fichaRouter};