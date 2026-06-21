import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CLEAR } from "../../utils/themeColors";
import { StatusBar } from "expo-status-bar";
import { StyleProp, ViewStyle } from "react-native";
import { useEffect } from "react";

//parametros de vista
interface ScreenViewProps {
    children: React.ReactNode
    alignment?: "top" | "bottom"
    bgcolor?: string
}

//vista abse de pantalla
export default function ScreenView({ children, alignment, bgcolor }:ScreenViewProps){
    //obtener estilos
    const styles = makeStyles(alignment,bgcolor);

    //pantalla de aplicacion
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles}>
                <StatusBar style="auto"/>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

//estilos de vista
const makeStyles = (alignment?:string, bgcolor?:string):StyleProp<ViewStyle> => ({
    backgroundColor: bgcolor ? bgcolor : CLEAR,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: alignment == "top" ? "flex-start" : 
                    alignment == "bottom" ? "flex-end" :
                    'center',
    gap: 15
})
