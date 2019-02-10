import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PetserviceService } from 'src/app/services/petservice.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';

@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.less']
})
export class MyrequestsComponent implements OnInit {

  loadedRequestList: any = [];
  showloadingImage: boolean = true;
  dataHasOrNot: boolean = false;

  securityToken: string;
  loginUserId: string;
  withdrawRequestId: number;
  show: boolean;

  /*Boarding*/
  public isBoarding: Boolean = false;
  public displayBoardingModal = 'none';
  public boardingRequestInfo: any;

  constructor(
    private sharedService: PetserviceService,
    private router: Router,
    private masterService: MasterService,
    private toastaService: ToastaService
  ) {
  }

  ngOnInit() {
    this.securityToken = localStorage.getItem('token');
    this.show = false;
    this.sharedService.getAllRequest()
      .subscribe((result: any) => {
        this.loadedRequestList = result.Data;
        this.show = true;
        if (this.loadedRequestList.length == 0) {
          this.dataHasOrNot = true;
          console.log(this.dataHasOrNot);
        }
      })
  }

  ngAfterViewInit() {
  }

  onFindPetLoveClick() {
    this.router.navigate(['/petlove']);
  }

  onAlliedServiceClick() {
    this.router.navigate(['/allied-service']);
  }

  onAdoptionClick() {
    this.router.navigate(['/adoption']);
  }

  onDetailsClick(petId: number) {
    //this.router.navigate(['/own-a-pet-details/' + petId]);
  }

  onContactRequest(_withdrawRequestId: number) {
    this.withdrawRequestId = _withdrawRequestId;
  }

  onWithdrawRequest() {
    console.log(this.withdrawRequestId)

    this.sharedService.WidrawRequest(this.withdrawRequestId)
      .subscribe((result: any) => {
        let status = result.Status;
        console.log(result)
        if (status != "Errored") {
          this.sharedService.getAllRequest()
            .subscribe((result: any) => {
              this.loadedRequestList = result.Data;
              console.log(this.loadedRequestList)
              if (this.loadedRequestList.length == 0) {
                this.dataHasOrNot = true;
              }
            })

        }
        else {
          // this.toastr.error(result.ErrorMessage, 'Error')
        }
      })
  }

  diableAnchorLink() {
    return false;
  }
  onModalOpen(requestedData: any) {
    this.boardingRequestInfo = requestedData;
    this.isBoarding = true;
    this.displayBoardingModal = 'block';
    document.body.style.overflow = 'hidden'
    // this.petService.myBoardingDetails(requestId).subscribe((result: any) => {

    // });
  }
  closeModal() {
    this.displayBoardingModal = 'none';
    document.body.removeAttribute('style')
  }

  clickOnPay() {
    var toastOptions = this.masterService.setToastOptions('Payment', 'Please use mobile application for payments.', '')
    this.toastaService.info(toastOptions);
    return false;
  }

}
