import { useEffect, useState } from "react";
import DefaultButton from "../components/interactives/buttons";
import ThemedTextInput from "../components/interactives/inputs";
import ColumnView from "../components/layouts/column";
import CardView from "../components/ui/cards/card";
import ScreenView from "../components/ui/screen";
import ThemedText from "../components/ui/texts";
import { useSettingsContext } from "../hooks/contexts/settings";
import { AppSettings } from "../interfaces/config";
import MessageModal from "../components/ui/modals/message";
import DefaultSwitch from "../components/interactives/switches";

//pantala principal
export default function Settings(){
    //estados
    const [cpsettings,setCpSettings] = useState<AppSettings>({
        slots:0,
        notification_hour:0,
        quick_start: false
    });
    const [open,setOpen] = useState(false);

    //contexto de settings
    const settingsctx = useSettingsContext();

    //efecto para copiar settings
    useEffect(() => {
        //validar que existen
        if(!settingsctx.settings){
            return;
        }

        //cargar copia
        setCpSettings(settingsctx.settings);
    },[settingsctx.settings]);

    //pantalla de bienvenida
    return (
        <ScreenView>
            <MessageModal
                message="los valores de configuracion se han han guardado"
                title="configuracion guardada"
                isOpen={open}
                setOpen={setOpen}
            />
            <ThemedText text="Parametros de seguimiento" type="title 2"/>
            <CardView>
                <ColumnView>
                    <ThemedText text="slot de juegos" type="title 2"/>
                    <ThemedText 
                        text="cuantos juegos se pueden tener en seguimiento a la vez."
                        type="normal"
                    />
                    <ThemedTextInput 
                        prefix={cpsettings.slots.toString()}
                        onChange={v => settingsctx.set_settings({...cpsettings, slots: parseInt(v)})}
                    />
                    <ThemedText text="Hora de notificacion" type="title 2"/>
                    <ThemedText 
                        text="se notifica 1 dia antes del inicio del juego."
                        type="normal"
                    />
                    <ThemedTextInput 
                        prefix={cpsettings.notification_hour.toString()}
                        onChange={v => settingsctx.set_settings({...cpsettings, notification_hour: parseInt(v)})}
                    />
                    <ThemedText text="Acceso rapido" type="title 2"/>
                    <ThemedText 
                        text="¿se debe ir a seguimiento al iniciar la app?"
                        type="normal"
                    />
                    <DefaultSwitch 
                        state={cpsettings.quick_start}
                        onChange={(s) => settingsctx.set_settings({...cpsettings, quick_start: s})}
                    />
                    <DefaultButton
                        text="guardar"
                        onClick={() => { settingsctx.write_settings(); setOpen(true)}}
                    />
                </ColumnView>
            </CardView>
        </ScreenView>
    );
}