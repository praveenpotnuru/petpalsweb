import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  deferLoad = false;
  constructor() {
    this.deferLoad = true;
   }

  ngOnInit() {
  
  }
  ngAfterViewInit() {
  
  }
}
