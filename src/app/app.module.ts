import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from  '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationComponent } from './reservation/reservation.component';
import { MaterialModule } from './material.module';


//for login 

// used to create fake backend
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RoomManageComponent } from './room-manage/room-manage.component';



@NgModule({
  declarations: [
    AppComponent,    
    ReservationComponent,
    HomeComponent,
    LoginComponent,
    RoomManageComponent
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule   
  ],
  // providers: [AuthGuard, AuthService],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
