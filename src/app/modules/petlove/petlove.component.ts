import { Component, OnInit } from '@angular/core';
import { PetserviceService } from 'src/app/services/petservice.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-petlove',
  templateUrl: './petlove.component.html',
  styleUrls: ['./petlove.component.less']
})
export class PetloveComponent implements OnInit {

  public hideShowFilter: boolean = false;
  public petData: any;
  public searchType: string;
  public searchService: string;
  public petTypes: any;
  public selectedPetTypes: any = [];
  public selectedGender: any = [];
  public cityList: any = [];
  public areaList: any = [];
  public breeds: any;
  public selectedCity: any;
  public selectedArea: any;
  public enteredAge: any;

  constructor(private petService: PetserviceService,
    private _activatedRoute: ActivatedRoute,
    private masterService: MasterService
  ) {
    this.searchType = this._activatedRoute.snapshot.params.type;
    this.searchService = this._activatedRoute.snapshot.params.service;
  }

  ngOnInit() {
    this.getServicesData();
    this.getPetTypes();
    this.getBreeds();
    this.getCityList();
  }

  getServicesData() {
    var body = {};
    if (!!this.searchType) {
      body = {
        "Latitude": this.petService.getLatitude(),
        "Longitude": this.petService.getLongitude(),
        "UserType": this.searchType + "," + this.searchService
      }
    }
    else {
      body = {
        "Latitude": this.petService.getLatitude(),
        "Longitude": this.petService.getLongitude(),
        "WillingToSell": 0
      }
    }
    this.petService.searchPets(body).subscribe((data: any) => {
      this.petData = data.Data;
    }, error => {
      console.log(error);
    })
  }

  showHideFilter(): void {
    this.hideShowFilter = !this.hideShowFilter;
  }

  getPetTypes() {
    this.masterService.getPetTypeList().subscribe((data: any) => {
      this.petTypes = data.Data;
      console.log(this.petTypes);
    }, error => {
      console.log(error);
    })
  }
  getBreeds() {
    this.masterService.getBreedList().subscribe((data: any) => {
      this.breeds = data.Data;
      console.log(this.breeds);
    }, error => {
      console.log(error);
    })
  }
  applyFilter() {
    let filterdBreeds = this.breeds.filter(opt => opt.checked)
      .map(opt => opt.BreedId);

    this.hideShowFilter = !this.hideShowFilter;
    var body: any = {
    }
    if (filterdBreeds.length)
      body['BreedId'] = filterdBreeds.toString();
    if (this.selectedPetTypes.length)
      body['PetType'] = this.selectedPetTypes.toString();
    if (this.selectedGender.length)
      body['PetGende'] = this.selectedGender.toString();
    if (this.selectedCity)
      body['CityId'] = this.selectedCity.CityId;
    if (this.selectedArea)
      body['AreaId'] = this.selectedArea.Areaid;
    if (this.enteredAge)
      body['Age'] = this.enteredAge;
    this.petService.searchPets(body).subscribe((data: any) => {
      this.petData = data.Data;
    }, error => {
      console.log(error);
    })
  }
  petTypeChecked(event) {
    if (event.target.checked) {
      this.selectedPetTypes.push(event.target.value);
    } else {
      this.selectedPetTypes = this.selectedPetTypes.filter(item => item !== event.target.value);
    }
  }
  clickGender(event) {
    if (event.target.checked) {
      this.selectedGender.push(event.target.value);
    } else {
      this.selectedGender = this.selectedGender.filter(item => item !== event.target.value);
    }
  }
  getCityList() {
    this.masterService.getCityList(environment.defaultCountryId)
      .subscribe((cityList: any) => {
        this.cityList = cityList.Data;
      });
  }
  onCityChange() {
    this.masterService.getAreaList(this.selectedCity.CityId)
      .subscribe((areaList: any) => {
        this.areaList = areaList.Data;
      });

  }
}

