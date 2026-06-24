import { createContext, useContext } from "react";
import { Game } from "../interfaces/models";

//propuedades del contexto
interface GamesContextType {
    games: Game[],
    get_games_db: (status?:number) => void
    add_new_game: (game:Game) => Promise<boolean> 
    update_game_status: (id:number,status:number) => Promise<boolean>
    update_game_data: (game:Game) => Promise<boolean> 
    delete_game: (id:number) => Promise<boolean> 
}

//contexto de juegos
export const GameContext = createContext<GamesContextType|undefined>(undefined);

//consumer
export function useGameContext(){
    //obtener el contexto
    const gamesctx = useContext(GameContext);

    //validar contexto
    if(!gamesctx){
        throw new Error("No se puede usar context sin provider");
    }

    //retornar el contexto
    return gamesctx;
}