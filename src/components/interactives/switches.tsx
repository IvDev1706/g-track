import { Switch } from "react-native";
import { CLEAR2, PRIMARY, CLEAR } from "../../utils/themeColors";
import { View } from "react-native";

//propiedades del switch
interface DefaultSwitchProps {
    state: boolean
    onChange: (v:boolean) => void
}

//componente de switch
export default function DefaultSwitch({ state, onChange }:DefaultSwitchProps){
    return (
        <Switch
            trackColor={{ false: CLEAR2, true: PRIMARY }}
            thumbColor={CLEAR}
            onValueChange={onChange}
            value={state}
        />
    );
}