import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Product, ProductResolved} from './product';
import { ProductService } from './product.service';

// Created automatically using Angular CLI:
  // ng g c products/product-detail --flat
    // angular generate component /location flat(not in sub folder)

@Component({
  // selector: 'pm-product-detail', // not required because we won't nest it
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              ) {
  }

  ngOnInit(): void {
    const resolvedData: ProductResolved = this.route.snapshot.data.resolvedData;
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
      // + is shortcut to cast it a numeric ID
    // const param = +this.route.snapshot.paramMap.get('id');
    // if (param) {
    //   const id = +param;
    //   this.pageTitle += `: ${id}`;
    //   this.getProduct(id);
    // }
  }

  // getProduct(id: number): void {
  //   this.productService.getProductById(id).subscribe({
  //     next: product =>  this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  // Routing with Code
  onBack(): void {
    this.router.navigate(['/products'], {
      queryParamsHandling: 'preserve'
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

}
