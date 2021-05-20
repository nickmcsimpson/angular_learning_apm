import { Component } from "@angular/core";

import { AuthService } from './user/auth.service';

// Decorator
@Component({
  // Metadata
  selector: 'pm-root',
    // View
      // Linked Template
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
    // Inline Template
  // template: `
  //  <nav class='navbar navbar-expand navbar-light bg-light'>
  //  </nav>
  //  <div class='container'>
  //   <router-outlet></router-outlet>
  //  </div>
  // `,
  // Back ticks ES 2015 multi-line string

  // [routerLink] uses routing from module config
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Angular: Getting Started';
  // Property in TypeScript
  pageTitle: string = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService) { }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }
}

//Index.html holds all the scripts for launching the angular app
  //often the only 'Web Page' of the application hence SPA
