import { Application, oakCors } from "./Dependencies/dependencias.ts";
import { loginRouter } from "./Router/loginRouter.ts";
import { AprendizRouter } from "./Router/aprendizRegistroRouter.ts";
import { programaRouter } from "./Router/programasRouter.ts";
import { usuarioRouter } from "./Router/usuarioRouter.ts";

const app = new Application();

app.use(oakCors({
    origin:"*"
}));

const routes = [usuarioRouter,loginRouter,AprendizRouter, programaRouter];

routes.forEach(router =>{
    app.use(router.routes());
    app.use(router.allowedMethods());
})

console.log("Servidor corriendo por el puerto 8001");
app.listen({port:8001});