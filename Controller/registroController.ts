import {aprendiz} from "../Model/AprendizModel.ts"
import { Context, bcrypt } from "../Dependencies/dependencias.ts"



export const getAprendices = async (ctx:Context) => {
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

export const postRegistrarAprendiz = async (ctx:Context) => {
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