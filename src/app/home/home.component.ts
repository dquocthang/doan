import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Room } from '../room';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms = [];

  constructor(private httpClient: HttpClient, private apiService: ApiService){}

  ngOnInit(){
    this.getRoom()
  }

  getRoom(){
    this.apiService.getRooms().subscribe(
      res => {
        console.log(res);
        this.rooms = res as Room[];
        // this.rooms.push(res);
        // console.log(this.rooms);
      }
    );
  }

}
