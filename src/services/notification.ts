import * as Notifications from "expo-notifications";
import { PRIMARY } from "../utils/themeColors";
import { parse_date } from "../utils/constats";
import { Platform } from "react-native";

//manejador de notificaciones
//define como se muestran las notificaciones
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
    })
});

//verificar el estado del permiso
export async function checkNotificationStatus(){
    //obtener permiso
    const { status } = await Notifications.getPermissionsAsync();

    //dato entre granted, undetermined, denied
    return status;
}


//pedir permiso explicito
export async function requestNotificationPermission(){
    // Android 13+ requiere permiso explícito
    if(Platform.OS == 'android' && Platform.Version >= 33) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status != 'granted') return false;
    }

    //permiso concedido
    return true;
}

//crear canal de notificaciones (android)
export async function setupAndroidChannel() {
    //configurar el canal
    await Notifications.setNotificationChannelAsync('default', {
        name: 'General',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: PRIMARY,
    });
}

//registrar notificacion
export async function scheduleNotification(game_name:string, date:string):Promise<string>{
    //fecha del evento
    const notification_date = parse_date(date,1);
    notification_date.setHours(20);

    //agendar notificacion
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: `Comienza ${game_name} mañana!`,
            body: `
                No olvides actualizar el estado de ${game_name} y 
                comiences a jugar.
            `
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notification_date,
            channelId: "default"
        }
    });

    //retornar id
    return id;
}

//eliminar notificacion
export async function cancelScheduledNotificacion(id:string){
    //cancelar la notificacion
    await Notifications.cancelScheduledNotificationAsync(id);
}
