import {asignatura} from "../Model/AsignaturaModel.ts"
import { Context, bcrypt } from "../Dependencies/dependencias.ts"



export const getAsignaturaCrud = async (ctx:Context) => {
    const {response} = ctx;
    try{
        const ObjAsignatura = new asignatura();
        const ListaAsignatura = await ObjAsignatura.SeleccionarAsignatura();

        response.status = 200;
        response.body = {
            success : true,
            data : ListaAsignatura
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success : false,
            message : "Error al procesar la solicitud",
            errors : error
        };
    }
};

export const postAsignaturaCrud = async (ctx:Context) => {
    const {request, response} = ctx;
    try{
        const body = await request.body.json();
        const {NombreAsignatura} = body;

        const nuevoAsignatura = new asignatura({
            idAsignatura: null,
            NombreAsignatura,
        });

        const result = await nuevoAsignatura.InsertarAsignatura();

        response.status = 201;
        response.body = {
            success : true,
            message : "Asignatura registrada",
            data: result
        };
    } catch (error){
        response.status = 400,
        response.body = {
            success : false,
            message : "Error al registrar asignatura",
            errors : error
        };
    }
};

export const putAsignaturaCrud = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idAsignatura, NombreAsignatura} = body;

        const ObjAsignatura = new asignatura({
            idAsignatura,
            NombreAsignatura,
        }, idAsignatura);

        const result = await ObjAsignatura.ActualizarAsignatura();

        response.status = 200;
        response.body = {
            success: true,
            message: "Asignatura actualizada",
            data: result,
        };
    } catch (error) {
        console.error("Error al actualizar asignatura:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar asignatura",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};

export const deleteAsignaturaCrud = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idAsignatura} = body;

        const ObjAsignatura = new asignatura(null, idAsignatura);
        const result = await ObjAsignatura.EliminarAsignatura();

        response.status = 200;
        response.body = {
            success: true,
            message: "Asignatura eliminada",
            data: result,
        };
    } catch (error) {
        console.error("Error al eliminar asignatura:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar asignatura",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};