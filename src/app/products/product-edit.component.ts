import {Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {Product, ProductResolved} from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild(NgForm, { static: false }) productForm: NgForm;

  pageTitle = 'Product Edit';
  errorMessage: string;
  // productForm: FormGroup;

  // product: Product;
  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  // For tracking state and using in Guard:
  private currentProduct: Product;
  private originalProduct: Product;

  get product(): Product {
    return this.currentProduct;
  }

  set product(value: Product) {
    this.currentProduct = value;
    // Clone the object to retain copy:
    this.originalProduct = {...value};
  }


  // private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  // get tags(): FormArray {
  //   return this.productForm.get('tags') as FormArray;
  // }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    // Using Product resolver instead of service
    //
    /*
      Using static snapshot breaks when trying to go from edit -> add. The '0' breaks the logic, so we must observe and
      react
     */
    this.route.data.subscribe(data => {
      const resolvedData: ProductResolved = data.resolvedData;
      this.errorMessage = resolvedData.error;
      this.displayProduct(resolvedData.product);
    });
  }

  // ngAfterViewInit(): void {
  //   // Watch for the blur event from any input element on the form.
  //   // This is required because the valueChanges does not provide notification on blur
  //   const controlBlurs: Observable<any>[] = this.formInputElements
  //     .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  //
  //   // Merge the blur event observable with the valueChanges observable
  //   // so we only need to subscribe once.
  //   merge(this.productForm.valueChanges, ...controlBlurs).pipe(
  //     debounceTime(800)
  //   ).subscribe(value => {
  //     this.displayMessage = this.genericValidator.processMessages(this.productForm);
  //   });
  // }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    //  'info' tab:
    this.dataIsValid.info = !!(this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode);
    // 'tags' tab
    this.dataIsValid.tags = !!(this.product.category &&
      this.product.category.length >= 3);
  }

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      // this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }
}
