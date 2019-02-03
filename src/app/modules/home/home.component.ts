import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
  }

  onGooglePlayClick() {
    window.open(`https://play.google.com/store/apps/details?id=com.encephalonit.petpals&hl=en`, "_blank");
  }


  onItunesClick() {
    window.open(`https://itunes.apple.com/us/app/petpals-pet-care-app/id1261370740?mt=8`, "_blank");
  }


}
