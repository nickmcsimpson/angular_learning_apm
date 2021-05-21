import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list.component';
import {ProductDetailGuard} from './product-detail.guard';
import {ProductDetailComponent} from './product-detail.component';
import {ProductEditGuard} from './product-edit.guard';
import {ProductEditComponent} from './product-edit.component'; // NOTE: This is the original, for routing purposes, using the provided one
import {RouterModule} from '@angular/router';
import {ProductResolver} from './product-resolver.service';
import {ProductEditTagsComponent} from './product-edit/product-edit-tags.component';
import {ProductEditInfoComponent} from './product-edit/product-edit-info.component';
// import {ProductEditComponent} from './product-edit/product-edit.component';

const ROUTES = [
  {
    path: 'products',
    // component: ProductListComponent // Removing this makes it 'component-less'
    /*
      We use componentless routes to handle relative routing down to all of these options. This does not need a
      'router-outlet' in the child here. So they appear in the 'primary' outlet.

      The nested children can then all user relative paths.
     */
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        canActivate: [ProductDetailGuard], // Guard and Resolver does just about the same thing
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver },
      },
      {
        path: ':id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent,
        resolve: { resolvedData: ProductResolver },
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: ProductEditInfoComponent,
            pathMatch: 'full'
          },
          {
            path: 'tags',
            component: ProductEditTagsComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports : [
    // Child Module Routing:
    RouterModule.forChild(ROUTES),
  ]
})
export class ProductRoutingModule {}
