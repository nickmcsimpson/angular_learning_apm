import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { IProduct } from './product';
import { ProductService } from './product.service'

// Created automatically using Angular CLI:
  // ng g c products/product-detail --flat
    // angular generate component /location flat(not in sub folder)

@Component({
  // selector: 'pm-product-detail', // not required because we won't nest it
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    //
      // + is shortcut to cast it a numeric ID
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`
    this.productService.getProductById(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err,
    });
  }

  // Routing with Code
  onBack(): void {
    this.router.navigate(['/products'])
  }

}
