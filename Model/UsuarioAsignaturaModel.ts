import { conexion } from "./conexion.ts";

interface UsuarioAsignaturaData {
    idUsuarioAsignatura: number | null;
    idUsuario: number | null;
    idAsignatura: number | null;
}

export class usuarioAsignatura {
    public _ObjUsuarioAsignatura: UsuarioAsignaturaData | null;
    public _idUsuarioAsignatura: number | null;
    constructor(ObjUsuarioAsignatura: UsuarioAsignaturaData | null = null, idUsuarioAsignatura: number | null = null){
        this._ObjUsuarioAsignatura = ObjUsuarioAsignatura;
        this._idUsuarioAsignatura = idUsuarioAsignatura;
    }

    public async SeleccionarUsuarioAsignatura(): Promise<UsuarioAsignaturaData[]>{
        const {rows: usuarioAsignatura} = await conexion.execute(`select * from usuarioasignatura`);
        return usuarioAsignatura as UsuarioAsignaturaData[];
    }

    public async ConsultarUsuarioAsignatura(): Promise<UsuarioAsignaturaData[]>{
        const {rows: usuarioAsignatura} = await conexion.execute(
            `select * from usuarioasignatura where idUsuarioAsignatura = ?`,
            [this._idUsuarioAsignatura]
        );
        return usuarioAsignatura as UsuarioAsignaturaData[];
    }

    public async InsertarUsuarioAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `insert into usuarioasignatura (idUsuario, idAsignatura) values (?, ?)`,
            [this._ObjUsuarioAsignatura?.idUsuario, this._ObjUsuarioAsignatura?.idAsignatura]
        );
        return result;
    }

    public async ActualizarUsuarioAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `update usuarioasignatura set idUsuario = ?, idAsignatura = ? where idUsuarioAsignatura = ?`,
            [
                this._ObjUsuarioAsignatura?.idUsuario,
                this._ObjUsuarioAsignatura?.idAsignatura,
                this._idUsuarioAsignatura,
            ]
        );
        return result;
    }

    public async EliminarUsuarioAsignatura(): Promise<any>{
        const result = await conexion.execute(
            `delete from usuarioasignatura where idUsuarioAsignatura = ?`,
            [this._idUsuarioAsignatura]
        );
        return result;
    }
}