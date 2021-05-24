import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './user/auth.guard';
import {SelectiveStrategy} from './selective-strategy.service';

// Order of routes matter:
// First match win
// More specific first
const ROUTES = [
  { path: 'welcome', component: WelcomeComponent},
  {
    path: 'products', // Conflicts with module path definition
    // canActivate: [AuthGuard], // canLoad vs canActivate
    data: {preload: false},
    loadChildren: () => // Lazy loaded Products:
      import('./products/product.module').then(m => m.ProductModule),
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: '**', redirectTo: 'welcome', pathMatch: 'full'}, //default behavior
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    // If you want to use hash style routing instead:
    // RouterModule.forRoot([], { useHash: true })
    // For routing event logs:
    // {enableTracing: true}
    RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy}), // vs PreloadAllModules with 'laodChildren' unless guarded
  ],
  exports: [RouterModule] // Necessary so child modules have access to this too
})
export class AppRoutingModule {}
