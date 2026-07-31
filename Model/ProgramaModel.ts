import { Context } from "../Dependencies/dependencias.ts";
import { conexion } from "./conexion.ts";

interface ProgramaData {
    idPrograma: number | null;
    nombrePrograma: string;
}

export class programa {
    public _ObjPrograma: ProgramaData | null;
    public _idPrograma: number | null;
    constructor(ObjPrograma: ProgramaData | null = null, idPrograma: number | null = null){
        this._ObjPrograma = ObjPrograma;
        this._idPrograma = idPrograma;
    }

    public async SeleccionarPrograma(): Promise<ProgramaData[]>{
        const {rows: programa} = await conexion.execute(`select * from programa`);
        return programa as ProgramaData[];
    }

    public async ConsultarPrograma(): Promise<ProgramaData[]>{
        const {rows: programa} = await conexion.execute(
            `select * from programa where idPrograma = ?`,
            [this._idPrograma]
        );
        return programa as ProgramaData[];
    }

    public async InsertarPrograma(): Promise<any>{
        const result = await conexion.execute(
            `insert into programa (nombrePrograma) values (?)`,
            [this._ObjPrograma?.nombrePrograma]
        );
        return result;
    }

    public async ActualizarPrograma(): Promise<any>{
        const result = await conexion.execute(
            `update programa set nombrePrograma = ? where idPrograma = ?`,
            [this._ObjPrograma?.nombrePrograma, this._idPrograma]
        );
        return result;
    }

    public async EliminarPrograma(): Promise<any>{
        const result = await conexion.execute(
            `delete from programa where idPrograma = ?`,
            [this._idPrograma]
        );
        return result;
    }
}

export const deletePrograma = async (ctx: Context) => {
    const {request, response} = ctx;
    try {
        const body = await request.body.json();
        const {idPrograma} = body;

        const objPrograma = new programa(null, idPrograma);
        const result = await objPrograma.EliminarPrograma();

         response.status = 200;
         response.body = {
            success: true,
            message: "Programa eliminado",
            data: result,
         };
    } catch (error) {
        console.error("Error al eliminar programa");
        response.status = 400;
        response.body = {
            success: false,
            message: "Error al eliminar programa",
            errors: error instanceof Error ? error.message : String(error),
        };
    }
};