import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  //las propiedades publicas al final voy a poder mostrarlas en la vista ejemplo:
  public nombre!: string;
  public apellido!:string;

  constructor( private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=>{
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
    });
  }

  redireccion(){
    this._router.navigate(['/pagina-de-pruebas', 'Marco', 'Gonzalez']);
  }

}
 