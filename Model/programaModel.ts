import { conexion } from "./conexion.ts";

interface ProgramaData {
    idPrograma: number | null;
    nombrePrograma: string;
    descripcion: string | null;
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
            `insert into programa (nombrePrograma, descripcion) values (?, ?)`,
            [this._ObjPrograma?.nombrePrograma, this._ObjPrograma?.descripcion]
        );
        return result;
    }

    public async ActualizarPrograma(): Promise<any>{
        const result = await conexion.execute(
            `update programa set nombrePrograma = ?, descripcion = ? where idPrograma = ?`,
            [this._ObjPrograma?.nombrePrograma, this._ObjPrograma?.descripcion, this._idPrograma]
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