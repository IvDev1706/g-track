import { Pressable, StyleProp, ViewStyle } from "react-native";
import ThemedText from "../ui/texts";
import { CLEAR, DANGER, DANGER2, DARK, PRIMARY, PRIMARY2, SECONDARY, SECONDARY2, WARN, WARN2 } from "../../utils/themeColors";
import React, { ReactElement } from "react";

//propiedades de boton
interface DefaultButtonProps {
    icon?: ReactElement
    style?: "primary" | "secondary" | "danger" | "warn"
    text: string,
    onClick: () => void
}

//componente de botones
export default function DefaultButton({ icon, style, text, onClick }:DefaultButtonProps){
    //obtener el tema
    const theme = get_theme(style ? style : "secondary");

    //componente de boton
    return (
        <Pressable style={({ pressed }) => [
            styles,
            {
                backgroundColor: pressed ? theme[1] :theme[0],
                borderColor: pressed ? theme[1] :theme[0]
            }
        ]} onPress={ e => onClick()}>
            {icon}
            {text != "" && <ThemedText text={text} type="button" color={style && style == "warn" ? DARK : CLEAR} />}
        </Pressable>
    );
}

//estilos de boton
const styles:StyleProp<ViewStyle> = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 3,
    borderRadius: 5,
    gap: 5
};

//obtener el color
const get_theme = (style:string):Array<string> => {
    switch(style){
        case "secondary":
            return [SECONDARY,SECONDARY2];
        case "danger":
            return [DANGER,DANGER2];
        case "warn":
            return [WARN,WARN2];
        default:
            return [PRIMARY,PRIMARY2];
    }
}