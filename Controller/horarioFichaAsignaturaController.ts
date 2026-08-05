import { Context } from "../Dependencies/dependencias.ts";
import { horarioFichaAsignatura } from "../Model/HorarioFichaAsignaturaModel.ts";

export const getHorarioFichaAsignatura = async (ctx:Context) => {
    const {response} = ctx;
    try{
        const Obj = new horarioFichaAsignatura();
        const Lista = await Obj.SeleccionarHorarioFichaAsignatura();
        response.status = 200;
        response.body = {
            success: true,
            data: Lista
        };
    } catch (error){
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al procesar la solicitud",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};

export const postHorarioFichaAsignatura = async (ctx:Context) => {
    const {request,response} = ctx;
    try{
        const body = await request.body.json();
        const {idFicha, idHorario, idAsignatura} = body;
        const nuevo = new horarioFichaAsignatura ({ 
            idHorario_Ficha_Asignatura: null,
            idFicha,
            idHorario,
            idAsignatura
        });
        const resultado = await nuevo.InsertarHorarioFichaAsignatura();
        response.status = 201;
        response.body = {
            success: true,
            message: "Relacion creada",
            data: resultado
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al crear la relación",
            errors: error instanceof Error ? error.message : String(error)
        };
    }
};


export const putHorarioFichaAsignatura = async (ctx:Context) => {
    const {request,response} = ctx;
    try{
        const body = await request.body.json();
        const {idHorario_Ficha_Asignatura, idFicha, idHorario, idAsignatura} = body;
        const Obj = new horarioFichaAsignatura({idHorario_Ficha_Asignatura, idFicha, idHorario, idAsignatura}, idHorario_Ficha_Asignatura);
        const resultado = await Obj.ActualizarHorarioFichaAsignatura();
          response.status = 200;
        response.body = { 
            success: true,
             message: "Relación actualizada",
              data: resultado
             };
    } catch (error) {
        response.status = 400;
        response.body = { success: false, 
            message: "Error al actualizar la relación", 
            errors: error instanceof Error ? error.message : String(error)
         };
    }
};
 export const deleteHorarioFichaAsignatura = async (ctx: Context) => {
    const { request, response } = ctx;
    try {
        const body = await request.body.json();
        const { idHorario_Ficha_Asignatura } = body;
        const obj = new horarioFichaAsignatura(null, idHorario_Ficha_Asignatura);
        const result = await obj.EliminarHorarioFichaAsignatura();
        response.status = 200;
        response.body = { 
            success: true,
             message: "Relación eliminada",
              data: result 
            };
    } catch (error) {
        response.status = 400;
        response.body = { success: false,
             message: "Error al eliminar la relación",
              errors: error instanceof Error ? error.message : String(error) 
            };
    }
};