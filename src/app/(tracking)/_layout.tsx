import { Tabs } from "expo-router";
import { CLEAR2, PRIMARY, PRIMARY2 } from "../../utils/themeColors";
import { AntDesign } from "@expo/vector-icons";

//layout raiz
export default function TrackLayout(){
    //layout stack
    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarStyle: { 
                backgroundColor: CLEAR2,
                borderTopWidth: 2,
                borderTopColor: PRIMARY
            },
            tabBarActiveTintColor: PRIMARY2,
            tabBarInactiveTintColor: PRIMARY
        }}>
            <Tabs.Screen
                name="tracking"
                options={{
                    title: "seguimiento",
                    tabBarLabel: "seguimiento",
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="aim" color={color} size={size}/>
                    )
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "historial",
                    tabBarLabel: "historial",
                    tabBarIcon: ({color, size}) => (
                        <AntDesign name="history" color={color} size={size}/>
                    )
                }}
            />
        </Tabs>
    );
}