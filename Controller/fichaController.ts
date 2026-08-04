import { Context } from "../Dependencies/dependencias.ts";
import { ficha } from "../Model/FichaModel.ts";

export const getFicha = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const objFicha = new ficha();
        const Lista = await objFicha.SeleccionarFicha();
        response.status = 200;
        response.body = { success: true, data: Lista };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, message: "Error al procesar la solicitud", errors: error };
    }
}