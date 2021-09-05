import { Guid } from 'guid-typescript';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { delayRetryPipe } from './extensions';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor
{
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const TraceId = Guid.create().toString();
    req = req.clone({ setHeaders: { TraceId } })

    // jwt токен авторизации
    const token = this.auth.accessToken;
    if (!!token)
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })

    return next.handle(req).pipe(delayRetryPipe());
  }
}
