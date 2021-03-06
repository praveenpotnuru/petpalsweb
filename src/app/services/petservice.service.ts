import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MyPet } from '../shared/models/MyPet.model';

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

  mypetList() {
    var body = {};
    return this.http.post(this.apiUrl + environment.apiEndPoints.myPets, body)
  }

  deleteMypet(petId: number) {
    var body = { "PetId": petId }
    return this.http.post(this.apiUrl + environment.apiEndPoints.deletePet, body)
  }

  makePetFavourite(petId: number) {
    var body = { "PetId": petId }
    return this.http.post(this.apiUrl + environment.apiEndPoints.addToFavourites, body)
  }

  saveMypet(myPet: MyPet, petImage: string) {
    var body = {
      "PetName": myPet.PetName,
      "BreedName": myPet.BreedName,
      "Height": myPet.Height,
      "Wight": myPet.Wight,
      "Colors": myPet.Colors,
      "GroomingNeeds": myPet.GroomingNeeds,
      "ExerciseNeeds": myPet.ExerciseNeeds,
      "GoodWithDogs": myPet.GoodWithDogs,
      "WatchdogAbility": myPet.WatchdogAbility,
      "CountryName": myPet.CountryName,
      "CityName": myPet.CityName,
      "AreaName": myPet.AreaName,
      "HeatingCycleFrom": myPet.HeatingCycleFrom,
      "HeatingCycleTo": myPet.HeatingCycleTo,
      "PetGender": myPet.PetGender,
      "PictrueName": petImage,
      "PetDob": myPet.PetDob,
      "PetType": myPet.PetType,
      "KCIRegistered": myPet.KCIRegistered,
      "KCIDetails": myPet.KCIDetails,
      "AvilableForAdotpion": myPet.AvilableForAdotpion,
      "OfferPriceFrom": myPet.OfferPriceFrom,
      "OfferPriceTo": myPet.OfferPriceTo,
      "Parenting": myPet.Parenting,
      "Taken": myPet.Taken,
      "Latitude": myPet.Latitude,
      "Longitude": myPet.Longitude,
      "Description": myPet.Description,
      "WillingToSell": myPet.WillingToSell
    }

    return this.http.post(this.apiUrl + environment.apiEndPoints.savePet, body);

  }

  updateMypet(myPet: MyPet, petImage: string) {
    var body = {
      "PetId": myPet.PetId,
      "PetName": myPet.PetName,
      "BreedName": myPet.BreedName,
      "Height": myPet.Height,
      "Wight": myPet.Wight,
      "Colors": myPet.Colors,
      "GroomingNeeds": myPet.GroomingNeeds,
      "ExerciseNeeds": myPet.ExerciseNeeds,
      "GoodWithDogs": myPet.GoodWithDogs,
      "WatchdogAbility": myPet.WatchdogAbility,
      "CountryName": myPet.CountryName,
      "CityName": myPet.CityName,
      "AreaName": myPet.AreaName,
      "HeatingCycleFrom": myPet.HeatingCycleFrom,
      "HeatingCycleTo": myPet.HeatingCycleTo,
      "PetGender": myPet.PetGender,
      "PictrueName": petImage,
      "PetDob": myPet.PetDob,
      "PetType": myPet.PetType,
      "KCIRegistered": myPet.KCIRegistered,
      "KCIDetails": myPet.KCIDetails,
      "Description": myPet.Description,
      "AvilableForAdotpion": myPet.AvilableForAdotpion,
      "OfferPriceFrom": myPet.OfferPriceFrom,
      "OfferPriceTo": myPet.OfferPriceTo,
      "Parenting": myPet.Parenting,
      "Taken": myPet.Taken,
      "Latitude": myPet.Latitude,
      "Longitude": myPet.Longitude,
      "WillingToSell": myPet.WillingToSell

    }

    return this.http.post(this.apiUrl + environment.apiEndPoints.updatePet, body);

  }

  mypetByPetId(petId: number) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.myPetDetails + petId);
  }

  petLoveRequestsRequest(body: any, requestType: string) {
    return this.http.post(this.apiUrl + 'Utils/' + requestType, body);
  }

  petBoardingRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.boardingRequest, body);
  }

  petWalkerRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addWalkerRequest, body);
  }

  petTrainerRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addTrainingRequest, body);
  }

  petRescuerRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addRescuerRequest, body);
  }

  petAdoptionRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addAdoptionRequest, body);
  }

  petSpaRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addSpaRequest, body);
  }

  petCabRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addCabRequest, body);
  }

  petVolutneersRequest(body: any) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.addVolunteersRequest, body);
  }

  getExternalHtml(link) {
    return this.http.get(link);
  }

  contactUsLogin(subject: string, message: string) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.contactus + `?Subject=${subject}&Message=${message}`);
  }

  contactUs(name: string, mobile: string, email: string, message: string) {
    return this.http.get(this.apiUrl + environment.apiEndPoints.contactus +
      `?email=${email}&Message=${message}&name=${name}&mobileno=${mobile}`);
  }

  myBoardingDetails(requestId: number) {
    return this.http.post(this.apiUrl + environment.apiEndPoints.getBoardingRequestDetails + requestId, {});
  }
}
