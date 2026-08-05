import { Router } from "../Dependencies/dependencias.ts";
import { getHorarioFichaAsignatura,postHorarioFichaAsignatura,putHorarioFichaAsignatura,deleteHorarioFichaAsignatura } from "../Controller/horarioFichaAsignaturaController.ts";


const horarioFichaAsignaturaRouter = new Router();
horarioFichaAsignaturaRouter.get("/horarioFichaAsignatura", getHorarioFichaAsignatura);
horarioFichaAsignaturaRouter.post("/horarioFichaAsignatura", postHorarioFichaAsignatura);
horarioFichaAsignaturaRouter.put("/horarioFichaAsignatura", putHorarioFichaAsignatura);
horarioFichaAsignaturaRouter.delete("/horarioFichaAsignatura", deleteHorarioFichaAsignatura);

export { horarioFichaAsignaturaRouter };