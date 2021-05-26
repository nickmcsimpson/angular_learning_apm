import {Component, OnDestroy, OnInit} from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: Product[];
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = error
    );
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  onSelected(product: Product): void {
    // this.productService.currentProduct = product;
    this.productService.changeSelectedProduct(product);
  }

}
