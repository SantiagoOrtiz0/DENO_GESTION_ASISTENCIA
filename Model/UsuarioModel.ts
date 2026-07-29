import { conexion } from "./conexion.ts";

interface UsuarioData {
    idUsuario: number | null;
    nombres: string;
    apellidos: string;
    contrasena: string;
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
        const result = await conexion.execute(
            `update usuario set nombres = ?, apellidos = ?, contrasena = ?, idRol = ? where idUsuario = ?`,
            [
                this._ObjUsuario?.nombres,
                this._ObjUsuario?.apellidos,
                this._ObjUsuario?.contrasena,
                this._ObjUsuario?.idRol,
                this._idUsuario,
            ]
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