import { router } from "expo-router";
import DefaultButton from "../components/interactives/buttons";
import ColumnView from "../components/layouts/column";
import CardView from "../components/ui/cards/card";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import { View, Image } from "react-native";
import { useEffect } from "react";
import { useSettingsContext } from "../hooks/contexts/settings";

//pantala principal
export default function Index(){
    //icono de la app
    const gtrack_logo = require('../../assets/g_track_logo.png');

    //contextos
    const settingsctx = useSettingsContext();

    //efecto para configuracion
    useEffect(() => {
        //validar existencia
        if(!settingsctx.settings){
            return;
        }

        //validar configuracion
        if(settingsctx.settings.quick_start){
            //redirigir
            router.navigate("/tracking");
        }
    },[settingsctx.settings]);

    //pantalla de bienvenida
    return (
        <ScreenView>
            <View style={{ alignItems: "center" }}>
                <Image source={gtrack_logo} style={{ width: 192, height: 192 }}/>
            </View>
            <ThemedText text="bienvenido a g-track" type="title"/>
            <CardView>
                <ColumnView>
                    <ThemedText text="seguimiento de juegos" type="title 2"/>
                    <ThemedText 
                        text="da seguimiento al avance de tus juegos"
                        type="normal"
                    />
                    <DefaultButton
                        text="ir a seguimiento"
                        onClick={() => router.navigate("/tracking")}
                    />
                </ColumnView>
            </CardView>
            <CardView>
                <ColumnView>
                    <ThemedText text="base de juegos" type="title 2"/>
                    <ThemedText 
                        text="consulta y modifica tus juegos registrados"
                        type="normal"
                    />
                    <DefaultButton
                        text="ir a base de juegos"
                        onClick={() => router.navigate("/games")}
                    />
                </ColumnView>
            </CardView>
             <CardView>
                <ColumnView>
                    <ThemedText text="configuracion" type="title 2"/>
                    <ThemedText 
                        text="cambia los parametros del seguimiento"
                        type="normal"
                    />
                    <DefaultButton
                        text="ir configuracion"
                        onClick={() => router.navigate("/settings")}
                    />
                </ColumnView>
            </CardView>
        </ScreenView>
    );
}