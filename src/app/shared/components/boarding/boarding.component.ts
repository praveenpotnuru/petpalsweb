import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { Breed } from '../../models/breed.model';
import { AuthService } from 'src/app/services/auth.service';
import { PetserviceService } from 'src/app/services/petservice.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.less']
})
export class BoardingComponent implements OnInit, OnChanges {

  @Input() petData: any;
  @Input() isBoardingClicked = false;
  @Input() isEditView = false;
  @Output() closeModalPopup = new EventEmitter();
  //public petData: any;
  public displayBoardingModal = 'none';
  breedList: Breed[] = [];
  public selectedBreed = '';
  public selectedFoodOption = 'Non Veg';
  public selectedPickupDrop: number = 1;
  public selectedNumberOfDays = 1;
  public otherRequirements = "";
  public boardingStartDate = "";
  public boardingEndDate = "";


  constructor(
    private petService: PetserviceService,
    private authService: AuthService,
    private router: Router,
    private masterService: MasterService,
    private toastaService: ToastaService) { }

  ngOnInit() {
    console.log(this.petData);
  }

  ngOnChanges() {
    if (this.isBoardingClicked) {
      if (this.breedList.length == 0) {
        this.masterService.getBreedList()
          .subscribe((breedList: any) => {
            this.breedList = breedList.Data;
          });
      }
      if (this.isEditView) {
        this.getBoardingInfo(this.petData.PetMatingRequestId);
      } else {
        this.boardingStartDate = this.getCurrentDate(new Date());
        this.boardingEndDate = this.getCurrentDate(new Date());
      }
    }

  }
  getCurrentDate(dateToConvert: Date) {
    let todayDate = dateToConvert;
    let currentMonth = (todayDate.getMonth() + 1).toString();
    let currentDate = todayDate.getDate().toString();
    currentMonth = currentMonth.length == 2 ? currentMonth : "0" + currentMonth;
    currentDate = currentDate.length == 2 ? currentDate : "0" + currentDate;
    return todayDate.getFullYear() + "-" + currentMonth + "-" + currentDate;
  }

  petBoardingRequest() {
    if (!this.selectedBreed) {
      let toastOptions = this.masterService.setToastOptions('Pet Boarding Request', 'Please select Breed', '')
      this.toastaService.error(toastOptions);
      return false;
    }
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
      "RequesterPetId": "",
      "BoardingRequestDetails":
        [{
          "StartDate": this.boardingStartDate,
          "EndDate": this.boardingEndDate,
          "BreedId": this.selectedBreed,
          "BoardingAgencyId": this.petData.PetOwnerId,
          "NumberOfDays": this.selectedNumberOfDays,
          "TypeOfFood": this.selectedFoodOption,
          "PickUpDropNeeded": this.selectedPickupDrop == 0 ? 0 : 1,
          "OtherRequirements": this.otherRequirements
        }]
    }
    this.petService.petBoardingRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Boarding Request', 'Pet Boarding Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Boarding Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  closeModal() {
    this.closeModalPopup.emit();
  }

  getBoardingInfo(requestId: number) {
    this.petService.myBoardingDetails(requestId).subscribe((result: any) => {
      let boardingInfo = result.Data;
      console.log(boardingInfo);
      this.boardingStartDate = this.convertDateFormats(boardingInfo.StartDate);
      this.boardingEndDate = this.convertDateFormats(boardingInfo.EndDate);
      this.otherRequirements = boardingInfo.OtherRequirements;
      this.selectedNumberOfDays = boardingInfo.NumberOfDays;
      this.selectedBreed = boardingInfo.BreedId;
      this.selectedPickupDrop = boardingInfo.PickUpDropNeeded ? 1 : 0;
      this.selectedFoodOption = boardingInfo.TypeOfFood;
    });
  }

  convertDateFormats(date: string) {
    var parts = date.split('-');
    var mydate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    return this.getCurrentDate(mydate);
  }
}
