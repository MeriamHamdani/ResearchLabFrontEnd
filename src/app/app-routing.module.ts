import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';

//on définit tous les routes dans cette constante
const routes: Routes = [
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'members',
    //pathMatch full pour accepter seulement memebers non memebers123 ou member 
    pathMatch:'full',
    component:MemberListComponent
  },
  {
    path:'form',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'members/:id/edit',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'members/:id/delete',
    pathMatch:'full',
    component:MemberFormComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login',
  },
  {
    path:'**', //on ecrit n'importe quoi daans l'url 
    redirectTo:'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
