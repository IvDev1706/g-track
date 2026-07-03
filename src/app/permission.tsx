import DefaultButton from "../components/interactives/buttons";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import { Linking } from "react-native";

//pantalla de permisos
export default function PermissionRequest(){
    //pantalla de permisos
    return (
        <ScreenView>
            <ThemedText text="Sin permiso de notificaciones" type="title 2"/>
            <ThemedText 
                text="se ha detectado que no esta concedido el permiso de notificaciones"
                type="normal"
            />
            <DefaultButton text="ir a ajustes" onClick={() => Linking.openSettings()}/>
        </ScreenView>
    );
}