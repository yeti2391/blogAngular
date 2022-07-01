import { Component } from "@angular/core";

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-compomente.component.html'
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