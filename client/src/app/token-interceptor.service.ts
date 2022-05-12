import { AuthService } from 'src/app/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let auth = this.injector.get(AuthService)
    console.log("Intercepted");
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
  }
}
