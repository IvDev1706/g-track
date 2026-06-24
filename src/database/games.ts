import { db } from "./dbconfig";
import { Game } from "../interfaces/models";
import { get_formated_date } from "../utils/constats";

//obtener juegos
export async function get_games(status?:number):Promise<Array<Game>>{
    //crear la query
    let query = "SELECT * FROM Game";
    query = status ? query+" WHERE status = "+status+";" : query;

    //validar conexion
    if(!db) return [];

    //extraer juegos
    return await db.getAllAsync<Game>(query);
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
export async function update_game(game:Game):Promise<boolean>{
    //validar conexion
    if(!db) return false;

    //validar estado
    if(game.status == 2){
        game.end_date = get_formated_date();
    }

    //ejecutar la query
    await db.runAsync(`
            UPDATE Game
            SET name = ?, start_date = ?, status = ?, end_date = ?
            WHERE id = ?;
        `,
        game.name,
        game.start_date,
        game.status,
        game.end_date ? game.end_date : "",
        game.id as number,
    );

    //retornar id
    return true;
}

//eliminar item
export async function delete_game(id:number):Promise<boolean>{
    //validar conexion
    if(!db) return false;

    //ejecutar la query
    await db.runAsync("DELETE FROM Game WHERE id = ?;",id);

    //retornar id
    return true;
}