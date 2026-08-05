import { Context, bcrypt } from "../Dependencies/dependencias.ts"
import { usuario } from "../Model/UsuarioModel.ts";

export const getUsuario = async (ctx: Context) => {
    const {response} = ctx;
    try {
        const objUsuario = new usuario();
        const ListaUsuarios = await objUsuario.SeleccionarUsuario();

        response.status = 200;
        response.body = {
            success : true,
            data : ListaUsuarios
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

export const postUsuario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {nombres, apellidos, contrasena, idRol} = body;
        
        //Encriptacion de la contraseña 
        const hashedPassword = await bcrypt.hash(contrasena);
        console.log("HASH:", hashedPassword);
        
                const nuevoUsuario = new usuario({
                    idUsuario: null,
                    nombres,
                    apellidos,
                    contrasena: hashedPassword,
                    idRol
                });
        
                const result = await nuevoUsuario.InsertarUsuario();
        
                response.status = 201;
                response.body = {
                    success : true,
                    message : "Usuario registrado",
                    data: result
                };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al registar usuario",
            errors: error
        };
    }
}

export const putUsuario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idUsuario ,nombres, apellidos, contrasena, idRol} = body;

        const hashedPassword = contrasena ? await bcrypt.hash(contrasena) : undefined;

        const objPrograma = new usuario ({
            idUsuario,
            nombres,
            apellidos,
            ...(hashedPassword ? {contrasena: hashedPassword} : {}),
            idRol,
        }, idUsuario);

        const result = await objPrograma.ActualizarUsuario();

        response.status = 200;
        response.body = {
            success: true,
            message: "Usuario actualizado",
            data: result,
        };
    } catch (error) {
            console.error("Error al actualizar usuario", error)
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al actualizar usuario",
            erros: error instanceof Error ? error.message : String(error),
        };
    }
};

export const deleteUsuario = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idUsuario} = body;

        const objUsuario = new usuario(null, idUsuario);
        const result = await objUsuario.EliminarUsuario();

         response.status = 200;
         response.body = {
            success: true,
            message: "Usuario eliminado",
            data: result,
         };
    } catch (error) {
        console.error("Error al eliminar usuario");
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar usuario",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};
