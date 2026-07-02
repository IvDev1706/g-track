export interface Game {
    id?: number
    name: string
    start_date: string
    end_date?: string
    status: number
}

export interface GameNotification {
    id?: number
    game: number
    notification_id: string
}