import { conexion } from "./conexion.ts";

interface UsuarioFichaData {
    idUsuarioFicha: number | null;
    idFicha: number | null;
    idUsuario: number | null;
}

export class usuarioFicha {
    public _ObjUsuarioFicha: UsuarioFichaData | null;
    public _idUsuarioFicha: number | null;
    constructor(ObjUsuarioFicha: UsuarioFichaData | null = null, idUsuarioFicha: number | null = null){
        this._ObjUsuarioFicha = ObjUsuarioFicha;
        this._idUsuarioFicha = idUsuarioFicha;
    }

    public async SeleccionarUsuarioFicha(): Promise<UsuarioFichaData[]>{
        const {rows: usuarioFicha} = await conexion.execute(`select * from usuarioficha`);
        return usuarioFicha as UsuarioFichaData[];
    }

    public async ConsultarUsuarioFicha(): Promise<UsuarioFichaData[]>{
        const {rows: usuarioFicha} = await conexion.execute(
            `select * from usuarioficha where idUsuarioFicha = ?`,
            [this._idUsuarioFicha]
        );
        return usuarioFicha as UsuarioFichaData[];
    }

    public async InsertarUsuarioFicha(): Promise<any>{
        const result = await conexion.execute(
            `insert into usuarioficha (idFicha, idUsuario) values (?, ?)`,
            [this._ObjUsuarioFicha?.idFicha, this._ObjUsuarioFicha?.idUsuario]
        );
        return result;
    }

    public async ActualizarUsuarioFicha(): Promise<any>{
        const result = await conexion.execute(
            `update usuarioficha set idFicha = ?, idUsuario = ? where idUsuarioFicha = ?`,
            [
                this._ObjUsuarioFicha?.idFicha,
                this._ObjUsuarioFicha?.idUsuario,
                this._idUsuarioFicha,
            ]
        );
        return result;
    }

    public async EliminarUsuarioFicha(): Promise<any>{
        const result = await conexion.execute(
            `delete from usuarioficha where idUsuarioFicha = ?`,
            [this._idUsuarioFicha]
        );
        return result;
    }
}