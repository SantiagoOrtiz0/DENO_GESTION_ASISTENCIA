import { conexion } from "./conexion.ts";

interface InstructorData {
    idInstructor: number | null;
    idUsuario: number | null;
    idAsignatura: number | null;
}

export class instructor {
    public _ObjInstructor: InstructorData | null;
    public _idInstructor: number | null;
    constructor(ObjInstructor: InstructorData | null = null, idInstructor: number | null = null){
        this._ObjInstructor = ObjInstructor;
        this._idInstructor = idInstructor;
    }

    public async SeleccionarInstructor(): Promise<InstructorData[]>{
        const {rows: instructor} = await conexion.execute(`select * from instructor`);
        return instructor as InstructorData[];
    }

    public async ConsultarInstructor(): Promise<InstructorData[]>{
        const {rows: instructor} = await conexion.execute(
            `select * from instructor where idInstructor = ?`,
            [this._idInstructor]
        );
        return instructor as InstructorData[];
    }

    public async ConsultarInstructorPorAsignatura(): Promise<InstructorData[]>{
        const {rows: instructor} = await conexion.execute(
            `select * from instructor where idAsignatura = ?`,
            [this._ObjInstructor?.idAsignatura]
        );
        return instructor as InstructorData[];
    }

    public async InsertarInstructor(): Promise<any>{
        const result = await conexion.execute(
            `insert into instructor (idUsuario, idAsignatura) values (?, ?)`,
            [this._ObjInstructor?.idUsuario, this._ObjInstructor?.idAsignatura]
        );
        return result;
    }

    public async ActualizarInstructor(): Promise<any>{
        const result = await conexion.execute(
            `update instructor set idUsuario = ?, idAsignatura = ? where idInstructor = ?`,
            [this._ObjInstructor?.idUsuario, this._ObjInstructor?.idAsignatura, this._idInstructor]
        );
        return result;
    }

    public async EliminarInstructor(): Promise<any>{
        const result = await conexion.execute(
            `delete from instructor where idInstructor = ?`,
            [this._idInstructor]
        );
        return result;
    }
}