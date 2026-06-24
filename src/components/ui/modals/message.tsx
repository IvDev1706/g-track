import { Modal, View, StyleSheet } from "react-native";
import { DARK, CLEAR } from "../../../utils/themeColors";
import DefaultButton from "../../interactives/buttons";
import RowView from "../../layouts/row";
import { ReactNode } from "react";
import ThemedText from "../texts";

//propiedades de modal
interface ModalProps {
    title: string
    message: string
    isOpen: boolean
    setOpen: (visible:boolean) => void
}

//modal para capturar texto
export default function MessageModal({ title, message, isOpen, setOpen }:ModalProps){    
    //obtener estilos
    const styles = makeStyles();
    
    //modal
    return(
        <Modal
            animationType="fade"
            transparent={false}
            visible={isOpen}
            onRequestClose={() => {
                setOpen(false);
            }}
            backdropColor={DARK+"99"}
        >
            <View style={styles.layer}>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <ThemedText text={title} type="title 2"/>
                        <ThemedText text={message} type="normal"/>
                        <DefaultButton text="cerrar" onClick={() => setOpen(false)}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

//estilos del modal
const makeStyles = () => StyleSheet.create({
    layer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: DARK,
        backgroundColor: CLEAR,
    },
    body: {
        gap: 10,
        padding: 10
    }
});