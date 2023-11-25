import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './page/clients/clients.component';
import { ParasolsComponent } from './page/parasols/parasols.component';
import { ReservationsComponent } from './page/reservations/reservations.component';
import { AuthComponent } from './page/auth/auth.component';
import { RegisterComponent } from './page/register/register.component';
import { authGuard } from './guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    canActivate: [authGuard],
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'parasols',
    component: ParasolsComponent
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
