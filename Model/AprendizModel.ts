import { conexion } from "./conexion.ts";

interface AprendizData {
    idAprendiz: number | null;
    Nombres: string;
    Apellidos: string;
    idFicha: number | null;
    contrasena: string;
    Numero_Ficha?: string
}

export class aprendiz {
    public _ObjAprendiz: AprendizData | null;
    public _idAprendiz: number | null;
    constructor(ObjAprendiz: AprendizData | null = null, idAprendiz: number | null = null){
        this._ObjAprendiz = ObjAprendiz;
        this._idAprendiz = idAprendiz;
    }

    public async SeleccionarAprendiz(): Promise<AprendizData[]>{
        const {rows: aprendiz} = await conexion.execute(`
            select a.idAprendiz, a.Nombres, a.Apellidos, a.idFicha, a.contrasena, f.Numero_Ficha
            from aprendiz a left join ficha f on a.idFicha = f.idFicha`);
        return aprendiz as AprendizData[];
    }

    public async ConsultarAprendiz(): Promise<AprendizData[]>{
        const {rows: aprendiz} = await conexion.execute(
            `select * from aprendiz where idAprendiz = ?`,
            [this._idAprendiz]
        );
        return aprendiz as AprendizData[];
    }

    public async InsertarAprendiz(): Promise<any>{
        const result = await conexion.execute(
            `insert into aprendiz (Nombres, Apellidos, idFicha, contrasena) values (?, ?, ?, ?)`,
            [
                this._ObjAprendiz?.Nombres,
                this._ObjAprendiz?.Apellidos,
                this._ObjAprendiz?.idFicha,
                this._ObjAprendiz?.contrasena,
            ]
        );
        return result;
    }

    public async ActualizarAprendiz(): Promise<any>{
        const result = await conexion.execute(
            `update aprendiz set Nombres = ?, Apellidos = ?, idFicha = ?, contrasena = ? where idAprendiz = ?`,
            [
                this._ObjAprendiz?.Nombres,
                this._ObjAprendiz?.Apellidos,
                this._ObjAprendiz?.idFicha,
                this._ObjAprendiz?.contrasena,
                this._idAprendiz,
            ]
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