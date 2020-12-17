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
   <div><h2>{{pageTitle}}</h2>
      <pm-products></pm-products>
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
