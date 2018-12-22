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
      this.loggedinUserName=`${currentUser.FirstName}, ${currentUser.LastName}`;
    }
  }
  logout(){
    localStorage.clear();
    this.authService.signOut();
    this.router.navigate(['/home']);
  }

}
