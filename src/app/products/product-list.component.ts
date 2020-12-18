import { Component, OnInit } from '@angular/core'
import { IProduct } from './product'
import { ProductService } from './product.service'

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',//relative path
    // styles: ['thead {color: #337AB7;}']//Inline Styles
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    // TypeScript can infer type from these pre-defined variables
    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    // listFilter: string = 'cart';

    // Use Getter and Setter instead
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    
    filteredProducts: IProduct[];
    products: IProduct[];

    // Dependency Injection: Product service (verbose)
    // private _productService
    // constructor(productService: ProductService) {
    //     this._productService = productService;

        // Sugar:
    constructor(private productService: ProductService) {
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
        // Call service to get products list
        this.productService.getProducts().subscribe({
            // Stream steps old syntax:
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
                // Sugar only used if not needing to use the variable
            // next(products) {console.log(products)},
            // WARN: This does not do what the arrow function above does,
                // 'this' will be function scoped and not to our class vars
            // error(err) {this.errorMessage = err}
            // End function optional
        });
        
        console.log('In OnInit');
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}