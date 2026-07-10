import { useState } from "react";
import { AppSettings } from "../../interfaces/config";
import * as FileService from "../../services/files";

//hook de configuraciones
export default function useSettings(){
    //estado de configuraciones
    const [settings,setSettings] = useState<AppSettings|undefined>(undefined);

    //operaciones
    const load_settings = async () => {
        //cargar los datos guardados
        const data = await FileService.readContent("settings.json");

        //si no hay contenido
        if(!data.length){
            return undefined;
        }

        //retornar valores
        return JSON.parse(data[0]) as AppSettings;
    }

    const write_settings = async () => {
        //limpiar contenido
        FileService.cleanContent("settings.json");

        //escribir los parametros actuales
        await FileService.writeLine("settings.json",JSON.stringify(settings));
    }

    const set_settings = (settings:AppSettings) => {
        //actualizar el estado
        setSettings(settings);
    }

    //elementos del hook
    return { settings, set_settings, load_settings, write_settings }
}