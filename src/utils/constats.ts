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

//parsear fecha (texto) a date
export function parse_date(date:string, diff:number = 0){
    //obtener fecha
    const [year,month,day] = date.split('-').map(Number);

    //construir la fecha
    const parsed_date = new Date(
        year,
        month-1,
        day
    );

    //verificar diferencia
    if(diff){
        //restar en milisegundos (mas preciso)
        parsed_date.setDate(parsed_date.getTime()-(diff * 24 * 60 * 60 * 1000));
    }

    //retornar fecha
    return parsed_date;
}