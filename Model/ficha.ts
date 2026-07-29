import { conexion } from "./conexion.ts";

interface FichaData {
    idFicha: number | null;
    Numero_Ficha: string;
    idPrograma: number | null;
}

export class ficha {
    public _ObjFicha: FichaData | null;
    public _idFicha: number | null;
    constructor(ObjFicha: FichaData | null = null, idFicha: number | null = null){
        this._ObjFicha = ObjFicha;
        this._idFicha = idFicha;
    }

    public async SeleccionarFicha(): Promise<FichaData[]>{
        const {rows: ficha} = await conexion.execute(`select * from ficha`);
        return ficha as FichaData[];
    }

    public async ConsultarFicha(): Promise<FichaData[]>{
        const {rows: ficha} = await conexion.execute(
            `select * from ficha where idFicha = ?`,
            [this._idFicha]
        );
        return ficha as FichaData[];
    }

    public async ConsultarFichaPorNumero(): Promise<FichaData[]>{
        const {rows: ficha} = await conexion.execute(
            `select * from ficha where Numero_Ficha = ?`,
            [this._ObjFicha?.Numero_Ficha]
        );
        return ficha as FichaData[];
    }

    public async InsertarFicha(): Promise<any>{
        const result = await conexion.execute(
            `insert into ficha (Numero_Ficha, idPrograma) values (?, ?)`,
            [this._ObjFicha?.Numero_Ficha, this._ObjFicha?.idPrograma]
        );
        return result;
    }

    public async ActualizarFicha(): Promise<any>{
        const result = await conexion.execute(
            `update ficha set Numero_Ficha = ?, idPrograma = ? where idFicha = ?`,
            [this._ObjFicha?.Numero_Ficha, this._ObjFicha?.idPrograma, this._idFicha]
        );
        return result;
    }

    public async EliminarFicha(): Promise<any>{
        const result = await conexion.execute(
            `delete from ficha where idFicha = ?`,
            [this._idFicha]
        );
        return result;
    }
}