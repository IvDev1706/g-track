//configuracion de textos
export interface TextConfig {
    size: number,
    alignment: "center" | "left" | "right"
    weight: "bold" | "normal"
}

//configuraciones de la app
export interface AppConfig {
    slots: number,
    notification_hour: number,
    quick_start: boolean
}