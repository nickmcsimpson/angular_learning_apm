import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProduct } from "./product";
import { Observable, of, throwError } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'//New in version 6, used to be in module
    // Alternatively add the service in a component 'providers' array
})
export class ProductService {
    // Add HTTP 
    // private productUrl = 'api/products/products.json';
    private productsUrl = 'api/products';
        // angular.json specifies /api folder as an 'asset'

    constructor(private http: HttpClient) {}
    
    // getProducts(): IProduct[] {
    //     // return [];
    // }

    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl).pipe(
    //         tap(data => console.log('All: ' + JSON.stringify(data))),
    //         catchError(this.handlError)
    //     );// Async
    // }
    // Not going to work without a subscription by an Observer

    // getProductById(id: number): Observable<IProduct | undefined> {
    //     return this.getProducts()
    //       .pipe(
    //         map((products: IProduct[]) => products.find(p => p.productId === id))
    //       );
    //   }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
            );
    }

    getProductById(id: number): Observable<IProduct> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<IProduct>(url)
            .pipe(
            tap(data => console.log('getProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
            );
    }

    createProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;
        return this.http.post<IProduct>(this.productsUrl, product, { headers })
            .pipe(
            tap(data => console.log('createProduct: ' + JSON.stringify(data))),
            catchError(this.handleError)
            );
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers })
            .pipe(
            tap(data => console.log('deleteProduct: ' + id)),
            catchError(this.handleError)
            );
    }

    updateProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers })
            .pipe(
            tap(() => console.log('updateProduct: ' + product.id)),
            // Return the product on an update
            map(() => product),
            catchError(this.handleError)
            );
    }

    // Exception Handling:
        // tap let's us look at the emitted values of stream as they come in
        // catchError
    // private handlError(err: HttpErrorResponse) {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just loggin it to the console
    //     let errorMessage = '';
    //     if(err.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred. Handle it
    //         errorMessage = `An error occurred: ${err.error.message}`;
    //     } else {
    //         // The backend returned an unsuccessful response code
    //         // The response body may contain clues as to what went wrong
    //         errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
    //     }
    //     console.error(errorMessage);
    //     return throwError(errorMessage);
    // }

    private handleError(err): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
          id: 0,
          productName: null,
          productCode: null,
          tags: [''],
          releaseDate: null,
          price: null,
          description: null,
          starRating: null,
          imageUrl: null
        };
      }
}

// Dependency Injection: Coding pattern in which a class receives the instances of objects it
    // needs (dependency) from an external source rather than creating them itself

// Must register with the angular injector to be used as a Singleton
    // There are injectors for each component
    // Service is available to all child components