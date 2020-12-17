// Imports needed for included components are defined here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component'

// Model Decorator
@NgModule({
  // List of components
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  // External Modules
  imports: [
    BrowserModule,
    FormsModule
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
