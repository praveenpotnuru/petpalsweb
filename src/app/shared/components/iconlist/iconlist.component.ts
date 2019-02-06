import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.less']
})
export class IconlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onExternalLinkClick(redirectUri: string) {
    let currentUser: any = localStorage.getItem('currentUser');
    let emailId = localStorage.getItem('emailId');
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    let redirectParameters = "";
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      redirectParameters = `&Email=${emailId}&UserName=&password=admin&FirstName=${currentUser.FirstName}&LastName=${currentUser.LastName}&PhoneNo=${currentUser.MobilePhone}&longitude=${longitude}&latitude=${latitude}`;
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
  onStoresClick() {
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    window.open(`http://app.petpals.love/PetPalsIndiaLive/nearby.html?lat=${latitude}&lng=${longitude}&searchtype=stores`, "_blank");
  }
  onClinicClick() {
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    window.open(`http://app.petpals.love/PetPalsIndiaLive/nearby.html?lat=${latitude}&lng=${longitude}&searchtype=vetdoctor`, "_blank");
  }
  onNewsClick() {
    window.open(` http://app.petpals.love/staging/news.aspx`, "_blank");
  }
}
