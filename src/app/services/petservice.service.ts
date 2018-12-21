import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetserviceService {

  
  private apiUrl = "http://app.petpals.love/staging/api";

  constructor(private http: HttpClient) { }


  searchPets(body){     
    return this.http.post(this.apiUrl+'/Utils/SearchPets' ,body);         
  }

  getPetDetails(petId){
    return this.http.get(this.apiUrl+'/Utils/GetPetDetails?petId='+petId);  
   
  }

}
