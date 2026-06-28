import { useEffect, useState } from "react";
import { Game } from "../../../interfaces/models";
import { CLEAR, DARK, PRIMARY, WARN } from "../../../utils/themeColors";
import RowView from "../../layouts/row";
import CardView from "./card";
import ThemedText from "../texts";
import { GAMESTATUS } from "../../../utils/constats";
import DefaultButton from "../../interactives/buttons";
import { Image } from "react-native";
import ColumnView from "../../layouts/column";

//propiedades del componente
interface GameCardProps {
    game: Game
    handle_update: (id:number, status:number) => void
}

//componente de juego
export default function GameStatusCard({ game, handle_update }:GameCardProps){
    //estados
    const [localGame, setLocalGame] = useState<Game>(game);

    //efecto para actualizar juego
    useEffect(()=>{
        //actualizar el juego
        setLocalGame(game);
    },[game]);

    //logo de juego
    const game_logo = require("../../../../assets/game_ico.png");
    
    //row de juego
    return (
        <CardView 
            bgcolor={game.status == 0 ? CLEAR : game.status == 1 ? PRIMARY : WARN}
        >
            <RowView distribution={[0.3,0.7]}>
                <Image source={game_logo} style={{ width: 98, height: 64, objectFit: "contain", alignSelf: "center" }} />
                <ColumnView>
                    <ThemedText text={localGame.name} type="normal" color={game.status == 1 ? CLEAR : DARK}/>
                    <ThemedText text={"estado: "+GAMESTATUS[localGame.status]} type="normal" color={game.status == 1 ? CLEAR : DARK}/>
                    {game.status == 2 ?
                        <ThemedText text={"fecha: "+game.end_date} type="normal"/>:
                        game.status == 1 ?
                            <RowView distribution={[0.5,0.5]}>
                                <DefaultButton text="completar" onClick={() => handle_update(localGame.id as number, localGame.status + 1)}/>
                                <DefaultButton text="descartar" onClick={() => handle_update(localGame.id as number, localGame.status - 1)}/>
                            </RowView>:
                        <DefaultButton text="comenzar" onClick={() => handle_update(localGame.id as number, localGame.status + 1)}/>
                    }
                </ColumnView>
            </RowView>
        </CardView>
    );
}