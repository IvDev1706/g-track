import { Text, StyleProp, TextStyle } from "react-native";
import * as texts from '../../utils/themeTexts';
import { DARK } from "../../utils/themeColors";

//propiedades del texto
interface ThemedTextProps {
    text: string
    color?: string
    type: "title" | "title 2" | "normal" | "button"
}

//componente de texto
export default function ThemedText({ text, color, type }:ThemedTextProps){
    //obtener estilos
    const styles = makeStyles(type, color);

    //retorno del componente
    return (
        <Text style={styles}>{text}</Text>
    );
}

//hacer estilos
const makeStyles = (type:string, textColor?:string):StyleProp<TextStyle> => {
    //verificar el tipo
    switch (type) {
        case "title":
            return {
                color: textColor ? textColor : DARK,
                fontSize: texts.TITLETEXT.size,
                fontWeight: texts.TITLETEXT.weight,
                textAlign: "center"
            };
        case "title 2":
            return {
                color: textColor ? textColor : DARK,
                fontSize: texts.TITLETEXT2.size,
                fontWeight: texts.TITLETEXT2.weight,
                textAlign: "center"
            };
        case "button":
            return {
                    color: textColor ? textColor : DARK,
                    fontSize: texts.BUTTONTEXT.size,
                    fontWeight: texts.BUTTONTEXT.weight,
                    textAlign: "center"
            };
        default:
            return {
                padding: 5,
                color: textColor ? textColor : DARK,
                fontSize: texts.NORMALTEXT.size,
                fontWeight: texts.NORMALTEXT.weight
            };
    }
}