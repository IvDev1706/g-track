import CardView from "../components/ui/cards";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import MyScrollView from "../components/ui/scrollables";
import { CLEAR, PRIMARY, SECONDARY } from "../utils/themeColors";
import ColumnView from "../components/layouts/column";
import FloatButton from "../components/interactives/floatbutons";
import ModalLayer from "../components/ui/modals";
import { useState } from "react";

//pantalla principal
export default function Index(){
    //estados
    const [open,setOpen] = useState(false);

    //pantalla de inicio
    return(
        <ScreenView alignment="top">
            <ModalLayer isOpen={open} setOpen={setOpen} />
            <ThemedText text="Juegos en seguimiento" type="title 2"/>
            <ColumnView>
                <CardView bgcolor={PRIMARY}>
                    <ThemedText text="plants vs zombies 2" type="normal" color={CLEAR}/>
                </CardView>
                <CardView bgcolor={PRIMARY}>
                    <ThemedText text="pokemon ultra sol" type="normal" color={CLEAR}/>
                </CardView>
                <CardView bgcolor={PRIMARY}>
                    <ThemedText text="crash twinsanity" type="normal" color={CLEAR}/>
                </CardView>
            </ColumnView>
            <ThemedText text="Juegos programados" type="title 2"/>
            <MyScrollView>
                <CardView bgcolor={SECONDARY}>
                    <ThemedText text="sonic unleashed" type="normal" color={CLEAR}/>
                </CardView>
                <CardView bgcolor={SECONDARY}>
                    <ThemedText text="pokemon rojo fuego" type="normal" color={CLEAR}/>
                </CardView>
                <CardView bgcolor={SECONDARY}>
                    <ThemedText text="wario land 1" type="normal" color={CLEAR}/>
                </CardView>
            </MyScrollView>
            <FloatButton text="añadir juego" onClick={() => setOpen(!open)}/>
        </ScreenView>
    );
}
