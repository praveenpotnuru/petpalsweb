import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { Country } from 'src/app/shared/models/country.model';
import { City } from 'src/app/shared/models/city.model';
import { Area } from 'src/app/shared/models/area.model';
import { NgForm } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData, ToastaEvent, ToastaEventType } from '../../../../projects/ngx-toasta/src/public_api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

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
    ReferralCode: 0
  }



  UserTypeList: any = [];
  countryList: any = [];
  cityList: any = [];
  areaList: any = [];
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';

  files: FileList;
  uploadedFile: File;
  imagePath: any = "#";



  constructor(
    private authService: AuthService,
    private searchService: MasterService,
    private toastaService: ToastaService, private toastaConfig: ToastaConfig
  ) {
    this.toastaConfig.theme = 'material';
  }

  ngOnInit() {
    var toastOptions: ToastOptions = {
      title: "Toast It!",
      msg: "Mmmm, tasties...",
      // showClose: true,
      // //timeout: 5000,
      theme: "default",
      // onAdd: (toast: ToastData) => {
      //   console.log('Toast ' + toast.id + ' has been added!');
      // }

    };
    // Add see all possible types in one shot
    this.toastaService.default(toastOptions)
    this.toastaService.success(toastOptions);
    this.toastaService.wait(toastOptions);
    this.toastaService.error(toastOptions);
    this.toastaService.warning(toastOptions);

    this.searchService.getUserTypeList()
      .subscribe((UserTypeList: any) => {
        this.UserTypeList = UserTypeList.Data;
      });


    this.searchService.getCountryList()
      .subscribe((countryList: any) => {
        this.countryList = countryList.Data;
      })

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
    this.authService.saveImage(this.uploadedFile)
      .subscribe((result: any) => {
        console.log(result.ImgUrl)
        this.user.UserProfilePicture = result.ImgUrl;
      });


    if (userForm.value.FirstName != "" && userForm.value.LastName != "" && userForm.value.Password &&
      userForm.value.Dob != "" && userForm.value.MobilePhone != "" && userForm.value.EmailId != "" &&
      userForm.value.Gender != "" && userForm.value.UserType != "" && userForm.value.Country.CountryName != undefined
      && userForm.value.City.CityName != undefined && userForm.value.Area.AreaName != undefined
      && userForm.value.KCIDetails != "") {
      ///set form value to user model
      const UserName = userForm.value.FirstName + ' ' + userForm.value.LastName;
      this.user.UserName = UserName;
      this.user.Password = userForm.value.Password
      this.user.FirstName = userForm.value.FirstName
      this.user.AreaId = userForm.value.Area.Areaid;
      this.user.Dob = userForm.value.Dob;
      this.user.UserId = 6;
      this.user.LastName = userForm.value.LastName;
      this.user.MobilePhone = userForm.value.MobilePhone;
      this.user.EmailId = userForm.value.EmailId;
      this.user.Gender = userForm.value.Gender;
      this.user.EmailNotification = true;
      this.user.SmsNotification = true;
      this.user.DeviceType = "Web";
      this.user.UserType = userForm.value.UserType;
      this.user.CountryId = userForm.value.Country.CountryId;
      this.user.CountryName = userForm.value.Country.CountryName;
      this.user.CityId = userForm.value.City.CityId;
      this.user.CityName = userForm.value.City.CityName;
      this.user.AreaName = userForm.value.Area.AreaName;
      this.user.KCIRegistered = 1;
      this.user.KCIDetails = userForm.value.KCIDetails;
      this.user.ReferralCode = 0;

      console.log(this.user)

      this.authService.signUp(this.user)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
          }
          else {
          }

        });
    }
    else {
    }



  }





}
