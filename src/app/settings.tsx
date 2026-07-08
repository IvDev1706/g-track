import DefaultButton from "../components/interactives/buttons";
import ColumnView from "../components/layouts/column";
import CardView from "../components/ui/cards/card";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import { View, Image } from "react-native";

//pantala principal
export default function Settings(){
    //pantalla de bienvenida
    return (
        <ScreenView>
            <ThemedText text="Parametros de seguimiento" type="title 2"/>
            <CardView>
                <ColumnView>
                    <ThemedText text="slot de juegos" type="title 2"/>
                    <ThemedText 
                        text="cuantos juegos se pueden tener en seguimiento a la vez."
                        type="normal"
                    />
                    <DefaultButton
                        text="guardar"
                        onClick={() => {}}
                    />
                </ColumnView>
            </CardView>
            <CardView>
                <ColumnView>
                    <ThemedText text="Hora de notificacion" type="title 2"/>
                    <ThemedText 
                        text="se notifica 1 dia antes del inicio del juego."
                        type="normal"
                    />
                    <DefaultButton
                        text="guardar"
                        onClick={() => {}}
                    />
                </ColumnView>
            </CardView>
            <CardView>
                <ColumnView>
                    <ThemedText text="Acceso rapido" type="title 2"/>
                    <ThemedText 
                        text="¿se debe ir a seguimiento al iniciar la app?"
                        type="normal"
                    />
                    <DefaultButton
                        text="guardar"
                        onClick={() => {}}
                    />
                </ColumnView>
            </CardView>
        </ScreenView>
    );
}