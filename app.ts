import { Application, oakCors } from "./Dependencies/dependencias.ts";
import { UserRouter } from "./Router/userRouter.ts";

const app = new Application();

app.use(oakCors({
    origin:"*"
}));

const routes = [UserRouter];

routes.forEach(router =>{
    app.use(router.routes());
    app.use(router.allowedMethods());
})

console.log("Servidor corriendo por el puerto 8001");
app.listen({port:8001});