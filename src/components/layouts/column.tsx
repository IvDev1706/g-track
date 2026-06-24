import { View, StyleProp } from "react-native";
import { ViewStyle } from "react-native";

//propiedades del contenedor
interface ColumnViewProps {
    children: Array<React.ReactElement>,
    distribution?: Array<number>,
    centered?: boolean
}

//estilos
const styles:StyleProp<ViewStyle> = ({
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 5
});

//layout de renglon
export default function ColumnView({ children, distribution }:ColumnViewProps){
    //retorno del contenedor
    return (
        <View style={styles}>
            {distribution ? children.map((child, i) => <View key={i} style={{flex: distribution[i]}}>
                {child}
            </View>) : children}
        </View>
    );
}