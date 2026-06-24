import { Modal, View, StyleSheet } from "react-native";
import { DARK, CLEAR } from "../../utils/themeColors";
import DefaultButton from "../interactives/buttons";
import RowView from "../layouts/row";
import { ReactNode } from "react";

//propiedades de modal
interface ModalProps {
    children: ReactNode
    isOpen: boolean
    setOpen: (visible:boolean) => void
    action: string
    onAction: () => void
}

//modal para capturar texto
export default function ModalLayer({ isOpen, setOpen, children, action, onAction }:ModalProps){    
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
                        {children}
                        <RowView distribution={[0.5,0.5]}>
                            <DefaultButton text={action} onClick={onAction}/>
                            <DefaultButton text="cerrar" onClick={() => setOpen(false)}/>
                        </RowView>
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