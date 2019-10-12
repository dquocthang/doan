import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  currentUser: User;

    constructor(private authService : AuthService, private router: Router) {
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
