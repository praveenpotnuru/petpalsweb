import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = 'Bearer ' + this.auth.getToken();

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    if (req.url.indexOf(environment.apiEndPoints.signin) > 0 || req.url.indexOf(environment.apiEndPoints.searchPets) > 0) {
      const authReq = req.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      });
      return next.handle(authReq); // do nothing
    }
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
        "Content-Type": "application/json"
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

