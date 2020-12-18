import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from "./product";
import { Observable, throwError } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'//New in version 6, used to be in module
    // Alternatively add the service in a component 'providers' array
})
export class ProductService {
    // Add HTTP 
    private productUrl = 'api/products/products.json';
        // angular.json specifies /api folder as an 'asset'

    constructor(private http: HttpClient) {}
    
    // getProducts(): IProduct[] {
    //     // return [];
    // }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handlError)
        );// Async
    }
    // Not going to work without a subscription by an Observer

    getProductById(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }

    // Exception Handling:
        // tap let's us look at the emitted values of stream as they come in
        // catchError
    private handlError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just loggin it to the console
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code
            // The response body may contain clues as to what went wrong
            errorMessage = `Server returned code ${err.status}, error message is ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

// Dependency Injection: Coding pattern in which a class receives the instances of objects it
    // needs (dependency) from an external source rather than creating them itself

// Must register with the angular injector to be used as a Singleton
    // There are injectors for each component
    // Service is available to all child components