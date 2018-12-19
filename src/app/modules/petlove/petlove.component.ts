import { Component, OnInit } from '@angular/core';
import { PetserviceService } from 'src/app/services/petservice.service';
import { error } from 'util';

@Component({
  selector: 'app-petlove',
  templateUrl: './petlove.component.html',
  styleUrls: ['./petlove.component.less']
})
export class PetloveComponent implements OnInit {

  public hideShowFilter:boolean = false;
  constructor(private petService:PetserviceService) { }

  ngOnInit() {
    this.getServicesData();
  }

  getServicesData(){
    var body = {
      "Latitude": "1.1001",
      "Longitude": "1.44",
      "WillingToSell":0
    }
    this.petService.searchPets(body).subscribe((data)=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
  } 

  showHideFilter():void{
    this.hideShowFilter = !this.hideShowFilter;  
  }
  }

