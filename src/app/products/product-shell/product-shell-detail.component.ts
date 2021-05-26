import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import {Subscription} from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';

    // Subscribe to the observable instead
    // get product(): Product | null {
    //   return this.productService.currentProduct;
    // }
    product: Product | null;
    sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
      this.sub = this.productService.selectedProductChanges$.subscribe(
        selectedProduct => this.product = selectedProduct
      );
    }

    ngOnDestroy(): void{
      this.sub.unsubscribe();
    }

}
