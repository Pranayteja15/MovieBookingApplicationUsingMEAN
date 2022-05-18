import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router, private auth:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if((localStorage.getItem('token') && this.auth.isAdmin())){
        return true;
    }else if(localStorage.getItem('token')){
     
      alert('You are not allowed')
     
      this.router.navigate(['/home'])
      return false;
    } else{
      localStorage.removeItem('token')
      localStorage.removeItem('id'),
      localStorage.removeItem('role')
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
