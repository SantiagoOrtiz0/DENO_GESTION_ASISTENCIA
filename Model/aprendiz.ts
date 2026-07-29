import { conexion } from "./conexion.ts";

interface AprendizData {
    idAprendiz: number | null;
    idUsuario: number | null;
    idFicha: number | null;
}

export class aprendiz {
    public _ObjAprendiz: AprendizData | null;
    public _idAprendiz: number | null;
    constructor(ObjAprendiz: AprendizData | null = null, idAprendiz: number | null = null){
        this._ObjAprendiz = ObjAprendiz;
        this._idAprendiz = idAprendiz;
    }

    public async SeleccionarAprendiz(): Promise<AprendizData[]>{
        const {rows: aprendiz} = await conexion.execute(`select * from aprendiz`);
        return aprendiz as AprendizData[];
    }

    public async ConsultarAprendiz(): Promise<AprendizData[]>{
        const {rows: aprendiz} = await conexion.execute(
            `select * from aprendiz where idAprendiz = ?`,
            [this._idAprendiz]
        );
        return aprendiz as AprendizData[];
    }

    public async ConsultarAprendizPorFicha(): Promise<AprendizData[]>{
        const {rows: aprendiz} = await conexion.execute(
            `select * from aprendiz where idFicha = ?`,
            [this._ObjAprendiz?.idFicha]
        );
        return aprendiz as AprendizData[];
    }

    public async InsertarAprendiz(): Promise<any>{
        const result = await conexion.execute(
            `insert into aprendiz (idUsuario, idFicha) values (?, ?)`,
            [this._ObjAprendiz?.idUsuario, this._ObjAprendiz?.idFicha]
        );
        return result;
    }

    public async ActualizarAprendiz(): Promise<any>{
        const result = await conexion.execute(
            `update aprendiz set idUsuario = ?, idFicha = ? where idAprendiz = ?`,
            [this._ObjAprendiz?.idUsuario, this._ObjAprendiz?.idFicha, this._idAprendiz]
        );
        return result;
    }

    public async EliminarAprendiz(): Promise<any>{
        const result = await conexion.execute(
            `delete from aprendiz where idAprendiz = ?`,
            [this._idAprendiz]
        );
        return result;
    }
}