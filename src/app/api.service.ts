import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from  './room'; //
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  header : any;  

  PHP_API_SERVER = "http://localhost:8080/apiProject/";
  constructor(private httpClient: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  

   }

//For insert reservation into table
  onInsert(req:any){
    return this.httpClient.post(this.PHP_API_SERVER+'reservation/onInsert',req,{headers:this.header,responseType:'text'});
  }

//for updating rooms to database
  roomUpload(req:any){
    return  this.httpClient.post(this.PHP_API_SERVER+'room',req,{headers:this.header});
  }

  getRooms():Observable<Room[]>{ 
    return this.httpClient.get<Room[]>(this.PHP_API_SERVER+'room/getAllRooms');
  }


}
