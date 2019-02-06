import { Component, OnInit } from '@angular/core';
import { PetserviceService } from 'src/app/services/petservice.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.less']
})
export class ContactusComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  name: string = "";
  mobile: string = "";
  email: string = "";
  message: string = "";
  subject: string = "";

  constructor(private petService: PetserviceService,
    private masterService: MasterService,
    private toastaService: ToastaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }

  onContactClick() {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (this.isUserLoggedIn) {
      this.petService.contactUsLogin(this.subject, this.message)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            var toastOptions = this.masterService.setToastOptions('', 'Thanks for contacting us', '')
            this.toastaService.success(toastOptions);
            this.clearFields();
          }
          else {
            var toastOptions = this.masterService.setToastOptions('', result.ErrorMessage, '')
            this.toastaService.error(toastOptions);
          }
        })
    } else {
      if (!regexp.test(this.email)) {
        var toastOptions = this.masterService.setToastOptions('', 'Please enter valid email address', '')
        this.toastaService.error(toastOptions);
        return false;
      }
      if (this.mobile.length != 0 && this.mobile.length != 10) {
        var toastOptions = this.masterService.setToastOptions('', 'Please enter valid mobile number', '')
        this.toastaService.error(toastOptions);
        return false;
      }
      this.petService.contactUs(this.name, this.mobile, this.email, this.message)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            var toastOptions = this.masterService.setToastOptions('', 'Thanks for contacting us', '')
            this.toastaService.success(toastOptions);
            this.clearFields();
          }
          else {
            var toastOptions = this.masterService.setToastOptions('', result.ErrorMessage, '')
            this.toastaService.error(toastOptions);
          }
        })
    }
  }
  clearFields() {
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.message = "";
    this.subject = "";
  }
}
