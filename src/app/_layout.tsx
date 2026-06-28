import { Stack } from "expo-router";
import { PRIMARY, CLEAR } from "../utils/themeColors";
import GamesProvider from "../hooks/provider";

//layout raiz
export default function RootLayout(){
    //retornar un stack
    return (
        <GamesProvider>
            <Stack screenOptions={{ 
                headerShown: true,
                headerStyle: { backgroundColor: PRIMARY },
                headerTintColor: CLEAR,
            }}>
                <Stack.Screen name="(tracking)" options={{ title: "seguimiento" }} />
                <Stack.Screen name="games" options={{ title: "base de juegos" }} />
            </Stack>
        </GamesProvider>
    );
}