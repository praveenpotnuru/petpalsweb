import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastOptions, ToastData } from 'projects/ngx-toasta/src/public_api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private baseUrl = environment.apiURL;
  constructor(private http: HttpClient,
    private router: Router) { }

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

  setToastOptions(title: string, msg: string, returnUrl: string) {

    var toastOptions: ToastOptions = {
      title: title,
      msg: msg,
      theme: "default",
      onRemove: () => {
        // console.log('Toast ' + toast.id + ' has been removed!');
        if (returnUrl)
          this.router.navigate([`/${returnUrl}`]);
      }
    };
    return toastOptions;
  }
}
