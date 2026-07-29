import { conexion } from "./conexion.ts";

interface AsignaturaData {
    idAsignatura: number | null;
    NombreAsignatura: string;
}

export class asignatura {
    public _ObjAsignatura: AsignaturaData | null;
    public _idAsignatura: number | null;
    constructor(ObjAsignatura: AsignaturaData | null = null, idAsignatura: number | null = null){
        this._ObjAsignatura = ObjAsignatura;
        this._idAsignatura = idAsignatura;
    }

    public async SeleccionarAsignatura(): Promise<AsignaturaData[]>{
        const {rows: asignatura} = await conexion.execute(`select * from asignatura`);
        return asignatura as AsignaturaData[];
    }

    public async ConsultarAsignatura(): Promise<AsignaturaData[]>{
        const {rows: asignatura} = await conexion.execute(
            `select * from asignatura where idAsignatura = ?`,
            [this._idAsignatura]
        );
        return asignatura as AsignaturaData[];
    }

    public async InsertarAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `insert into asignatura (NombreAsignatura) values (?)`,
            [this._ObjAsignatura?.NombreAsignatura]
        );
        return result;
    }

    public async ActualizarAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `update asignatura set NombreAsignatura = ? where idAsignatura = ?`,
            [this._ObjAsignatura?.NombreAsignatura, this._idAsignatura]
        );
        return result;
    }

    public async EliminarAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `delete from asignatura where idAsignatura = ?`,
            [this._idAsignatura]
        );
        return result;
    }
}