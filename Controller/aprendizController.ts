import {aprendiz} from "../Model/AprendizModel.ts"
import { Context, bcrypt } from "../Dependencies/dependencias.ts"



export const getAprendizCrud = async (ctx:Context) => {
    const {response} = ctx;
    try{
        const ObjAprendiz = new aprendiz();
        const ListaAprendices = await ObjAprendiz.SeleccionarAprendiz();

        response.status = 200;
        response.body = {
            success : true,
            data : ListaAprendices
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

export const postAprendizCrud = async (ctx:Context) => {
    const {request, response} = ctx;
    try{
        const body = await request.body.json();
        const {Nombres, Apellidos, contrasena, idFicha} = body;

        //Encriptacion de la contraseña 
        const hashedPassword = await bcrypt.hash(contrasena);
        console.log("HASH:", hashedPassword);

        const nuevoAprendiz = new aprendiz({
            idAprendiz: null,
            Nombres,
            Apellidos,
            contrasena: hashedPassword,
            idFicha
        });

        const result = await nuevoAprendiz.InsertarAprendiz();

        response.status = 201;
        response.body = {
            success : true,
            message : "Aprendiz registrado",
            data: result
        };
    } catch (error){
        response.status = 400,
        response.body = {
            success : false,
            message : "Error al registrar aprendiz",
            errors : error
        };
    }
};

export const putAprendizCrud = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idAprendiz, Nombres, Apellidos, contrasena, idFicha} = body;

        // Encriptación de la contraseña
        const hashedPassword = contrasena ? await bcrypt.hash(contrasena) : undefined;

        const objAprendiz = new aprendiz({
            idAprendiz,
            Nombres,
            Apellidos,
            ...(hashedPassword ? {contrasena: hashedPassword} : {}),
            idFicha,
        }, idAprendiz);

        const result = await objAprendiz.ActualizarAprendiz();

        response.status = 200;
        response.body = {
            success: true,
            message: "Aprendiz actualizado",
            data: result,
        };
    } catch (error) {
        console.error("Error al actualizar aprendiz:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar aprendiz",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};

export const deleteAprendizCrud = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idAprendiz} = body;

        const objAprendiz = new aprendiz(null, idAprendiz);
        const result = await objAprendiz.EliminarAprendiz();

        response.status = 200;
        response.body = {
            success: true,
            message: "Aprendiz eliminado",
            data: result,
        };
    } catch (error) {
        console.error("Error al eliminar aprendiz:", error);
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar aprendiz",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};