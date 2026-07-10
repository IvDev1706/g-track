import { createContext, useContext } from "react";
import { AppSettings } from "../../interfaces/config";

//propiedades del contexto
interface SettingsContextType {
    settings: AppSettings|undefined,
    set_settings: (settings:AppSettings) => void
    load_settings: () => Promise<AppSettings|undefined>
    write_settings: () => Promise<void>
}


//contexto de configuraciones
export const SettingsContext = createContext<SettingsContextType|undefined>(undefined);

//consumer
export function useSettingsContext(){
    //obtener el contexto
    const settingsctx = useContext(SettingsContext);

    //validar contexto
    if(!settingsctx){
        throw new Error("No se puede usar context sin provider");
    }

    //retornar el contexto
    return settingsctx;
}