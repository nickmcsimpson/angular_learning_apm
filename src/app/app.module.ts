import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Model Decorator
@NgModule({
  // List of components
  declarations: [
    AppComponent
  ],
  // External Modules
  imports: [
    BrowserModule
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
