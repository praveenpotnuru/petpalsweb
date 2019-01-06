import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PetserviceService {
  private apiUrl = environment.apiURL;
  private latitude: string;
  private longitude: string;
  constructor(private http: HttpClient) {

  }
  searchPets(body) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.searchPets, body);
  }

  searchTextPets(params, body) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.searchPets + '?searchText=' + params, body);
  }
  getPetDetails(petId) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.petDetails + '?petId=' + petId);

  }
  getLatitude() {
    let latitude = localStorage.getItem('latitude');
    if (latitude == "null") {
      latitude = "";
    }
    return latitude ? latitude : "0";
  }

  getLongitude() {
    let longitude = localStorage.getItem('longitude');
    if (longitude == "null") {
      longitude = "";
    }
    return longitude ? longitude : "0";
  }
  getAllRequest() {
    return this.http.get(this.apiUrl + environment.apiEndPoints.myrequests);
  }
  WidrawRequest(requestId: number) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.withdrawrequests + requestId);
  }
}
