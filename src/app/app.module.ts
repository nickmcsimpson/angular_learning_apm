// Imports needed for included components are defined here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductDetailGuard } from './products/product-detail.guard'

// Model Decorator
@NgModule({
  // List of components
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent, //Added automatically with Angular CLI creation
    WelcomeComponent,
  ],
  // External Modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Order of routes matter:
      // First match win
      // More specific first
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent},
      { path: 'products/:id', 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent},
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}, //default behavior
      // { path: '**', component: PageNotFoundComponent},
    ]),
    // If you want to use hash style routing instead:
    // RouterModule.forRoot([], { useHash: true })
  ],
  // Startup component (contains selector defined in index.html)
  bootstrap: [AppComponent]
})
export class AppModule { }
