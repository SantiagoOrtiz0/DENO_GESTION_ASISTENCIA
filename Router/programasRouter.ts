import { Router } from "../Dependencies/dependencias.ts";
import { getPrograma, postPrograma, putProgama } from "../Controller/programaController.ts";
import { deletePrograma } from "../Model/ProgramaModel.ts";

const programaRouter = new Router();

programaRouter.get("/programa", getPrograma)
programaRouter.post("/Programa", postPrograma)
programaRouter.put("/programa", putProgama)
programaRouter.delete("/programa", deletePrograma)

export {programaRouter};