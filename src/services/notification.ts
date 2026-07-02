import * as Notifications from "expo-notifications";
import { PRIMARY } from "../utils/themeColors";
import { parse_date } from "../utils/constats";

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


//pedir permiso explicito
export async function requestNotificationPermission(){
    //obtener permiso
    const { status } = await Notifications.getPermissionsAsync();

    //validar si ya tiene el permiso
    if(status == 'granted'){
        //ya lo tiene
        return true;
    }

    //permiso explicito apartir de android 13 (API 33)
    if (status == 'undetermined') {
        //obtener el estatus del permiso
        const { status } = await Notifications.requestPermissionsAsync();
        //regresar el estado
        return status == 'granted';
    }

    return false;
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
    return id
}

//eliminar notificacion
export async function cancelScheduledNotificacion(id:string){
    //cancelar la notificacion
    await Notifications.cancelScheduledNotificationAsync(id);
}
