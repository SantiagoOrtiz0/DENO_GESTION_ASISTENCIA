import { Context } from "../Dependencies/dependencias.ts";
import { usuarioFicha } from "../Model/UsuarioFichaModel.ts";

export const getUsuarioFicha = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const obj = new usuarioFicha();
        const Lista = await obj.SeleccionarUsuarioFicha();
        response.status = 200;
        response.body = { success: true, data: Lista };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
}