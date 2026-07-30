import {create, verify, getNumericDate, type Header, type Payload} from "../Dependencies/dependencias.ts"

const encoder = new TextEncoder();

async function obtenerClave(): Promise<CryptoKey> {
    const secreto = Deno.env.get("JWT_SECRET") ?? "clave_secreta"
    return await crypto.subtle.importKey(
        "raw", encoder.encode(secreto),
        {name: "HMAC", hash: "SHA-256"},
        false, ["sign", "verify"]
    );
}

const header: Header = {alg: "HS256", typ: "JWT"};

export async function generarToken(payload: Payload): Promise<string> {
    const clave = await obtenerClave();
    const payloadConExpiracion: Payload = {
        ...payload, exp: getNumericDate(60 * 60 * 8), //Tiempo de expiracion del token
    };
    return await create(header, payloadConExpiracion, clave);
}

export async function verificarToken(token: string): Promise<Payload> {
    const clave = await obtenerClave();
    return await verify(token, clave);
}