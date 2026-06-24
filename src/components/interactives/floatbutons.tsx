import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ui/texts";
import { SECONDARY2, SECONDARY, CLEAR } from "../../utils/themeColors";
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
                backgroundColor: pressed ? SECONDARY2 : SECONDARY,
                borderColor: pressed ? SECONDARY2 : SECONDARY
            }
        ]} onPress={ e => onClick()}>
            <View style={styles.content}>
                {icon}
                {text != "" && <ThemedText text={text} type="button" color={CLEAR} />}
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