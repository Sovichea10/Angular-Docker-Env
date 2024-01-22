import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as env } from '../../environments/environment';


@Injectable()
export class GuardService implements CanActivate {
  constructor( public router: Router, public jwtHelper: JwtHelperService) {}
  canActivate(): boolean {
     const token = localStorage.getItem(env.token);
     if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['auth/login']);
        return true;
      }
      return true;
  }

  logout(){
    localStorage.removeItem(env.token);
    localStorage.removeItem('avatar');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('permissions');
    localStorage.removeItem('location');
    this.router.navigate(['auth/login']);
}


}