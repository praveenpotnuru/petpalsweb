import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetserviceService {

  
  private apiUrl = "http://app.petpals.love/staging/api/Utils/SearchPets";

  constructor(private http: HttpClient) { }


  getHeaders(){
       let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer 6742142b-0623-4adc-8e41-0b290330db7f' });
    return headers;
  }
  searchPets(body){

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer 6742142b-0623-4adc-8e41-0b290330db7f'});

    let options = { headers: headers};

    return this.http.post(this.apiUrl, body).pipe(map(data => {
      return data;
    }));
  }


}
