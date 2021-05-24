import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import {ActivatedRoute} from '@angular/router';
import {CriteriaComponent} from '../shared/criteria/criteria.component';

@Component({
    // selector: 'pm-products', // Not needed because we will use routing now
    templateUrl: './product-list.component.html', // relative path
    // styles: ['thead {color: #337AB7;}']//Inline Styles
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    // Get elements from the Template:
    // @ViewChildren('filteredElement, nameElement')
    // @ViewChildren(NgModel)
    // inputElementRefs: QueryList<NgModel>;
    /*
      Using *ngIf with NgModels could overcomplicate the logic of subscribing and make it necessary to have
      a subscription variable to check and set.
     */

    // TypeScript can infer type from these pre-defined variables
    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    includeDetail = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentListFilter: string;

    filteredProducts: Product[];
    products: Product[];

    // Dependency Injection: Product service (verbose)
    // private _productService
    // constructor(productService: ProductService) {
    //     this._productService = productService;

        // Sugar:
    constructor(private productService: ProductService,
                private route: ActivatedRoute) {
        // Don't call service here, keep constructor light
            // Instead use the onInit lifecycle method
        // this.filteredProducts = this.products;
        // this.listFilter = 'cart';
    }

    // Event Handling
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    // No return type or keywords for function
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    // Change detection will automatically reevaluate the bound displays

    // Interface method
    ngOnInit(): void {
        this.parentListFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

        // Call service to get products list
        this.productService.getProducts().subscribe({
            // Stream steps old syntax:
            next: products => {
                this.products = products;
                this.performFilter(this.parentListFilter);
            },
            error: err => this.errorMessage = err
                // Sugar only used if not needing to use the variable
            // next(products) {console.log(products)},
            // WARN: This does not do what the arrow function above does,
                // 'this' will be function scoped and not to our class vars
            // error(err) {this.errorMessage = err}
            // End function optional
        });

    }

    ngAfterViewInit(): void {
      this.parentListFilter = this.filterComponent.listFilter;
    }

  performFilter(filterBy?: string): Product[] {
      console.log('filtering', filterBy);
      if (filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        if (this.products) {
          return this.products.filter((product: Product) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }
      } else {
        this.filteredProducts = this.products;
      }

    }

    // Checks both the product name and tags
    performFilter2(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
            (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
    }
}
