import { useEffect, useState } from "react";
import { Game } from "../../../interfaces/models";
import { CLEAR, DARK } from "../../../utils/themeColors";
import RowView from "../../layouts/row";
import CardView from "./card";
import ThemedText from "../texts";
import DefaultButton from "../../interactives/buttons";
import { Image } from "react-native";
import ColumnView from "../../layouts/column";
import ThemedTextInput from "../../interactives/inputs";
import { AntDesign } from "@expo/vector-icons";

//propiedades del componente
interface GameCardProps {
    game: Game
    handle_update: (game:Game) => void,
    handle_delete: (id:number) => void
}

//componente de juego
export default function GameInfoCard({ game, handle_update, handle_delete }:GameCardProps){
    //estados
    const [localGame, setLocalGame] = useState<Game>(game);
    const [editable, setEditable] = useState(false);

    //efecto para actualizar juego
    useEffect(()=>{
        //actualizar el juego
        setLocalGame(game);
    },[game]);

    //logo de juego
    const game_logo = require("../../../../assets/game_ico.png");

    //manejo de boton
    const edit = () => {
        //validar editable
        if(editable){
            //guardar cambios
            handle_update(localGame);
        }

        //cambiar bandera
        setEditable(!editable);
    }
    
    //row de juego
    return (
        <CardView 
            bgcolor={CLEAR}
        >
            <RowView distribution={[0.3,0.7]}>
                <Image source={game_logo} style={{ width: 98, height: 64, objectFit: "contain", alignSelf: "center" }} />
                <ColumnView>
                    <ThemedText text={"Nombre:"} type="normal" color={DARK}/>
                    {editable ? 
                        <ThemedTextInput prefix={localGame.name}  onChange={v => setLocalGame({...localGame, name: v})}/>:
                        <ThemedText text={localGame.name} type="normal" color={DARK}/>
                    }
                    <RowView distribution={[0.3,0.7]}>
                        <ThemedText text={"Inicio:"} type="normal" color={DARK}/>
                        {editable ? 
                            <ThemedTextInput prefix={localGame.start_date}  onChange={v => setLocalGame({...localGame, start_date: v})}/>:
                            <ThemedText text={localGame.start_date} type="normal" color={DARK}/>
                        }
                    </RowView>
                    <RowView distribution={[0.3,0.7]}>
                        <ThemedText text={"Fin:"} type="normal" color={DARK}/>
                        {editable && localGame.end_date ? 
                            <ThemedTextInput prefix={localGame.end_date} onChange={v => setLocalGame({...localGame, end_date: v})}/>:
                            <ThemedText text={localGame.end_date ? localGame.end_date : "?"} type="normal" color={DARK}/>
                        }
                    </RowView>
                    <RowView distribution={[0.5,0.5]}>
                        <DefaultButton 
                            icon={editable ? 
                                <AntDesign name="save" color={CLEAR} size={16}/>:
                                <AntDesign name="edit" color={CLEAR} size={16}/>
                            }
                            text={editable ? "guardar" : "editar"} onClick={edit}
                        />
                        <DefaultButton 
                            icon={<AntDesign name="delete" color={CLEAR} size={16}/>}
                            style="danger"
                            text="eliminar" onClick={() => handle_delete(localGame.id as number)}
                        />
                    </RowView>
                </ColumnView>
            </RowView>
        </CardView>
    );
}