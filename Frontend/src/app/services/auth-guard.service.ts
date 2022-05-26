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
      if (route.routeConfig!.path=="" && this.loginService.getCurrentUserRole()!="USER"){
        this.router.navigateByUrl('/not-authorized')
        return false;
      }else if(route.routeConfig!.path!="" && this.loginService.getCurrentUserRole()!="ADMIN"){
        this.router.navigateByUrl('/not-authorized')
        return false;
      }   
      console.log(route); 
      return true;
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