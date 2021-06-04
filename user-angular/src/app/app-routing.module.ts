import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from "./connexion/connexion.component";
import { SignUpComponent} from "./sign-up/sign-up.component";
import { TasksComponent} from "./tasks/tasks.component";
import {AuthGuardService as AuthGuard} from "./auth-gard.service";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in'},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'disconnect', component: ConnexionComponent },
  { path: 'sign-in', component: ConnexionComponent },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
