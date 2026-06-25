import { Stack } from "expo-router";

//layout raiz
export default function RootLayout(){
    //retornar un stack
    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}