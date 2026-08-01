import { Router } from "../Dependencies/dependencias.ts";
import { getAprendizCrud, postAprendizCrud, putAprendizCrud, deleteAprendizCrud } from "../Controller/aprendizController.ts";

const AprendizCrudRouter = new Router();

AprendizCrudRouter.get("/Aprendiz",getAprendizCrud);
AprendizCrudRouter.post("/Aprendiz",postAprendizCrud);
AprendizCrudRouter.put("/Aprendiz", putAprendizCrud);
AprendizCrudRouter.delete("/Aprendiz", deleteAprendizCrud);

export {AprendizCrudRouter};