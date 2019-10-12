import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  header: any;
  PHP_API_SERVER = "http://localhost:8080/apiProject/";

  constructor(private httpClient: HttpClient, private router: Router) {
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  public login(userInfo: any): Observable<any> {
    return this.httpClient.post<any>(this.PHP_API_SERVER + 'login', userInfo, { headers: this.header })
    .pipe(map(user=>{
      if(user && user.token){
        localStorage.setItem('currentUser',JSON.stringify(user.username));
        this.currentUserSubject.next(user.username);
      }
      return user;
    }))
  }

  public isLoggedIn() {
    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);    
  }
}
