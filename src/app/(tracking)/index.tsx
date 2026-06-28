import ScreenView from "../../components/ui/screen";
import ThemedText from "../../components/ui/texts";
import MyScrollView from "../../components/ui/scrollables";
import { CLEAR } from "../../utils/themeColors";
import ColumnView from "../../components/layouts/column";
import FloatButton from "../../components/interactives/floatbutons";
import ActionModal from "../../components/ui/modals/action";
import { useState } from "react";
import { useGameContext } from "../../hooks/context";
import ThemedTextInput from "../../components/interactives/inputs";
import { AntDesign } from "@expo/vector-icons";
import { Game } from "../../interfaces/models";
import GameStatusCard from "../../components/ui/cards/status";
import { get_formated_date } from "../../utils/constats";
import MessageModal from "../../components/ui/modals/message";

//pantalla principal
export default function Tracking(){
    //estados
    const [openAction,setOpenAction] = useState(false);
    const [openMessage,setOpenMessage] = useState(false);
    const [success,setSuccess] = useState(false);
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
            setSuccess(res);

            //cerrar el modal
            setOpenAction(false);

            //abrir modal de mensaje
            setOpenMessage(true);

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
            <MessageModal
                title={
                    success?
                    "Juego creado":
                    "Error al crear"
                }
                message={
                    success ?
                    "el juego ha sido registrado de forma exitosa":
                    "ha ocurrido un error al registrar el juego"
                }
                isOpen={openMessage}
                setOpen={setOpenMessage}
            />
            <ActionModal isOpen={openAction} setOpen={setOpenAction} action="registrar" onAction={() => handle_add(game)}>
                <ColumnView>
                    <ThemedText text="Registrar nuevo juego" type="title 2"/>
                    <ThemedText text="Nombre del juego:" type="normal"/>
                    <ThemedTextInput prefix={game.name} onChange={(v) => setGame({...game, name: v})}/>
                    <ThemedText text="fecha de inicio:" type="normal"/>
                    <ThemedTextInput prefix={game.start_date} onChange={(v) => setGame({...game, start_date: v})}/>
                </ColumnView>
            </ActionModal>
            <ThemedText text="Juegos en seguimiento" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.filter(game => game.status == 1).map(game => 
                            <GameStatusCard key={game.id} game={game} handle_update={gamesctx.update_game_status}/>
                        )}
                    </ColumnView> :
                    <ThemedText text="no hay juegos por mostrar" type="normal"/>
                }
            </MyScrollView>
            <ThemedText text="Juegos programados" type="title 2"/>
            <MyScrollView>
                {gamesctx.games.length != 0 ? 
                    <ColumnView>
                        {gamesctx.games.filter(game => game.status == 0).map(game => 
                            <GameStatusCard key={game.id} game={game} handle_update={gamesctx.update_game_status}/>
                        )}
                    </ColumnView> :
                    <ThemedText text="no hay juegos por mostrar" type="normal"/>
                }
            </MyScrollView>
            <FloatButton
                text="añadir juego"
                onClick={() => setOpenAction(!openAction)}
                icon={<AntDesign name="plus" size={16} color={CLEAR}/>}
            />
        </ScreenView>
    );
}
