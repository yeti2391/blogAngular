import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  
  public peliculas:Array<any>;

  constructor() { 
    this.peliculas=[
      {year: 2002, title: 'Spiderman', image:'https://wallpapercave.com/dwp1x/OsrCGAo.jpg'},
      {year: 2019, title: 'Avengers End Game', image:'https://buzz.tt/assets/media/movies/2384/2384_bgslds.jpg'},
      {year: 2022, title: 'The batman', image:'https://www.soctex.com/wp-content/uploads/2021/07/The-Batman-2022.jpg'}
    ];
  }

  ngOnInit(): void {
    console.log(this.peliculas);
  }

}
