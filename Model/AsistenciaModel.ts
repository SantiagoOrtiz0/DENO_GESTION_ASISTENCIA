import { conexion } from "./conexion.ts";

interface AsistenciaData {
    idAsistencia: number | null;
    idAprendiz: number | null;
    idHorario_Ficha_Asignatura: number | null;
    Fecha: string | null;
    Estado: string | null;
}

export class Asistencia {
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
        const {rows: asistencia} = await conexion.execute(`select * from asistencia where idAsistencia = ?`,
            [this._idAsistencia]
        );
        return asistencia as AsistenciaData[];
    }
    public async InsertarAsistencia(): Promise<any>{
        const result = await conexion.execute(`insert into asistencia (idAprendiz, idHorario_Ficha_Asignatura, Fecha, Estado) values (?, ?, ?, ?)`,
            [
                this._ObjAsistencia?.idAprendiz,
                this._ObjAsistencia?.idHorario_Ficha_Asignatura,
                this._ObjAsistencia?.Fecha,
                this._ObjAsistencia?.Estado,
            ]
        );
        return result;
    }

    public async ActualizarAsistencia(): Promise<any>{
        const result = await conexion.execute(
            `update asistencia set idAprendiz = ?, idHorario_Ficha_Asignatura = ?, Fecha = ?, Estado = ? where idAsistencia = ?`,
            [
                this._ObjAsistencia?.idAprendiz,
                this._ObjAsistencia?.idHorario_Ficha_Asignatura,
                this._ObjAsistencia?.Fecha,
                this._ObjAsistencia?.Estado,
                this._idAsistencia,
            ]
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