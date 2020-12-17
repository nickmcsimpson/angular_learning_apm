import { Component } from '@angular/core';

// Decorator
@Component({
  // Metadata
  selector: 'pm-root',
  // View layout with file:
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // View Layout here
  /*template `
  * <div>HTML</div>
  */
})
export class AppComponent {
  title = 'Angular: Getting Started';
  // Property in TypeScript
  pageTitle: string = 'Acme Product Management'
}
