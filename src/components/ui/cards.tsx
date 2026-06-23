import { StyleProp, View, ViewStyle } from "react-native";
import { CLEAR, DARK, PRIMARY, PRIMARY2, SECONDARY } from "../../utils/themeColors";
import { ReactNode } from "react";

//propiedades de carview
interface CardViewProps {
    children: ReactNode,
    bgcolor?: string
}

//caja con borde redondeado
export default function CardView({ children, bgcolor }:CardViewProps){
    //obtener estilos
    const styles = makeStyles(bgcolor);

    //vista de caja
    return (
        <View style={styles}>
            {children}
        </View>
    );
}

//estilos
const makeStyles = (bgcolor?:string):StyleProp<ViewStyle> => ({
    backgroundColor: bgcolor ? bgcolor : CLEAR,
    gap: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: DARK,
    padding: 5
});