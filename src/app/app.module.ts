import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BrowserModule
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
