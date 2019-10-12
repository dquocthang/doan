import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './anonymous.guard';
import { RoomManageComponent } from './room-manage/room-manage.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data:{
      title: 'ICT Reservation Homepage'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data:{
      title: 'Login'
    },
    canActivate: [AnonymousGuard]
  },
  {
    path: 'reservation',
    component: ReservationComponent,
    data:{
      title: 'Reservation'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: RoomManageComponent,
    data:{
      title: 'Room Management'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
