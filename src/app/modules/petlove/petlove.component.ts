import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-petlove',
  templateUrl: './petlove.component.html',
  styleUrls: ['./petlove.component.less']
})
export class PetloveComponent implements OnInit {

  public hideShowFilter:boolean = false;
  constructor() { }

  ngOnInit() {
  }


  showHideFilter():void{
    this.hideShowFilter = !this.hideShowFilter;  
}
  }

