import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list.component';
import {ProductDetailGuard} from './product-detail.guard';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditGuard} from './product-edit.guard';
import {ProductEditComponent} from './product-edit.component';
import {RouterModule} from '@angular/router';
import {ProductResolver} from './product-resolver.service';

const ROUTES = [
  {path: 'products', component: ProductListComponent},
  {
    path: 'products/:id',
    canActivate: [ProductDetailGuard], // Guard and Resolver does just about the same thing
    component: ProductDetailComponent,
    resolve: { resolvedData: ProductResolver },
  },
  {
    path: 'products/:id/edit',
    canDeactivate: [ProductEditGuard],
    component: ProductEditComponent,
    resolve: { resolvedData: ProductResolver },
  }
];

@NgModule({
  imports : [
    // Child Module Routing:
    RouterModule.forChild(ROUTES),
  ]
})
export class ProductRoutingModule {}
