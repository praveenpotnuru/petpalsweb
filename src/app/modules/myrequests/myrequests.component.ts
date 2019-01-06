import { Component, OnInit } from '@angular/core';
import { Requests } from 'src/app/shared/models/Requests.model';
import { Router } from '@angular/router';
import { PetserviceService } from 'src/app/services/petservice.service';

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

  // @ViewChild('searchInput') searchValue: ElementRef;

  constructor(
    private sharedService: PetserviceService,

    private router: Router
  ) {


  }


  ngOnInit() {

    this.securityToken = localStorage.getItem('token')
    this.sharedService.getAllRequest()
      .subscribe((result: any) => {
        this.loadedRequestList = result.Data;
        console.log(this.loadedRequestList)
        if (this.loadedRequestList.length == 0) {
          this.dataHasOrNot = true;
          console.log(this.dataHasOrNot);
        }
      })

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

}
