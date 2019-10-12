import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    //returns true if the isLoggedIn() methods returns true i.e if the user is logged in.
    //If the canActivate() method returns true the route which has this guard applied can be accessed by the user.
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if(this.authService.isLoggedIn()==false){
      //   this.router.navigateByUrl('/');
      // }
      return this.authService.isLoggedIn();
  }

}
