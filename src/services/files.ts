import * as FileSystem from 'expo-file-system';

//obtener el archivo
const getFile = (filename:string) => new FileSystem.File(FileSystem.Paths.document, filename);

//leer contenido de un archivo
export async function readContent(filename:string):Promise<Array<string>>{
    //obtener objeto archivo
    const file = getFile(filename);

    //verificar existencia
    if(!file.exists){
        //se crea
        file.create();
        return [];
    }

    //leer contenido
    const text = await file.text();

    //verificar contenido
    if(text == ''){
        return [];
    }

    return text.split("\n");
}

export async function writeLine(filename:string, line:string){
    //obtener el archivo
    const file = getFile(filename);

    //leer contenido
    const content = await readContent(filename);

    //añadir la linea
    content.push(line);

    //escribir contenido
    file.write(content.join("\n"));
}

export async function writeContent(filename:string, content:Array<string>){
    //obtener el archivo
    const file = getFile(filename);

    //leer contenido
    const og_content = await readContent(filename);

    //añadir la linea
    content.forEach(line => og_content.push(line));

    //limpiar el contenido original
    cleanContent(filename);

    //escribir contenido
    file.write(content.join("\n"));
}

export function cleanContent(filename:string){
    //obtener el archivo
    const file = getFile(filename);

    //escribir string vacio
    file.write('');
}

export function deleteFile(filename:string){
    //obtener el archivo
    const file = getFile(filename);

    //escribir string vacio
    file.delete();
}