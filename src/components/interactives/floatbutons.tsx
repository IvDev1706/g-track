import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ui/texts";
import { PRIMARY2, PRIMARY } from "../../utils/themeColors";
import React, { ReactElement } from "react";

//propiedades de boton
interface FloatButtonProps {
    icon?: ReactElement
    text: string,
    onClick: () => void
}

//componente de botones
export default function FloatButton({ icon, text, onClick }:FloatButtonProps){
    return (
        <Pressable style={({ pressed }) => [
            styles.button,
            {
                backgroundColor: pressed ? PRIMARY2 : PRIMARY,
                borderColor: pressed ? PRIMARY2 : PRIMARY
            }
        ]} onPress={ e => onClick()}>
            <View style={styles.content}>
                {icon}
                {text != "" && <ThemedText text={text} type="button" />}
            </View>
        </Pressable>
    );
}

//estilos de boton
const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderWidth: 5,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute",
        top: "94%",
        left: "72%"
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
});