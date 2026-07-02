import { db } from "./dbconfig";
import { GameNotification } from "../interfaces/models";

//obtener id de notificacion por juego
export async function get_notification_id(game:number):Promise<string>{
    //query
    const query = `
        SELECT *
        FROM GameNotification
        WHERE game = ${game};
    `;

    //validar conexion
    if(!db) return "";

    //ejecutar query
    const res = await db.getFirstAsync<GameNotification>(query);

    //retornar id
    return res ? res.notification_id : "";
}

//registrar un nuevo id
export async function register_notification(game:number, notificacion_id:string):Promise<number>{
    //query
    const query = "INSERT INTO GameNotification(game,notification_id) VALUES (?,?);"
    
    //validar conexion
    if(!db) return 0;

    //ejecutar query
    const res = await db.runAsync(query,game,notificacion_id);

    //retornar id
    return res.lastInsertRowId;
}

//registrar un nuevo id
export async function update_notification(game:number, notificacion_id:string):Promise<boolean>{
    //query
    const query = "UPDATE GameNotification SET notification_id = ? WHERE game = ?;"
    
    //validar conexion
    if(!db) return false;

    //ejecutar query
    await db.runAsync(query,game,notificacion_id);

    //retornar id
    return true;
}