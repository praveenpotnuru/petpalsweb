import { Component, OnInit } from '@angular/core';
import { PetserviceService } from 'src/app/services/petservice.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private petService: PetserviceService, private _activatedRoute: ActivatedRoute) {
    this.searchType = this._activatedRoute.snapshot.params.type;
    this.searchService = this._activatedRoute.snapshot.params.service;
  }

  ngOnInit() {
    this.getServicesData();
  }

  getServicesData() {
    var body = {};
    if (!!this.searchType) {
      body = {
        "Latitude":  this.petService.getLatitude(),
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
}

