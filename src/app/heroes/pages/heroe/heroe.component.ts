import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width:100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>
          this.heroesService.getHeroePorId(id)),
        tap(console.log)
      )
      .subscribe( heroe=> {
        this.heroe=heroe;
      });
    
    // this.activatedRoute.params
    //   .subscribe(({id})=>{
    //     console.log(id);   
    //   });
  }

  regresarListado(){
    this.router.navigate(["/heroes/listado"]);
  }

  regresarAnteriorQueSea(){
    this.location.back();
  }

  regresarBajoOrigen(){
    switch (this.heroesService.getOrigen()) {
      case 'buscar':
        this.router.navigate(["/heroes/buscar"]);
        break;
      default:
        this.router.navigate(["/heroes/listado"]);
        break;
    }
  }

}
