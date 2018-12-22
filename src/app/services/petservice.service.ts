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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.latitude = position.coords.latitude.toString();
        this.longitude = position.coords.longitude.toString();

      });
    }
  }
  searchPets(body) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.searchPets, body);
  }

  getPetDetails(petId) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.petDetails + '?petId=' + petId);

  }
  getLatitude() {
    return this.latitude ? this.latitude : "0";
  }

  getLongitude() {
    return this.longitude ? this.longitude : "0";
  }


}
