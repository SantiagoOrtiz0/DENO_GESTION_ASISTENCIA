import { Router } from "../Dependencies/dependencias.ts";
import { getAprendices, postRegistrarAprendiz } from "../Controller/registroController.ts";

const AprendizRouter = new Router();

AprendizRouter.get("/Registro",getAprendices);
AprendizRouter.post("/Registro",postRegistrarAprendiz);

export {AprendizRouter};