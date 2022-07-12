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
      {title: 'Spiderman', image:'https://wallpapercave.com/dwp1x/OsrCGAo.jpg'},
      {title: 'Avengers End Game', image:'https://images.wallpapersden.com/image/wxl-poster-of-avengers-endgame-movie_63830.jpg'},
      {title: 'The batman', image:'https://www.soctex.com/wp-content/uploads/2021/07/The-Batman-2022.jpg'}
    ];
  }

  ngOnInit(): void {
    console.log(this.peliculas);
  }

}
