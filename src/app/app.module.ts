// Imports needed for included components are defined here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
// import { ProductListComponent } from './products/product-list.component';
// import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
// import { StarComponent } from './shared/star.component';
// import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-detail.guard';
import { PageNotFoundComponent } from './page-not-found.component';

import { ProductModule } from './products/product.module';
import { MessageModule } from './messages/message.module';
import {UserModule} from './user/user.module';
import {AppRoutingModule} from './app-routing.module';

// Model Decorator
@NgModule({
  // List of components
  declarations: [
    AppComponent,
    // Moved to Product Module:
    // ProductListComponent,
    // ConvertToSpacesPipe,
    // StarComponent,
    // ProductDetailComponent, //Added automatically with Angular CLI creation
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  // External Modules
  imports: [
    BrowserModule,
    // FormsModule, // Moved to Product Module
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    // Order of routes matter:
      // First match win
      // More specific first
    // MOVED: Routing to route module
    ProductModule, // AUTO import with CLI
    UserModule,
    MessageModule,
    AppRoutingModule // This needs to be last so child routes looked at first
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
