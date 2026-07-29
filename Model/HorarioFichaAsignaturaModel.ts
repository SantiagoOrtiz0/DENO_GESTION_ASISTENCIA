import { conexion } from "./conexion.ts";

interface HorarioFichaAsignaturaData {
    idHorario_Ficha_Asignatura: number | null;
    idFicha: number | null;
    idHorario: number | null;
    idAsignatura: number | null;
}

export class horarioFichaAsignatura {
    public _ObjHorarioFichaAsignatura: HorarioFichaAsignaturaData | null;
    public _idHorarioFichaAsignatura: number | null;
    constructor(ObjHorarioFichaAsignatura: HorarioFichaAsignaturaData | null = null, idHorarioFichaAsignatura: number | null = null){
        this._ObjHorarioFichaAsignatura = ObjHorarioFichaAsignatura;
        this._idHorarioFichaAsignatura = idHorarioFichaAsignatura;
    }

    public async SeleccionarHorarioFichaAsignatura(): Promise<HorarioFichaAsignaturaData[]>{
        const {rows: horarioFichaAsignatura} = await conexion.execute(`select * from horario_ficha_asignatura`);
        return horarioFichaAsignatura as HorarioFichaAsignaturaData[];
    }

    public async ConsultarHorarioFichaAsignatura(): Promise<HorarioFichaAsignaturaData[]>{
        const {rows: horarioFichaAsignatura} = await conexion.execute(
            `select * from horario_ficha_asignatura where idHorario_Ficha_Asignatura = ?`,
            [this._idHorarioFichaAsignatura]
        );
        return horarioFichaAsignatura as HorarioFichaAsignaturaData[];
    }

    public async InsertarHorarioFichaAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `insert into horario_ficha_asignatura (idFicha, idHorario, idAsignatura) values (?, ?, ?)`,
            [
                this._ObjHorarioFichaAsignatura?.idFicha,
                this._ObjHorarioFichaAsignatura?.idHorario,
                this._ObjHorarioFichaAsignatura?.idAsignatura,
            ]
        );
        return result;
    }

    public async ActualizarHorarioFichaAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `update horario_ficha_asignatura set idFicha = ?, idHorario = ?, idAsignatura = ? where idHorario_Ficha_Asignatura = ?`,
            [
                this._ObjHorarioFichaAsignatura?.idFicha,
                this._ObjHorarioFichaAsignatura?.idHorario,
                this._ObjHorarioFichaAsignatura?.idAsignatura,
                this._idHorarioFichaAsignatura,
            ]
        );
        return result;
    }

    public async EliminarHorarioFichaAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `delete from horario_ficha_asignatura where idHorario_Ficha_Asignatura = ?`,
            [this._idHorarioFichaAsignatura]
        );
        return result;
    }
}