import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastOptions, ToastData } from 'projects/ngx-toasta/src/public_api';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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

  saveImage(file: File) {
    if (file != undefined) {
      let formData: FormData = new FormData();
      formData.append('Content-Disposition', file);
      formData.append('name', 'DemoFieldName');
      formData.append('filename', file.name);
      formData.append('Content-Type', file.type);

      return this.http.post(this.baseUrl + environment.apiEndPoints.uploadFile, formData)
        .pipe(map(response => {
          return response;
        }));

    }
    else {
      window.alert("Please add profile picture")
    }

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
