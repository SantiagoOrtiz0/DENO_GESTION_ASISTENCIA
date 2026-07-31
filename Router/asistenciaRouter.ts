import { Router } from "../Dependencies/dependencias.ts";
import { getAsistencia, postAsistencia, putAsistencia, deleteAsistencia } from "../Controller/asistenciaController.ts";

const asistenciaRouter = new Router();

asistenciaRouter.get("/asistencia",getAsistencia);
asistenciaRouter.post("/asistencia",postAsistencia);
asistenciaRouter.put("/asistencia",putAsistencia);
asistenciaRouter.delete("/asistencia",deleteAsistencia);

export {asistenciaRouter};










