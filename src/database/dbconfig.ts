import * as SQLite from "expo-sqlite";

//obtejo de base de datos
export let db:SQLite.SQLiteDatabase | null = null;

//inicializar base de datos
export async function init_db(){
    //obtener db
    db = await SQLite.openDatabaseAsync("games.db");

    //migrar esquema
    await db.execAsync(`
        -- directivas de sqlite
        PRAGMA journal_mode = WAL;
        
        -- tabla de juegos
        CREATE TABLE IF NOT EXISTS Game (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT,
            status INTEGER DEFAULT 0
        );
    `);
}