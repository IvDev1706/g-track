import ColumnView from "../components/layouts/column";
import CardView from "../components/ui/cards";
import GameCard from "../components/ui/games";
import ScreenView from "../components/ui/screen";
import MyScrollView from "../components/ui/scrollables";
import ThemedText from "../components/ui/texts";
import { useGameContext } from "../hooks/context";
import { WARN, CLEAR, PRIMARY } from "../utils/themeColors";

//pantalla principal
export default function History(){
    //contexto de juegos
    const gamesctx = useGameContext();

    //pantalla de historial
    return(
        <ScreenView alignment="top">
            <ThemedText text="Juegos completados" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.filter(game => game.status == 2).map(game => 
                            <GameCard key={game.id} game={game} handle_update={gamesctx.update_game}/>
                        )}
                    </ColumnView> :
                    <ThemedText text="no hay juegos por mostrar" type="normal"/>
                }
            </MyScrollView>
        </ScreenView>
    );
}