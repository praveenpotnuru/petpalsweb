import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private baseUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  getPetTypeList() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getPetTypes);
  }

  getBreedList() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getBreeds);
  }

  getCityList(countryId: number) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getCities + '?countryid=' + countryId);
  }

  getAreaList(cityId: number) {
    return this.http.get(this.baseUrl + environment.apiEndPoints.getAreaList + '?cityid=' + cityId);
  }

  getUserTypeList() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.userTypes);
  }

  getCountryList() {
    return this.http.get(this.baseUrl + environment.apiEndPoints.countryList);
  }




}
