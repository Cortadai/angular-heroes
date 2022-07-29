import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
     img{
      width:100%;
      border-radius:5px;
     }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:"DC Comics",
      desc: "DC - Comics"
    },
    {
      id:"Marvel Comics",
      desc: "Marvel - Comics"
    },
  ]

  heroe: Heroe = {
    superhero:"",
    alter_ego:"",
    characters:"",
    first_appearance:"",
    publisher:Publisher.DCComics,
    alt_img:""
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router:Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if(!this.router.url.includes("editar")){
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=>
          this.heroesService.getHeroePorId(id)),
        tap(console.log)
      )
      .subscribe( heroe=> {
        this.heroe=heroe;
      });
  }

  guardar(){
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe=>{
          this.mostrarSnackBar("Registro actualizado");
          this.router.navigate(["/heroes"]); 
        });
    } else {
      if(this.heroe.superhero.trim().length===0){
        return;
      }
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe=>{
          this.mostrarSnackBar("Registro creado");
          this.router.navigate(["/heroes",heroe.id]);
        });
    }
  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe(resp=>{
        if(resp){
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp=>{
              this.mostrarSnackBar("Registro eliminado");
              this.router.navigate(["/heroes"]);
            });
        }
      });

  }

  mostrarSnackBar(mensaje:string){
    this.snackBar.open(mensaje, "ok!", 
      {
        duration: 2500
      }
    );
  }

}
