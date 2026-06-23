import { Modal, View, StyleProp, ViewStyle } from "react-native";
import { DARK, CLEAR } from "../../utils/themeColors";
import CardView from "./cards";
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
            <View style={styles}>
                <CardView bgcolor={CLEAR}>
                    {children}
                    <RowView distribution={[0.5,0.5]}>
                        <DefaultButton text={action} onClick={onAction}/>
                        <DefaultButton text="cerrar" onClick={() => setOpen(false)}/>
                    </RowView>
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