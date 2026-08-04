import { Context } from "../Dependencies/dependencias.ts";
import { usuarioAsignatura } from "../Model/UsuarioAsignaturaModel.ts";

export const getUsuarioAsignatura = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const obj = new usuarioAsignatura();
        const Lista = await obj.SeleccionarUsuarioAsignatura();
        response.status = 200;
        response.body = { success: true, data: Lista };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
}