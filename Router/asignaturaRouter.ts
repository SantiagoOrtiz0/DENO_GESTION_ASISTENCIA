import { Router } from "../Dependencies/dependencias.ts";
import { getAsignaturaCrud, postAsignaturaCrud, putAsignaturaCrud, deleteAsignaturaCrud } from "../Controller/asignaturaController.ts";

const AsignaturaRouter = new Router();

AsignaturaRouter.get("/Asignatura",getAsignaturaCrud);
AsignaturaRouter.post("/Asignatura",postAsignaturaCrud);
AsignaturaRouter.put("/Asignatura", putAsignaturaCrud);
AsignaturaRouter.delete("/Asignatura", deleteAsignaturaCrud);

export {AsignaturaRouter};