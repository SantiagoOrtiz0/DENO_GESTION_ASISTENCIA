import { Context } from "../Dependencies/dependencias.ts";
import { horario } from "../Model/HorarioModel.ts";

export const getHorario = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const objHorario = new horario();
        const ListaHorarios = await objHorario.SeleccionarHorario();

        response.status = 200;
        response.body = {
            success: true,
            data: ListaHorarios
        };
    } catch (error) {
        console.error("Error al consultar horarios:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const postHorario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {Dia, HoraInicio, HoraFin} = body;

        const nuevoHorario = new horario({
            idHorario: null,
            Dia,
            HoraInicio,
            HoraFin
        });

        const result = await nuevoHorario.InsertarHorario();

        response.status = 201;
        response.body = {
            success: true,
            message: "Horario registrado",
            data: result
        };
    } catch (error) {
        console.error("Error al registrar horario:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al registrar horario",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const putHorario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idHorario, Dia, HoraInicio, HoraFin} = body;

        const objHorario = new horario({
            idHorario,
            Dia,
            HoraInicio,
            HoraFin
        }, idHorario);

        const result = await objHorario.ActualizarHorario();

        response.status = 200;
        response.body = {
            success: true,
            message: "Horario actualizado",
            data: result
        };
    } catch (error) {
        console.error("Error al actualizar horario:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar horario",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const deleteHorario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idHorario} = body;

        const objHorario = new horario(null, idHorario);
        const result = await objHorario.EliminarHorario();

        response.status = 200;
        response.body = {
            success: true,
            message: "Horario eliminado",
            data: result
        };
    } catch (error) {
        console.error("Error al eliminar horario:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar horario",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};