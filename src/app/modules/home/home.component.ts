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

  onExternalLinkClick(redirectUri: string) {
    let currentUser: any = localStorage.getItem('currentUser');
    let emailId = localStorage.getItem('emailId');
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    let redirectParameters = "";
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      redirectParameters = `&Email = ${emailId}&UserName=&password=admin&FirstName=${currentUser.FirstName}&LastName=${currentUser.LastName}&PhoneNo=${currentUser.MobilePhone}&longitude=${longitude}&latitude=${latitude}`;
    }
    else if (latitude) {
      redirectParameters = `&longitude=${longitude}&latitude=${latitude}`;
    }
    switch (redirectUri) {
      case "snapdeal":
        redirectParameters = 'Redirect=snapdeal' + redirectParameters;
        break;
      case "food":
        redirectParameters = 'Redirect=litepurse' + redirectParameters;
        break;
      case "nutrition":
        redirectParameters = 'Redirect=nutrition' + redirectParameters;
        break;
      case "barbox":
        redirectParameters = 'Redirect=BarkBox' + redirectParameters;
        break;
      case "wagandtail":
        redirectParameters = 'Redirect=wagandtail' + redirectParameters;
        break;
    }
    window.open(`http://app.petpals.love/staging/buypetneeds.aspx?${redirectParameters}`, "_blank");
  }

  onGooglePlayClick() {
    window.open(`https://play.google.com/store/apps/details?id=com.encephalonit.petpals&hl=en`, "_blank");
  }
 
  
  onItunesClick() {
    window.open(`https://itunes.apple.com/us/app/petpals-pet-care-app/id1261370740?mt=8`, "_blank");
  }


}
