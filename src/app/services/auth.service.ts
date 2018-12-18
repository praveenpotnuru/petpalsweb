import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    //return tokenNotExpired(token);
    return !!token;
  }
  signIn(UserName: string, Password: string) {
    var body = {
      "UserName": UserName,
      "Password": Password
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.signin, body).pipe(map(data => {
      return data;
    }));
  }
}
