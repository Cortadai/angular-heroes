import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';

const heroesRoutes: Routes=[
  {
    path:"",
    component: HomeComponent,
    children: [
      {
        path:"agregar",
        component: AgregarComponent
      }
      ,
      {
        path:"editar/:id",
        component: AgregarComponent
      },
      {
        path:"buscar",
        component: BuscarComponent
      },
      {
        path:"listado",
        component: ListadoComponent
      },
      {
        path:":id",
        component: HeroeComponent
      },
      {
        path:"**",
        redirectTo:"listado"
      }
    ] 
  },
  {
    path:"**",
    redirectTo: "404"
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
