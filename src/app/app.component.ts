import { Component } from "@angular/core";

import { AuthService } from './user/auth.service';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service';

// Decorator
@Component({
  // Metadata
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  // title = 'Angular: Getting Started';
  // Property in TypeScript
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }else if (routerEvent instanceof (NavigationEnd || NavigationCancel || NavigationError)) {
      this.loading = false;
    }
  }

  displayMessages(): void{
    this.router.navigate([{ outlets: { popup: ['messages']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void{
    this.router.navigate([{ outlets: { popup: null}}]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    /*
      Navigate by URL removes all path parameters and secondary routing information. Perfect for log out
     */
  }
}

/*
 Index.html holds all the scripts for launching the angular app
 often the only 'Web Page' of the application hence SPA
 */
