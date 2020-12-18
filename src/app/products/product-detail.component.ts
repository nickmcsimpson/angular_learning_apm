import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

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

  constructor() { }

  ngOnInit(): void {
  }

}
