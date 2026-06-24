import { View, StyleProp, ViewStyle } from "react-native";

//propiedades del contenedor
interface RowViewProps {
    children: Array<React.ReactElement>,
    distribution?: Array<number>
}

//estilos
const styles:StyleProp<ViewStyle> = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5
};

//layout de renglon
export default function RowView({ children, distribution }:RowViewProps){
    //retorno del contenedor
    return (
        <View style={styles}>
            {distribution ? children.map((child, i) => <View key={i} style={{flex: distribution[i]}}>
                {child}
            </View>) : children}
        </View>
    );
}