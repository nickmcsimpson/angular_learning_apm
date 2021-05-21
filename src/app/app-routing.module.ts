import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: '**', redirectTo: 'welcome', pathMatch: 'full'}, //default behavior
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    // If you want to use hash style routing instead:
    // RouterModule.forRoot([], { useHash: true })
    RouterModule.forRoot(ROUTES),
  ],
  exports: [RouterModule] // Necessary so child modules have access to this too
})
export class AppRoutingModule {}
