import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import MyScrollView from "../components/ui/scrollables";
import ColumnView from "../components/layouts/column";
import { useGameContext } from "../hooks/context";
import GameInfoCard from "../components/ui/cards/info";

//pantalla principal
export default function Tracking(){
    //contexto de juegos
    const gamesctx = useGameContext();

    //pantalla de inicio
    return(
        <ScreenView alignment="top">
            <ThemedText text="Juegos registrados" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.map(game => 
                            <GameInfoCard 
                                key={game.id} 
                                game={game} 
                                handle_update={gamesctx.update_game_data} 
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