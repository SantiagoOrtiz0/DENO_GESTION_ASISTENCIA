import {Context, Next} from "../Dependencies/dependencias.ts";
import { verificarToken } from "../Utils/jwt.ts";

export const Auth = async (ctx: Context, next: Next) => {
    const authHeader = ctx.request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        ctx.response.status = 401;
        ctx.response.body = {mensaje: "Token no proporcionado"};
        return;
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const payload = await verificarToken(token);
        ctx.state.usuario = payload;
        await next();
    } catch (_error) {
        ctx.response.status = 401;
        ctx.response.body = {mensaje: "Token invalido o expirado"};       
    }
};