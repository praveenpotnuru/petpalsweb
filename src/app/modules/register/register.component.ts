import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';
import { MasterService } from 'src/app/services/master.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  emailId: string;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private authService: AuthService,
    private router: Router,
    private toastaService: ToastaService,
    private searchService: MasterService
  ) { }

  ngOnInit() {

  }
  onSignInClick() {
    if (this.userName && this.password) {
      this.authService.signIn(this.userName, this.password)
        .subscribe((result: any) => {
          if (result != null && result.Status == "Successfull" && result.Data != null) {
            localStorage.setItem('currentUser', JSON.stringify(result.Data));
            localStorage.setItem('token', result.Data.SecurityToken);
            localStorage.setItem('emailId', result.Data.EmailId);
            localStorage.setItem('RequesterOwnerId', result.Data.UserId);
            this.router.navigate(['/petlove']);
          }
          else {
            //alert("Invalid Credential");
            var toastOptions = this.searchService.setToastOptions('Sign In Errors', 'Invalid Credential', '')
            this.toastaService.error(toastOptions);
          }

        });
    }
    else {
      var toastOptions = this.searchService.setToastOptions('Sign In Errors', 'Please enter username and password', '')
      this.toastaService.error(toastOptions);
    }
  }

  onSendForgotPassword() {
    const email = this.emailId;

    if (email != null && email != '') {
      this.authService.forgotPassword(email)
        .subscribe((result: any) => {
          if (!!result.ErrorMessage) {
            alert("Please enter valid Email Id");
          }
          else {
            alert("Password sent to your email, please check");
            this.closeBtn.nativeElement.click();
          }
          console.log(result);
        });
    }
    else {
      alert("Please enter valid Email Id");
    }

  }

}
