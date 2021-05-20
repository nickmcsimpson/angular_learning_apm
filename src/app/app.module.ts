// Imports needed for included components are defined here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
    // Order of routes matter:
      // First match win
      // More specific first
    RouterModule.forRoot([
      // { path: 'products', component: ProductListComponent},
      // { path: 'products/:id',
      //   canActivate: [ProductDetailGuard],
      //   component: ProductDetailComponent},
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}, //default behavior
      // { path: '**', component: PageNotFoundComponent},
    ]),
    ProductModule, // AUTO import with CLI
    // If you want to use hash style routing instead:
    // RouterModule.forRoot([], { useHash: true })
    UserModule,
    MessageModule
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
