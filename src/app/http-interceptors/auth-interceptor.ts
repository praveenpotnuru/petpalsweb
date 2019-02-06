import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/auth.service';


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
    if (req.url.indexOf(environment.apiEndPoints.signin) > 0 ||
      req.url.indexOf(environment.apiEndPoints.searchPets) > 0 ||
      req.url.indexOf(environment.apiEndPoints.register) > 0 ||
      req.url.indexOf(environment.apiEndPoints.forgotPassword) > 0 ||
      req.url.indexOf(environment.apiEndPoints.petDetails) > 0 ||
      req.url.indexOf(environment.apiEndPoints.countryList) > 0 ||
      req.url.indexOf(environment.apiEndPoints.getCities) > 0 ||
      req.url.indexOf(environment.apiEndPoints.getAreaList) > 0 ||
      req.url.indexOf(environment.apiEndPoints.getBreeds) > 0 ||
      req.url.indexOf(environment.apiEndPoints.getPetTypes) > 0 ||
      (req.url.indexOf(environment.apiEndPoints.contactus) > 0 && !this.auth.getToken()) ||
      req.url.indexOf(environment.apiEndPoints.getPetNews) > 0

    ) {
      const authReq = req.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      });
      return next.handle(authReq); // do nothing
    }
    else if (req.url.indexOf(environment.apiEndPoints.uploadFile) > 0) {
      return next.handle(req);
    }
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
        SecurityToken: this.auth.getToken(),
        "Content-Type": "application/json"
      }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

