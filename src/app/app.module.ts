// Imports needed for included components are defined here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

import { MessageModule } from './messages/message.module';
import {UserModule} from './user/user.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Model Decorator
@NgModule({
  // List of components
  declarations: [
    AppComponent,
    // Moved to Product Module:
    // ProductListComponent,
    // ConvertToSpacesPipe,
    // StarComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  // External Modules
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // FormsModule, // Moved to Product Module
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    // MOVED: Routing to route module
    // ProductModule, // Removed for Lazy loading
    UserModule,
    MessageModule,
    AppRoutingModule // This needs to be last so child routes looked at first
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
