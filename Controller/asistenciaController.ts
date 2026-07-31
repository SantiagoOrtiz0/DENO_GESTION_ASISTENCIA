import { Context } from "../Dependencies/dependencias.ts";
import { Asistencia } from "../Model/AsistenciaModel.ts";

export const getAsistencia = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const ObjAsistencia = new Asistencia();
        const ListaAsistencias = await ObjAsistencia.SeleccionarAsistencia();

        response.status = 200;
        response.body = {
            success: true,
            data: ListaAsistencias
        };
    }catch (error){
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const postAsistencia = async (ctx:Context) => {
    const { request,response } = ctx;
    try{
        const body = await request.body.json();
        const { idAprendiz,idHorario_Ficha_Asignatura, Fecha, Estado } = body;

        const nuevaAsistencia = new Asistencia({
            idAsistencia: null,
            idAprendiz,
            idHorario_Ficha_Asignatura,
            Fecha,
            Estado,
        });

        const result  = await nuevaAsistencia.InsertarAsistencia();
        response.status = 201;
        response.body = {
            success: true,
            message: "Asistencia Registrada",
            data: result
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al registrar la asistencia",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const putAsistencia = async (ctx:Context) => {
    const { response, request } = ctx;
    try{
        const body = await request.body.json();
        const {idAsistencia, idAprendiz, idHorario_Ficha_Asignatura, Fecha, Estado} = body;

        const ObjAsistencia = new Asistencia({
            idAsistencia,
            idAprendiz,
            idHorario_Ficha_Asignatura,
            Fecha,
            Estado
        }, idAsistencia);

        const result = await ObjAsistencia.ActualizarAsistencia();

        response.status = 200;
        response.body = {
            success: true,
            message: "Asistencia actualizada",
            data: result
        };
    } catch (error){
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar asistencia",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const deleteAsistencia = async (ctx:Context) => {
    const {request, response} = ctx;
    try{
        const body = await request.body.json();
        const {idAsistencia} = body;

        const ObjAsistencia = new Asistencia(null, idAsistencia);
        const result = await ObjAsistencia.EliminarAsistencia();

        response.status = 200;
        response.body = {
            success: true,
            message: "Asistencia eliminada",
            data: result
        };
    } catch (error){
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar la asistencia",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};