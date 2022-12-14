import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const authRoutes: Routes=[
  {
    path:"",
    children: [
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"registro",
        component: RegistroComponent
      },
      {
        path:"**",
        redirectTo:"login"
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
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
