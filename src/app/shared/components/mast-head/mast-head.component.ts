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

    localStorage.clear();
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);

    this.router.navigate(['/home']);
    // this.authService.signOut()
    //   .subscribe((result: any) => {
    //     localStorage.clear();
    //     this.router.navigate(['/home']);
    //   });
  }

}
