import { conexion } from "./conexion.ts";

interface AsistenciaData {
    idAsistencia: number | null;
    idAprendiz: number | null;
    idAsignatura: number | null;
    Fecha: string | null;
}

export class asistencia {
    public _ObjAsistencia: AsistenciaData | null;
    public _idAsistencia: number | null;
    constructor(ObjAsistencia: AsistenciaData | null = null, idAsistencia: number | null = null){
        this._ObjAsistencia = ObjAsistencia;
        this._idAsistencia = idAsistencia;
    }

    public async SeleccionarAsistencia(): Promise<AsistenciaData[]>{
        const {rows: asistencia} = await conexion.execute(`select * from asistencia`);
        return asistencia as AsistenciaData[];
    }

    public async ConsultarAsistencia(): Promise<AsistenciaData[]>{
        const {rows: asistencia} = await conexion.execute(
            `select * from asistencia where idAsistencia = ?`,
            [this._idAsistencia]
        );
        return asistencia as AsistenciaData[];
    }

    public async ConsultarAsistenciaPorAprendiz(): Promise<AsistenciaData[]>{
        const {rows: asistencia} = await conexion.execute(
            `select * from asistencia where idAprendiz = ?`,
            [this._ObjAsistencia?.idAprendiz]
        );
        return asistencia as AsistenciaData[];
    }

    public async ConsultarAsistenciaPorAsignaturaYFecha(): Promise<AsistenciaData[]>{
        const {rows: asistencia} = await conexion.execute(
            `select * from asistencia where idAsignatura = ? and Fecha = ?`,
            [this._ObjAsistencia?.idAsignatura, this._ObjAsistencia?.Fecha]
        );
        return asistencia as AsistenciaData[];
    }

    public async InsertarAsistencia(): Promise<any>{
        const result = await conexion.execute(
            `insert into asistencia (idAprendiz, idAsignatura, Fecha) values (?, ?, ?)`,
            [this._ObjAsistencia?.idAprendiz, this._ObjAsistencia?.idAsignatura, this._ObjAsistencia?.Fecha]
        );
        return result;
    }

    public async ActualizarAsistencia(): Promise<any>{
        const result = await conexion.execute(
            `update asistencia set idAprendiz = ?, idAsignatura = ?, Fecha = ? where idAsistencia = ?`,
            [this._ObjAsistencia?.idAprendiz, this._ObjAsistencia?.idAsignatura, this._ObjAsistencia?.Fecha, this._idAsistencia]
        );
        return result;
    }

    public async EliminarAsistencia(): Promise<any>{
        const result = await conexion.execute(
            `delete from asistencia where idAsistencia = ?`,
            [this._idAsistencia]
        );
        return result;
    }
}