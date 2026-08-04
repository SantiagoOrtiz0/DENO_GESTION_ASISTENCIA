import { Router } from "../Dependencies/dependencias.ts";
import { getUsuarioAsignatura } from "../Controller/usuarioAsignaturaController.ts";

const usuarioAsignaturaRouter = new Router();
usuarioAsignaturaRouter.get("/usuarioasignatura", getUsuarioAsignatura);
export {usuarioAsignaturaRouter};