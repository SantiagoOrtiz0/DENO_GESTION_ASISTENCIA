import { Router } from "../Dependencies/dependencias.ts";
import { PostLogin } from "../Controller/loginController.ts";

const loginRouter = new Router();

loginRouter.post("/login", PostLogin);

export {loginRouter};