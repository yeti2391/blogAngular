import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    template: `
        <h1>{{titulo}}</h1>
        <h2>{{year}}</h2>
        <p>{{comentario}}</p>
    `
})

export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;

    constructor(){
        this.titulo = "Hola mundo de componentes";
        this.comentario = "este es mi primer componente";
        this.year = 2022;
        
        console.log("Componente mi-componente cargado");
        console.log(this.year, this.titulo, this.comentario)
    }
}
//a continuacion importar en app.module.ts para poder utilizarlo en toda la app