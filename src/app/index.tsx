import CardView from "../components/ui/cards";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import MyScrollView from "../components/ui/scrollables";
import { CLEAR, PRIMARY, SECONDARY } from "../utils/themeColors";
import ColumnView from "../components/layouts/column";
import FloatButton from "../components/interactives/floatbutons";
import ModalLayer from "../components/ui/modals";
import { useState } from "react";
import { useGameContext } from "../hooks/context";
import ThemedTextInput from "../components/interactives/inputs";
import DefaultButton from "../components/interactives/buttons";
import { AntDesign } from "@expo/vector-icons";
import RowView from "../components/layouts/row";
import { Game } from "../interfaces/models";
import { Alert } from "react-native";
import GameCard from "../components/ui/games";

//obtener la fecha parseada
function get_formated_date(){
    //obtener la fecha
    const date = new Date();

    //partes de la fecha
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2,"0");
    const day = date.getDate().toString().padStart(2,"0");
    
    //dar el formato YYYY-MM-DD
    return year + "-" + month + "-" + day;
}

//pantalla principal
export default function Index(){
    //estados
    const [open,setOpen] = useState(false);
    const [game,setGame] = useState<Game>({
        name: "",
        start_date: get_formated_date(),
        status: 0
    });

    //contexto de juegos
    const gamesctx = useGameContext();

    //manejo de creacion
    const handle_add = (game:Game) => {
        //limpiar juego
        game.name = game.name.trim();
        game.start_date = game.start_date.trim();

        //mandar al hook
        gamesctx.add_new_game(game).then(res => {
            //mostrar mensaje
            if(res){
                Alert.alert("Juego creado","el juego ha sido registrado de forma exitosa");
            }else{
                Alert.alert("Error al crear","ha ocurrido un error al registrar el juego");
            }

            //cerrar el modal
            setOpen(false);

            //limpiar el estado
            setGame({
                name: "",
                start_date: get_formated_date(),
                status: 0
            });
        }).catch(err => console.error(err));
    }

    //pantalla de inicio
    return(
        <ScreenView alignment="top">
            <ModalLayer isOpen={open} setOpen={setOpen} action="registrar" onAction={() => handle_add(game)}>
                <ColumnView>
                    <ThemedText text="Registrar nuevo juego" type="title 2"/>
                    <ThemedText text="Nombre del juego:" type="normal"/>
                    <ThemedTextInput prefix={game.name} onChange={(v) => setGame({...game, name: v})}/>
                    <ThemedText text="fecha de inicio:" type="normal"/>
                    <ThemedTextInput prefix={game.start_date} onChange={(v) => setGame({...game, start_date: v})}/>
                </ColumnView>
            </ModalLayer>
            <ThemedText text="Juegos en seguimiento" type="title 2"/>
            {gamesctx.games.length != 0 ? 
                <ColumnView>
                    {gamesctx.games.filter(game => game.status == 1).map(game => 
                        <GameCard game={game} handle_update={gamesctx.update_game}/>
                    )}
                </ColumnView> :
                <ThemedText text="no hay juegos por mostrar" type="normal"/>
            }
            <ThemedText text="Juegos programados" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.filter(game => game.status == 0).map(game => 
                            <GameCard game={game} handle_update={gamesctx.update_game}/>
                        )}
                    </ColumnView> :
                    <ThemedText text="no hay juegos por mostrar" type="normal"/>
                }
            </MyScrollView>
            <FloatButton
                text="añadir juego"
                onClick={() => setOpen(!open)}
                icon={<AntDesign name="plus" size={16} color={CLEAR}/>}
            />
        </ScreenView>
    );
}
