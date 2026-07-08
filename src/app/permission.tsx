import DefaultButton from "../components/interactives/buttons";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import { Linking, Image, View } from "react-native";

//pantalla de permisos
export default function PermissionRequest(){
    //icono de notificaciones
    const notification_ico = require('../../assets/notification_ico.png');
    //pantalla de permisos
    return (
        <ScreenView>
            <View style={{ alignItems: "center" }}>
                <Image source={notification_ico} style={{ width: 224, height: 192 }}/>
            </View>
            <ThemedText text="Sin permiso de notificaciones" type="title 2"/>
            <ThemedText 
                text="se ha detectado que no esta concedido el permiso de notificaciones"
                type="normal"
            />
            <DefaultButton text="ir a ajustes" onClick={() => Linking.openSettings()}/>
        </ScreenView>
    );
}