import React from "react";
import {ScrollView } from "react-native";


//propiedades de pantalla
interface ScreenViewProps {
    children: React.ReactNode
}

//pantalla base
export default function MyScrollView({ children }:ScreenViewProps){
    return (
        <ScrollView 
            style={{ flex: 1, width: "100%" }} 
            contentContainerStyle={{ justifyContent: 'flex-start', gap: 15 }}
        >
            {children}
        </ScrollView>
    );
}