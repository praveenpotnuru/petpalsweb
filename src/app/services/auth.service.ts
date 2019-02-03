import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getCurrentUser(): string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


  public getRequesterOwnerId(): string {
    return localStorage.getItem('RequesterOwnerId');
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
  signOut() {
    return this.http.post(this.baseUrl + environment.apiEndPoints.signOut, {}).pipe(map(data => {
      return data;
    }));
  }

  signUp(user: User) {
    var body = {
      "FirstName": user.FirstName,
      "AreaId": user.AreaId,
      "Dob": user.Dob,
      "UserId": user.UserId,
      "LastName": user.LastName,
      "MobilePhone": user.MobilePhone,
      "EmailId": user.EmailId,
      "Gender": user.Gender,
      "Password": user.Password,
      "EmailNotification": user.EmailNotification,
      "SmsNotification": user.SmsNotification,
      "UserProfilePicture": user.UserProfilePicture,
      "UserType": user.UserType,
      "CountryName": user.CountryName,
      "CityName": user.CityName,
      "CityId": user.CityId,
      "CountryId": user.CountryId,
      "AreaName": user.AreaName,
      "KCIRegistered": user.KCIRegistered,
      "KCIDetails": user.KCIDetails,
      "DeviceType": user.DeviceType,
      "ReferralCode": user.ReferralCode,
      "Latitude": user.Latitude,
      "Longitude": user.Longitude,
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.register, body)
      .pipe(map(data => {
        return data;
      }));
  }

  updateProfile(user: User) {
    var body = {
      "FirstName": user.FirstName,
      "AreaId": user.AreaId,
      "Dob": user.Dob,
      "UserId": user.UserId,
      "LastName": user.LastName,
      "MobilePhone": user.MobilePhone,
      "EmailId": user.EmailId,
      "Gender": user.Gender,
      "Password": user.Password,
      "EmailNotification": user.EmailNotification,
      "SmsNotification": user.SmsNotification,
      "UserProfilePicture": user.UserProfilePicture,
      "UserType": user.UserType,
      "CountryName": user.CountryName,
      "CityName": user.CityName,
      "CityId": user.CityId,
      "CountryId": user.CountryId,
      "AreaName": user.AreaName,
      "KCIRegistered": user.KCIRegistered,
      "KCIDetails": user.KCIDetails,
      "DeviceType": user.DeviceType,
      "ReferralCode": user.ReferralCode,
      "Latitude": user.Latitude,
      "Longitude": user.Longitude,
    }
    return this.http.post(this.baseUrl + environment.apiEndPoints.updateprofile, body)
      .pipe(map(data => {
        return data;
      }));
  }

  forgotPassword(email: string) {

    var body = {
      "EmailId": email
    }
    return this.http.post(this.baseUrl + 'MobileAccount/ForgotPassword', body)
      .pipe(map(data => {
        return data;
      }));
  }
}
