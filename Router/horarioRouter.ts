import { Router } from "../Dependencies/dependencias.ts";
import { getHorario, postHorario, putHorario, deleteHorario } from "../Controller/horarioController.ts";

const horarioRouter = new Router();

horarioRouter.get("/horario", getHorario)
horarioRouter.post("/horario", postHorario)
horarioRouter.put("/horario", putHorario)
horarioRouter.delete("/horario", deleteHorario)

export {horarioRouter};