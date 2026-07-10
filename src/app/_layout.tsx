import { router, Stack } from "expo-router";
import { PRIMARY, CLEAR } from "../utils/themeColors";
import GamesProvider from "../hooks/providers/games";
import { useEffect, useState } from "react";
import * as NotificationService from "../services/notification";
import SettingsProvider from "../hooks/providers/settings";

//layout raiz
export default function RootLayout(){
    //estados
    const [status,setStatus] = useState("");

    //verificar notificaciones
    useEffect(() => {
        //configurar canal de android
        NotificationService.setupAndroidChannel();
        
        //verificar notificaciones
        NotificationService.checkNotificationStatus().then(status => {
            //pasar al estado
            setStatus(status);
        }).catch(err => console.error(err));
    },[]);

    //verificar estado
    useEffect(() => {
        //validar que haya un estado
        if(!status){
            return;
        }

        //validar si esta negado
        if(status == 'denied'){
            //pantalla de permisos
            router.navigate("permission");
        }

        //pedir permiso
        if(status == 'undetermined'){
            //pedir notificacion
            NotificationService.requestNotificationPermission().then(res => {
                //validar respuesta
                if(!res){
                    //pantalla de permisos
                    router.navigate("permission");
                }
            }).catch(err => console.error(err));
        }
    },[status]);

    //retornar un stack
    return (
        <SettingsProvider>
            <GamesProvider>
                <Stack screenOptions={{ 
                    headerShown: true,
                    headerStyle: { backgroundColor: PRIMARY },
                    headerTintColor: CLEAR,
                }}>
                    <Stack.Screen name="index" options={{ title: "principal" }} />
                    <Stack.Screen name="(tracking)" options={{ title: "seguimiento" }} />
                    <Stack.Screen name="games" options={{ title: "base de juegos" }} />
                    <Stack.Screen name="settings" options={{ title: "configuracion" }} />
                    <Stack.Screen name="permission" options={{ title: "permiso de notificaciones" }} />
                </Stack>
            </GamesProvider>
        </SettingsProvider>
    );
}