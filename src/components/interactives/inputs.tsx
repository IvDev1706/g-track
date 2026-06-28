import { TextInput, StyleSheet } from "react-native";
import { PRIMARY } from "../../utils/themeColors";

interface ThemedTextInputProps {
    prefix?: string,
    onChange: (value:string) => void
}

export default function ThemedTextInput({ prefix, onChange }:ThemedTextInputProps){
    return (
        <TextInput style={styles.input} onChange={e => {if(e.nativeEvent.text.length > 3) onChange(e.nativeEvent.text.trim());}}>
            {prefix ? prefix : ""}
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: PRIMARY,
        borderBottomWidth: 2,
        padding: 2
    }
});