import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list.component';
import {ProductDetailGuard} from './product-detail.guard';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditGuard} from './product-edit.guard';
import {ProductEditComponent} from './product-edit.component';
import {RouterModule} from '@angular/router';

const ROUTES = [
  {path: 'products', component: ProductListComponent},
  {
    path: 'products/:id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailComponent
  },
  {
    path: 'products/:id/edit',
    canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  }
];

@NgModule({
  imports : [
    // Child Module Routing:
    RouterModule.forChild(ROUTES),
  ]
})
export class ProductRoutingModule {}
