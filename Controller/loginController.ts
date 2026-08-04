import { Context } from "../Dependencies/dependencias.ts";
import { conexion } from "../Model/conexion.ts";
import { generarToken } from "../Utils/jwt.ts";
import { bcrypt } from "../Dependencies/dependencias.ts";
import { rol } from "../Model/RolModel.ts";

export const PostLogin = async (ctx: Context) => {
    const body = await ctx.request.body.json();
    const {Nombres, Apellidos, contrasena} = body;

    if (!Nombres || !Apellidos || !contrasena) {
        ctx.response.status = 400;
        ctx.response.body = {mensaje: "Nombres, Apellidos y constraseña son obligatorios"};
        return;
    }

    const {rows: usuario} = await conexion.execute(
        `select u.*, r.NombreRol
         from usuario u
         left join rol r on u.idRol = r.idRol
         where u.nombres = ? and u.apellidos = ?`,
        [Nombres, Apellidos]
    );

    if (usuario && usuario.length > 0) {
        const encontrado = usuario[0];

        if (!(await bcrypt.compare(contrasena,encontrado.contrasena))) {
            ctx.response.status = 401;
            ctx.response.body = {mensaje: "Contraseña incorrecta"}; 
            return;
        }

        const token = await generarToken({
            idUsuario: encontrado.idUsuario,
            nombres: encontrado.nombres,
            apellidos: encontrado.apellidos,
            idRol: encontrado.idRol,
            tipo: "usuario",
        });

        const panel = encontrado.NombreRol === "administrador" ? "administrador" : "instructor";

        ctx.response.status = 200;
        ctx.response.body = {mensaje: "Login exitoso", token, tipo: "usuario", panel};
        return;
    }

    const {rows: aprendices} = await conexion.execute(
        `select  * from aprendiz where Nombres = ? and Apellidos = ?`,
        [Nombres, Apellidos]
    );

    if(aprendices && aprendices.length > 0 ) {
        const encontrado = aprendices[0];
        const panel = "aprendiz";

        if(!(await bcrypt.compare(contrasena,encontrado.contrasena))) {
            ctx.response.status = 401;
            ctx.response.body = {mensaje: "Contraseña incorrecta"};
            return;
        }

        const token = await generarToken({
            idAprendiz: encontrado.idAprendiz, 
            Nombres: encontrado.Nombres,
            Apellidos: encontrado.Apellidos,
            idFicha: encontrado.idFicha,
            tipo: "aprendiz",
            panel,
        });

        ctx.response.status = 200;
        ctx.response.body = {mensaje: "Login exitoso", token, tipo: "aprendiz", panel,idAprendiz: encontrado.idAprendiz};
        return;
    }

    ctx.response.status = 400;
    ctx.response.body = {mensaje: "Usuario no encontrado"};
};
