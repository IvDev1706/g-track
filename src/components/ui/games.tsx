import { useEffect, useState } from "react";
import { Game } from "../../interfaces/models";
import { CLEAR, DARK, PRIMARY, SECONDARY, WARN } from "../../utils/themeColors";
import RowView from "../layouts/row";
import CardView from "./cards";
import ThemedText from "./texts";
import { GAMESTATUS } from "../../utils/status";
import DefaultButton from "../interactives/buttons";

//propiedades del componente
interface GameCardProps {
    game: Game
    handle_update: (game:Game) => void
}

//componente de juego
export default function GameCard({ game, handle_update }:GameCardProps){
    //estados
    const [localGame, setLocalGame] = useState<Game>(game);

    //efecto para actualizar juego
    useEffect(()=>{
        //actualizar el juego
        setLocalGame(game);
    },[game]);
    
    //row de juego
    return (
        <CardView 
            bgcolor={game.status == 0 ? SECONDARY : game.status == 1 ? PRIMARY : WARN}
        >
            <RowView distribution={[0.5,0.3,0.2]}>
                <ThemedText text={localGame.name} type="normal" color={game.status != 2 ? CLEAR : DARK}/>
                <ThemedText text={GAMESTATUS[localGame.status]} type="normal" color={game.status != 2 ? CLEAR : DARK}/>
                <DefaultButton text={game.status == 0 ? "track" : "comp."} onClick={() => handle_update({...localGame, status: localGame.status == 0 ? 1 : 2})}/>
            </RowView>
        </CardView>
    );
}