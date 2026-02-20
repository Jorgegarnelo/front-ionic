import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const userId = localStorage.getItem('userId') || '';
    const userRole = localStorage.getItem('role') || '';

    const authReq = request.clone({
      setHeaders: {
        'x-user-id': userId,
        'x-user-role': userRole
      }
    });

    return next.handle(authReq);
  }
}
