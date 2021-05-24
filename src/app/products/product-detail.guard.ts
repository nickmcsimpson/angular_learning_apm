import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Generated with the CLI
  // ng g g product/product-detail
    // hit space to select options

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Borked by grouped paths
    // const id = +next.url[1].path;
    // if(isNaN(id) || id < 1) {
    //   alert('Invalid product Id');
    //   this.router.navigate(['/products']);
    //   return false;
    // }
    return true;
  }

}
