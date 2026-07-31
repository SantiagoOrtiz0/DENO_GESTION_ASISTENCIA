import { Router } from "../Dependencies/dependencias.ts";
import { getUsuario, postUsuario, putUsuario, deleteUsuario } from "../Controller/usuarioController.ts";

const usuarioRouter = new Router();

usuarioRouter.get("/usuario", getUsuario)
usuarioRouter.post("/usuario", postUsuario)
usuarioRouter.put("/usuario", putUsuario)
usuarioRouter.delete("/usuario", deleteUsuario)

export {usuarioRouter};