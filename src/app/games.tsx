import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import MyScrollView from "../components/ui/scrollables";
import ColumnView from "../components/layouts/column";
import { useGameContext } from "../hooks/contexts/games";
import GameInfoCard from "../components/ui/cards/info";
import { useState } from "react";
import MessageModal from "../components/ui/modals/message";
import { Game } from "../interfaces/models";

//pantalla principal
export default function GamesDatabase(){
    //estados
    const [openWarning,setOpenWarning] = useState(false);

    //contexto de juegos
    const gamesctx = useGameContext();

    //validar datos
    const handle_update = (game:Game) => {
        //validacion de campo vacio
        if(!game.name || !game.start_date){
            setOpenWarning(true);
            return;
        }

        //lmpieza de campos
        game.name = game.name.trim();
        game.start_date = game.start_date.trim();

        //aplicar actualizacion
        gamesctx.update_game_data(game);
    }

    //pantalla de inicio
    return(
        <ScreenView alignment="top">
            <MessageModal
                title={"Campo vacio"}
                message={"por favor llena todos los campos"}
                isOpen={openWarning}
                setOpen={setOpenWarning}
            />
            <ThemedText text="Juegos registrados" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.map(game => 
                            <GameInfoCard 
                                key={game.id} 
                                game={game} 
                                handle_update={handle_update}
                                handle_delete={gamesctx.delete_game}
                            />
                        )}
                    </ColumnView> :
                    <ThemedText text="no hay juegos por mostrar" type="normal"/>
                }
            </MyScrollView>
        </ScreenView>
    );
}