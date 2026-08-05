import { conexion } from "./conexion.ts";

interface AprendizData {
    idAprendiz: number | null;
    Nombres: string;
    Apellidos: string;
    idFicha: number | null;
    contrasena?: string;
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
        const campos: string[] = [];
        const valores: any[] = [];

        if (this._ObjAprendiz?.Nombres !== undefined) {
            campos.push("Nombres = ?");
            valores.push(this._ObjAprendiz.Nombres);
        }
        if (this._ObjAprendiz?.Apellidos !== undefined) {
            campos.push("Apellidos = ?");
            valores.push(this._ObjAprendiz.Apellidos);
        }
        if (this._ObjAprendiz?.idFicha !== undefined) {
            campos.push("idFicha = ?");
            valores.push(this._ObjAprendiz.idFicha);
        }
        if (this._ObjAprendiz?.contrasena) {
            campos.push("contrasena = ?");
            valores.push(this._ObjAprendiz.contrasena);
        }

        if (campos.length === 0) {
            return { affectedRows: 0 };
        }

        valores.push(this._idAprendiz);

        const result = await conexion.execute(
            `update aprendiz set ${campos.join(", ")} where idAprendiz = ?`,
            valores
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