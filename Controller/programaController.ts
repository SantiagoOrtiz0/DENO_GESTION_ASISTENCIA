import { RouterContext } from "../Dependencies/dependencias.ts";
import { Context } from "../Dependencies/dependencias.ts";
import { programa } from "../Model/ProgramaModel.ts";

type ProgramaParams = {
  id: string;
} & Record<string, string | undefined>;

export const getPrograma = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const objPrograma = new programa();
        const ListaProgramas = await objPrograma.SeleccionarPrograma();

        response.status = 200;
        response.body = {
            success : true,
            data : ListaProgramas
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success : false,
            message: "Error al procesar la solicitud",
            errors : error
        };
    }
}

export const postPrograma = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {nombrePrograma} = body;

        const nuevoPrograma = new programa ({
            idPrograma: null,
            nombrePrograma
        });

        const result = await nuevoPrograma.InsertarPrograma();
        response.status = 201;
        response.body ={
            success : true,
            message: "Programa registrado",
            data: result
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al registar programa",
            errors: error
        };
    }
}

export const putProgama = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idPrograma, nombrePrograma} = body;

        const objPrograma = new programa ({
            idPrograma,
            nombrePrograma,
        }, idPrograma);

        const result = await objPrograma.ActualizarPrograma();

        response.status = 200;
        response.body = {
            success: true,
            message: "Programa actualizado",
            data: result,
        };
    } catch (error) {
            console.error("Error al actualizar programa", error)
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar programa",
            erros: error instanceof Error ? error.message : String(error),
        };
    }
};
