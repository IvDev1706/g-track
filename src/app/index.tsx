import { Redirect } from "expo-router";

export default function index(){
    //redirigir a tracking
    return (
        <Redirect href={"/tracking"}/>
    );
}