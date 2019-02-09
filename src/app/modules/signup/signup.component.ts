import { Component, OnInit, ViewContainerRef, OnChanges } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { Country } from 'src/app/shared/models/country.model';
import { City } from 'src/app/shared/models/city.model';
import { Area } from 'src/app/shared/models/area.model';
import { NgForm } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData, ToastaEvent, ToastaEventType } from '../../../../projects/ngx-toasta/src/public_api';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import { Router } from '@angular/router';
import { PetserviceService } from 'src/app/services/petservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnChanges {
  isEditProfile: boolean = false;
  user: User = {
    UserName: '',
    Password: '',
    FirstName: '',
    AreaId: 0,
    Dob: '',
    UserId: 0,
    LastName: '',
    MobilePhone: '',
    EmailId: '',
    Gender: '',
    EmailNotification: true,
    SmsNotification: true,
    UserProfilePicture: '',
    DeviceType: '',
    UserType: '',
    CountryId: 0,
    CountryName: '',
    CityId: 0,
    CityName: '',
    AreaName: '',
    KCIRegistered: 1,
    KCIDetails: '',
    ReferralCode: 0,
    Latitude: "",
    Longitude: ""
  }
  UserTypeList: any = [];
  countryList: any = [];
  cityList: any = [];
  areaList: any = [];
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';
  ConfirmPassword: string;
  files: FileList;
  uploadedFile: File;
  imagePath: any = "#";
  vendorLogin: boolean = false;
  isNavigationEnabled: boolean = false;
  submitDisabled: boolean = false;
  buttonName: string = "Sign Up";
  constructor(
    private authService: AuthService,
    private searchService: MasterService,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig,
    private router: Router,
    private petService: PetserviceService,

  ) {
    this.toastaConfig.theme = 'material';
  }

  ngOnInit() {
    navigator.geolocation.watchPosition(() => {
      console.log("i'm tracking you!");
      this.isNavigationEnabled = true;
    },
      (error) => {
        if (error.code == error.PERMISSION_DENIED)
          console.log("you denied me :-(");
        this.isNavigationEnabled = false;
      });
    this.searchService.getUserTypeList()
      .subscribe((UserTypeList: any) => {
        this.UserTypeList = UserTypeList.Data;
      });
    this.searchService.getCountryList()
      .subscribe((countryList: any) => {
        this.countryList = countryList.Data;
      })
    if (localStorage.getItem('currentUser')) {
      this.isEditProfile = true;
      this.getMyProfile();
      this.buttonName = "Save";
    } else {
      this.isEditProfile = false;
    }
  }

  ngOnChanges() {
    debugger;
    if (this.countryList && this.user) {
      debugger;
    }
  }
  onCountryChange(selectedCountry: Country) {
    this.searchService.getCityList(selectedCountry.CountryId)
      .subscribe((cityList: any) => {
        this.cityList = cityList.Data;
      });

    this.selectedCountryName = selectedCountry.CountryName;
  }


  onCityChange(selectedCity: City) {
    this.searchService.getAreaList(selectedCity.CityId)
      .subscribe((areaList: any) => {
        this.areaList = areaList.Data;
      });

    this.selectedCityName = selectedCity.CityName;
  }

  onAreaChange(selectedArea: Area) {
    this.selectedAreaName = selectedArea.AreaName;
  }

  fileChangeEvent(fileInput: any) {
    this.files = fileInput.target.files;
    this.uploadedFile = this.files[0];
    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      //no problem for this error
      this.imagePath = (<FileReader>event.target).result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  }

  onSubmit(userForm: NgForm) {
    //save image
    let isValidForm = true;
    if (this.vendorLogin) {
      if (!userForm.value.UserType) {
        var toastOptions = this.searchService.setToastOptions('Errors', 'Please sleect you are an?', '')
        this.toastaService.error(toastOptions);
        isValidForm = false;

      }
    }
    if (!userForm.value.FirstName) {
      var toastOptions = this.searchService.setToastOptions('Errors', 'Please enter first name', '')
      this.toastaService.error(toastOptions);
      isValidForm = false;
    }

    if (userForm.controls.EmailId.status == "INVALID" || !userForm.value.EmailId) {
      var toastOptions = this.searchService.setToastOptions('Errors', 'Please enter valid email id', '')
      this.toastaService.error(toastOptions);
      isValidForm = false;
    }

    if (userForm.controls.MobilePhone.status == "INVALID" || !userForm.value.MobilePhone) {
      var toastOptions = this.searchService.setToastOptions('Errors', 'Please enter valid mobile number', '')
      this.toastaService.error(toastOptions);
      isValidForm = false;
    }

    if (!userForm.value.Password && !this.isEditProfile) {
      var toastOptions = this.searchService.setToastOptions('Errors', 'Please enter password', '')
      this.toastaService.error(toastOptions);
      isValidForm = false;
    }

    if (userForm.value.Password != userForm.value.ConfirmPassword && !this.isEditProfile) {
      var toastOptions = this.searchService.setToastOptions('Errors', 'Password and confirm password should be matched', '')
      this.toastaService.error(toastOptions);
      isValidForm = false;
    }

    if (!this.isNavigationEnabled) {
      if (!userForm.value.Country) {
        var toastOptions = this.searchService.setToastOptions('Errors', 'Please sleect country', '')
        this.toastaService.error(toastOptions);
        isValidForm = false;
      }
      if (!userForm.value.City) {
        var toastOptions = this.searchService.setToastOptions('Errors', 'Please sleect city', '')
        this.toastaService.error(toastOptions);
        isValidForm = false;
      }
      if (!userForm.value.Area) {
        var toastOptions = this.searchService.setToastOptions('Errors', 'Please sleect area', '')
        this.toastaService.error(toastOptions);
        isValidForm = false;
      }
    }

    if (!isValidForm) {
      return false;
    }
    this.submitDisabled = true;
    if (this.uploadedFile) {
      this.saveUserImage(userForm);
    }
    else {
      this.saveUserDetails(userForm);
    }
  }

  saveUserImage(userForm: NgForm) {
    this.searchService.saveImage(this.uploadedFile)
      .subscribe((result: any) => {
        this.user.UserProfilePicture = result.Data.ImgUrl;
        this.saveUserDetails(userForm);
      });
  }
  saveUserDetails(userForm: NgForm) {
    const UserName = userForm.value.FirstName + ' ' + userForm.value.LastName;
    this.user.UserName = UserName;
    this.user.Password = userForm.value.Password
    this.user.LastName = userForm.value.LastName;
    this.user.MobilePhone = userForm.value.MobilePhone;
    this.user.EmailId = userForm.value.EmailId;
    this.user.EmailNotification = true;
    this.user.SmsNotification = true;
    this.user.DeviceType = "Web";
    if (this.vendorLogin) {
      this.user.UserType = userForm.value.UserType;
    } else {
      this.user.UserType = "PetParent";
    }
    if (!this.isNavigationEnabled) {
      this.user.CountryId = userForm.value.Country.CountryId;
      this.user.CountryName = userForm.value.Country.CountryName;
      this.user.CityId = userForm.value.City.CityId;
      this.user.CityName = userForm.value.City.CityName;
      this.user.AreaId = userForm.value.Area.Areaid;
      this.user.AreaName = userForm.value.Area.AreaName;
    } else {
      this.user.Latitude = this.petService.getLatitude();
      this.user.Longitude = this.petService.getLongitude();
    }
    this.user.ReferralCode = 0;
    if (this.isEditProfile) {
      this.authService.updateProfile(this.user)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            var toastOptions = this.searchService.setToastOptions('Update Profile', 'Success', '')
            this.toastaService.success(toastOptions);
            this.submitDisabled = false;
            this.getMyProfile();
          }
          else {
            var toastOptions = this.searchService.setToastOptions('Update Profile', result.ErrorMessage, '')
            this.toastaService.error(toastOptions);
            this.submitDisabled = false;
          }
        });
    } else {
      this.user.FirstName = userForm.value.FirstName
      this.authService.signUp(this.user)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            var toastOptions = this.searchService.setToastOptions('Registration', 'Success', 'signin')
            this.toastaService.success(toastOptions);
          }
          else {
            var toastOptions = this.searchService.setToastOptions('Registration', result.ErrorMessage, '')
            this.toastaService.error(toastOptions);
            this.submitDisabled = false;
          }
        });
    }
  }
  getMyProfile() {
    this.authService.getMyProfile().subscribe((result: any) => {
      let userData = result.Data;
      this.user = userData;
      this.imagePath = this.user.UserProfilePicture;
      this.user.CountryId=userData.CountryId;
      localStorage.setItem('currentUser', JSON.stringify(userData));
    });
  }
}
