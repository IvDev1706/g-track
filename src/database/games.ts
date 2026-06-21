import { db } from "./dbconfig";
import { Game } from "../interfaces/models";

//obtener juegos
export async function get_games():Promise<Array<Game>>{
    //validar conexion
    if(!db) return [];

    //extraer juegos
    return await db.getAllAsync<Game>("SELECT * FROM Games;");
}

//registrar juego
export async function register_game(game:Game):Promise<number>{
    //validar conexion
    if(!db) return 0;

    //ejecutar query
    const res = await db.runAsync(`
            INSERT INTO Game(name,start_date,status) 
            VALUES (?,?,?);
        `,
        game.name,
        game.start_date,
        game.status
    );

    //retornar id
    return res.lastInsertRowId;
}

//actualizar juego
export async function update_list_item(game:Game):Promise<boolean>{
    //validar conexion
    if(!db) return false;

    //ejecutar la query
    await db.runAsync(`
            UPDATE Game
            SET name = ?, start_date = ?, status = ?, end_date = ?
            WHERE id = ?;
        `,
        game.name,
        game.start_date,
        game.status,
        game.end_date as string,
        game.id as number,
    );

    //retornar id
    return true;
}

//eliminar item
export async function delete_list_item(id:number):Promise<boolean>{
    //validar conexion
    if(!db) return false;

    //ejecutar la query
    await db.runAsync("DELETE FROM Game WHERE id = ?;",id);

    //retornar id
    return true;
}