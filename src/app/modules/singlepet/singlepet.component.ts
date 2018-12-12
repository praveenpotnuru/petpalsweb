import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singlepet',
  templateUrl: './singlepet.component.html',
  styleUrls: ['./singlepet.component.less']
})
export class SinglepetComponent implements OnInit {

  public hideShowFilter:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showHideFilter():void{
    this.hideShowFilter = !this.hideShowFilter;  
  }
}
