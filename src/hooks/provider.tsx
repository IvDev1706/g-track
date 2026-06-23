import useGames from "./games";
import { GameContext } from "./context";
import { ReactNode, useEffect } from "react";
import { init_db } from "../database/dbconfig";

//propiedades del provider
type GamesProviderProps = {
    children: ReactNode
}

//provider para pantallas
export default function GamesProvider({ children }:GamesProviderProps){
    //hook de juegos
    const games = useGames();

    //efecto para pedir juegos
    useEffect(() => {
        //inicializar bd
        init_db().then(() => {
            //pedir juegos de la db
            games.get_games_db();
        }).catch(err => console.error(err));
    },[]);

    //componente provider
    return (
        <GameContext.Provider value={games}>
            {children}
        </GameContext.Provider>
    );
}