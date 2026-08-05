import { conexion } from "./conexion.ts";

interface UsuarioData {
    idUsuario: number | null;
    nombres: string;
    apellidos: string;
    contrasena?: string;
    idRol: number | null;
}

export class usuario {
    public _ObjUsuario: UsuarioData | null;
    public _idUsuario: number | null;
    constructor(ObjUsuario: UsuarioData | null = null, idUsuario: number | null = null){
        this._ObjUsuario = ObjUsuario;
        this._idUsuario = idUsuario;
    }

    public async SeleccionarUsuario(): Promise<UsuarioData[]>{
        const {rows: usuario} = await conexion.execute(`select * from usuario`);
        return usuario as UsuarioData[];
    }

    public async ConsultarUsuario(): Promise<UsuarioData[]>{
        const {rows: usuario} = await conexion.execute(
            `select * from usuario where idUsuario = ?`,
            [this._idUsuario]
        );
        return usuario as UsuarioData[];
    }

    public async InsertarUsuario(): Promise<any>{
        const result = await conexion.execute(
            `insert into usuario (nombres, apellidos, contrasena, idRol) values (?, ?, ?, ?)`,
            [
                this._ObjUsuario?.nombres,
                this._ObjUsuario?.apellidos,
                this._ObjUsuario?.contrasena,
                this._ObjUsuario?.idRol,
            ]
        );
        return result;
    }

    public async ActualizarUsuario(): Promise<any>{
        const campos: string[] = [];
        const valores: any[] = [];

        if (this._ObjUsuario?.nombres !== undefined) {
            campos.push("nombres = ?");
            valores.push(this._ObjUsuario.nombres);
        }
        if (this._ObjUsuario?.apellidos !== undefined) {
            campos.push("apellidos = ?");
            valores.push(this._ObjUsuario.apellidos);
        }
        if (this._ObjUsuario?.idRol !== undefined) {
            campos.push("idRol = ?");
            valores.push(this._ObjUsuario.idRol);
        }
        if (this._ObjUsuario?.contrasena) {
            campos.push("contrasena = ?");
            valores.push(this._ObjUsuario.contrasena);
        }

        if (campos.length === 0) {
            return { affectedRows: 0 };
        }

        valores.push(this._idUsuario);

        const result = await conexion.execute(
            `update usuario set ${campos.join(", ")} where idUsuario = ?`,
            valores
        );
        return result;
    }

    public async EliminarUsuario(): Promise<any>{
        const result = await conexion.execute(
            `delete from usuario where idUsuario = ?`,
            [this._idUsuario]
        );
        return result;
    }
}