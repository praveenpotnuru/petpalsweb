import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mast-head',
  templateUrl: './mast-head.component.html',
  styleUrls: ['./mast-head.component.less']
})
export class MastHeadComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  loggedinUserName: string = "";
  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    if (!!this.authService.getToken()) {
      this.isUserLoggedIn = true;
      const currentUser: any = this.authService.getCurrentUser();
      this.loggedinUserName = `${currentUser.FirstName}, ${currentUser.LastName}`;
    }
  }
  logout() {
    var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
    //this.router.navigate(['/']);
    this.authService.signOut()
      .subscribe((result: any) => {
        localStorage.clear();
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        this.router.navigate(['/']);
      });
  }

  onFBClick() {
    window.open(`https://www.facebook.com/petpals.love/`, "_blank");
  }
  onInstaGramClick() {
    window.open(`https://www.instagram.com/petpalslove/`, "_blank");
  }
  onYoutubeClick() {
    window.open(`https://www.youtube.com/channel/UCJuHynWZfsNvI-AmK2M-Knw`, "_blank");
  }
  onGooglePlayClick() {
    window.open(`https://play.google.com/store/apps/details?id=com.encephalonit.petpals&hl=en`, "_blank");
  }
  onItunesClick() {
    window.open(`https://itunes.apple.com/us/app/petpals-pet-care-app/id1261370740?mt=8`, "_blank");
  }
  onPinterestClick() {
    window.open(` https://in.pinterest.com/petpalslove`, "_blank");
  }
}
