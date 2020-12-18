import { Component } from "@angular/core";

// Decorator
@Component({
  // Metadata
  selector: 'pm-root',
    // View
      // Linked Template
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
    // Inline Template
  template: `
   <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav-link' [routerLink]="['/welcome']">Home</a></li>
      <li><a class='nav-link' [routerLink]="['/products']">Product List</a></li>
    </ul>
   </nav>
   <div class='container'>
    <router-outlet></router-outlet>
   </div>   
  `
  // Back ticks ES 2015 multi-line string
})
export class AppComponent {
  // title = 'Angular: Getting Started';
  // Property in TypeScript
  pageTitle: string = 'Acme Product Management'
}

//Index.html holds all the scripts for launching the angular app
  //often the only 'Web Page' of the application hence SPA
