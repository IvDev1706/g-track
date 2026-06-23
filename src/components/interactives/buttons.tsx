import { Pressable, StyleProp, ViewStyle } from "react-native";
import ThemedText from "../ui/texts";
import { CLEAR, PRIMARY, PRIMARY2 } from "../../utils/themeColors";
import React, { ReactElement } from "react";

//propiedades de boton
interface DefaultButtonProps {
    icon?: ReactElement
    text: string,
    onClick: () => void
}

//componente de botones
export default function DefaultButton({ icon, text, onClick }:DefaultButtonProps){
    return (
        <Pressable style={({ pressed }) => [
            styles,
            {
                backgroundColor: pressed ? PRIMARY2 : PRIMARY,
                borderColor: pressed ? PRIMARY2 : PRIMARY
            }
        ]} onPress={ e => onClick()}>
            {icon}
            {text != "" && !icon && <ThemedText text={text} type="button" color={CLEAR} />}
        </Pressable>
    );
}

//estilos de boton
const styles:StyleProp<ViewStyle> = {
    alignItems: "center",
    padding: 5,
    borderWidth: 3,
    borderRadius: 5
};