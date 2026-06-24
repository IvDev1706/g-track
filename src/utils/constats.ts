//estados de tracking
export const GAMESTATUS = [
    "programado",
    "siguiendo",
    "finalizado"
]

//obtener la fecha parseada
export function get_formated_date(){
    //obtener la fecha
    const date = new Date();

    //partes de la fecha
    const year = date.getFullYear();
    const month = (date.getMonth()+1).toString().padStart(2,"0");
    const day = date.getDate().toString().padStart(2,"0");
    
    //dar el formato YYYY-MM-DD
    return year + "-" + month + "-" + day;
}