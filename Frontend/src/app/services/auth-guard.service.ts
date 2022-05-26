import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
  })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return true if you want to navigate, otherwise return false
    
    if (this.loginService.isUserLoggedIn()) {  
      if(route.children[0].data.role[0]===this.loginService.getCurrentUserRole()){
        return true;
      }else
      {
        this.router.navigateByUrl('/not-authorized')
        return false;
      } 
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

@Injectable({
    providedIn: 'root' // ADDED providedIn root here.
  })
export class UnAuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return true if you want to navigate, otherwise return false
    if (!this.loginService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}