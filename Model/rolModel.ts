import { conexion } from "./conexion.ts";

interface RolData {
    idRol: number | null;
    NombreRol: string;
}

export class rol {
    public _ObjRol: RolData | null;
    public _idRol: number | null;
    constructor(ObjRol: RolData | null = null, idRol: number | null = null){
        this._ObjRol = ObjRol;
        this._idRol = idRol;
    }

    public async SeleccionarRol(): Promise<RolData[]>{
        const {rows: rol} = await conexion.execute(`select * from rol`);
        return rol as RolData[];
    }

    public async ConsultarRol(): Promise<RolData[]>{
        const {rows: rol} = await conexion.execute(
            `select * from rol where idRol = ?`,
            [this._idRol]
        );
        return rol as RolData[];
    }

    public async InsertarRol(): Promise<any>{
        const result = await conexion.execute(
            `insert into rol (NombreRol) values (?)`,
            [this._ObjRol?.NombreRol]
        );
        return result;
    }

    public async ActualizarRol(): Promise<any>{
        const result = await conexion.execute(
            `update rol set NombreRol = ? where idRol = ?`,
            [this._ObjRol?.NombreRol, this._idRol]
        );
        return result;
    }

    public async EliminarRol(): Promise<any>{
        const result = await conexion.execute(
            `delete from rol where idRol = ?`,
            [this._idRol]
        );
        return result;
    }
}