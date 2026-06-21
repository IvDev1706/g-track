import CardView from "../components/ui/cards";
import ScreenView from "../components/ui/screen";
import MyScrollView from "../components/ui/scrollables";
import ThemedText from "../components/ui/texts";
import { WARN, CLEAR } from "../utils/themeColors";

//pantalla principal
export default function History(){
    return(
        <ScreenView alignment="top">
            <ThemedText text="Juegos completados" type="title 2"/>
            <MyScrollView>
                <CardView bgcolor={WARN}>
                    <ThemedText text="sonic unleashed" type="normal"/>
                </CardView>
                <CardView bgcolor={WARN}>
                    <ThemedText text="pokemon rojo fuego" type="normal"/>
                </CardView>
                <CardView bgcolor={WARN}>
                    <ThemedText text="wario land 1" type="normal"/>
                </CardView>
            </MyScrollView>
        </ScreenView>
    );
}