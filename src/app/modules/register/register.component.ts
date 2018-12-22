import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  onSignInClick() {
    this.authService.signIn(this.userName, this.password)
      .subscribe((result: any) => {
        if (result != null && result.Status == "Successfull" && result.Data != null) {
          localStorage.setItem('currentUser', JSON.stringify(result.Data) );
          localStorage.setItem('token', result.Data.SecurityToken);
          localStorage.setItem('emailId', result.Data.EmailId);
          localStorage.setItem('RequesterOwnerId', result.Data.UserId);
          this.router.navigate(['/petlove']);
        }
        else {
          alert("Invalid Credential");
        }

      });

  }

  onSendForgotPassword() {
    // const email = this.emailId.nativeElement.value;

    // if (email != null && email != '') {
    //   this.authService.forgotPassword(email)
    //     .subscribe((result) => {
    //       console.log(result);
    //     });
    // }
    // else {
    //   this.toastr.error('Please enter eamilId', '');
    // }

  }

}
