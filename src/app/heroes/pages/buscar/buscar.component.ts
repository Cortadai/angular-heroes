import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Heroe[]=[];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroeService.setOrigen("buscar");
  }

  buscando(){
    this.heroeService.getSugerencias(this.termino.trim())
      .subscribe(heroes=>{
        this.heroes=heroes;
      });
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    if(!event.option.value){
      return;
    }
    const heroe:Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroeService.getHeroePorId(heroe.id!)
      .subscribe(heroe=>{
        this.heroeSeleccionado=heroe;
        this.router.navigate([`/heroes/${heroe.id}`])
      });
  }


}
