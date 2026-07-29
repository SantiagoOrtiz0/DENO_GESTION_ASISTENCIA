import { conexion } from "./conexion.ts";

interface HorarioData {
    idHorario: number | null;
    Dia: string;
    HoraInicio: string | null;
    HoraFin: string | null;
}

export class horario {
    public _ObjHorario: HorarioData | null;
    public _idHorario: number | null;
    constructor(ObjHorario: HorarioData | null = null, idHorario: number | null = null){
        this._ObjHorario = ObjHorario;
        this._idHorario = idHorario;
    }

    public async SeleccionarHorario(): Promise<HorarioData[]>{
        const {rows: horario} = await conexion.execute(`select * from horario`);
        return horario as HorarioData[];
    }

    public async ConsultarHorario(): Promise<HorarioData[]>{
        const {rows: horario} = await conexion.execute(
            `select * from horario where idHorario = ?`,
            [this._idHorario]
        );
        return horario as HorarioData[];
    }

    public async InsertarHorario(): Promise<any>{
        const result = await conexion.execute(
            `insert into horario (Dia, HoraInicio, HoraFin) values (?, ?, ?)`,
            [this._ObjHorario?.Dia, this._ObjHorario?.HoraInicio, this._ObjHorario?.HoraFin]
        );
        return result;
    }

    public async ActualizarHorario(): Promise<any>{
        const result = await conexion.execute(
            `update horario set Dia = ?, HoraInicio = ?, HoraFin = ? where idHorario = ?`,
            [this._ObjHorario?.Dia, this._ObjHorario?.HoraInicio, this._ObjHorario?.HoraFin, this._idHorario]
        );
        return result;
    }

    public async EliminarHorario(): Promise<any>{
        const result = await conexion.execute(
            `delete from horario where idHorario = ?`,
            [this._idHorario]
        );
        return result;
    }
}