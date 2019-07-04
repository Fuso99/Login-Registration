import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authS: AuthenticationService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    const url: string = state.url;
    // console.log(state.url);

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authS.isLoggedIn) { return true; }
    // Store the attempted URL for redirecting
    // this.authS.redirectUrl = url;

    // Navigate to the login page with extras
    this.authS.navigate(['/login']);
    return false;
  }
}
