import { ReactNode, useEffect } from "react";
import { SettingsContext } from "../contexts/settings";
import useSettings from "../custom/settings";

//propiedades del provider
interface SettingsProviderProps {
    children: ReactNode
}

//wrapper para settings
export default function SettingsProvider({ children }:SettingsProviderProps){
    //hook de settings
    const settigs_hook = useSettings();

    //efecto para cargar ajustes
    useEffect(() => {
        //leer contenido
        settigs_hook.load_settings().then(data => {
            //verificar datos
            if(data){
                settigs_hook.set_settings(data);
            }else{
                settigs_hook.set_settings({
                    slots: 3,
                    notification_hour: 20,
                    quick_start: false
                });
            }
        }).catch(err => console.error(err));
    },[]);
    
    //proveedor para settings
    return (
        <SettingsContext.Provider
            value={settigs_hook}
        >
            {children}
        </SettingsContext.Provider>
    );
}