import { Modal, View, StyleProp, ViewStyle } from "react-native";
import { DARK, PRIMARY } from "../../utils/themeColors";
import { ReactNode, useEffect, useState } from "react";
import CardView from "./cards";
import ThemedText from "./texts";

//propiedades de modal
interface ModalProps {
    isOpen: boolean
    setOpen: (visible:boolean) => void
}

//modal para capturar texto
export default function ModalLayer({ isOpen, setOpen }:ModalProps){    
    //modal
    return(
        <Modal
            animationType="fade"
            transparent={false}
            visible={isOpen}
            onRequestClose={() => {
                setOpen(!isOpen);
            }}
            backdropColor={DARK+"11"}
        >
            <View style={styles}>
                <CardView>
                    <ThemedText text="soy un modal" type="normal"/>
                    <ThemedText text="muestro mensajes y" type="normal"/>
                    <ThemedText text="permito capturar datos" type="normal"/>
                </CardView>
            </View>
        </Modal>
    );
}

//estilos del modal
const styles:StyleProp<ViewStyle> = {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
};