import { Router } from "../Dependencies/dependencias.ts";
import { getPrograma, postPrograma, putProgama, deletePrograma } from "../Controller/programaController.ts";

const programaRouter = new Router();

programaRouter.get("/programa", getPrograma)
programaRouter.post("/Programa", postPrograma)
programaRouter.put("/programa", putProgama)
programaRouter.delete("/programa", deletePrograma)

export {programaRouter};