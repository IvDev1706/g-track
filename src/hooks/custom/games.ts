import { useState } from "react";
import * as game_repository from "../../database/games";
import * as notification_repository from "../../database/notifications";
import { Game } from "../../interfaces/models";
import { get_formated_date } from "../../utils/constats";
import * as NotificationService from "../../services/notification";

//hook de juegos
export default function useGames(){
    //estado de juegos
    const [games,setGames] = useState<Game[]>([]);

    //funciones del hook
    const get_games_db = (status?:number) => {
        //obtener juegos desde db
        game_repository.get_games(status).then(games => {
            //cargar al estado
            setGames(games);
        }).catch(err => console.error(err));
    }

    const add_new_game = async (game:Game) => {
        //mandar a la db
        const id = await game_repository.register_game(game);

        //validar resultado
        if(!id){
            return false;
        }

        //fijar notificacion
        const not_id = await NotificationService.scheduleNotification(game.name,game.start_date);
        notification_repository.register_notification(id,not_id);

        //añadir al estado
        game.id = id;
        setGames([...games,game]);

        //exito al crear
        return true;
    };

    const update_game_status = async (id:number, status:number) => {
        //mandar a la db
        const res = await game_repository.update_game_status(id,status);

        //validar resultado
        if(!res){
            return res;
        }

        //añadir al estado
        setGames(games.map(ogame => ogame.id != id ? ogame : {...ogame, status, end_date: get_formated_date()}));

        //exito al crear
        return res;
    };

    const update_game_data = async (game:Game) => {
        //mandar a la db
        const res = await game_repository.update_game_data(game);

        //validar resultado
        if(!res){
            return res;
        }

        //si cambio la fecha de inicio
        const ogame = games.find(ogame => ogame.id == game.id);
        if(ogame && ogame.start_date != game.start_date){
            //obtener notificacion
            const notif_id = await notification_repository.get_notification_id(game.id as number);
            //cancelar notificacion
            await NotificationService.cancelScheduledNotificacion(notif_id);
            //reagendar notificacion
            const not_id = await NotificationService.scheduleNotification(game.name,game.start_date);
            await notification_repository.update_notification(game.id as number,not_id);
        }

        //añadir al estado
        setGames(games.map(ogame => ogame.id != game.id ? ogame : game));

        //exito al crear
        return res;
    };

    const delete_game = async (id:number) => {
        //obtener notificacion id
        const notif_id = await notification_repository.get_notification_id(id);
        
        //mandar a la db
        const res = await game_repository.delete_game(id);

        //validar resultado
        if(!res){
            return res;
        }

        //obtener notificacion
        await NotificationService.cancelScheduledNotificacion(notif_id);

        //añadir al estado
        setGames(games.filter(game => game.id != id));

        //exito al crear
        return res;
    };

    //elementos del hook
    return { games, get_games_db, add_new_game, update_game_status, update_game_data, delete_game }
}