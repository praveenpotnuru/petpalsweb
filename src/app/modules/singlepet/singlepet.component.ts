import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { PetserviceService } from '../../services/petservice.service';

@Component({
  selector: 'app-singlepet',
  templateUrl: './singlepet.component.html',
  styleUrls: ['./singlepet.component.less']
})
export class SinglepetComponent implements OnInit {

  public petId: any;
  public hideShowFilter: boolean = false;
  public petData: any;
  public petType: any;
  public myPets: any = [];
  public selectedPetForLove: any;
  public petLoveRequestDisabled: boolean = true;
  public displayModal = 'none';

  /*Boarding*/
  public isBoarding: Boolean = false;
  public displayBoardingModal = 'none';

  /*Walker, Tariner, Rescuer */
  public displayCommonModal = 'none';

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _activatedRoute: ActivatedRoute,
    private petService: PetserviceService,
    private authService: AuthService,
    private router: Router,
    private masterService: MasterService,
    private toastaService: ToastaService
  ) {
    this.petId = this._activatedRoute.snapshot.params.id;
    this.petType = this._activatedRoute.snapshot.params.type;
  }

  ngOnInit() {
    this.getPetData();
  }

  ngAfterViewInit() {
    this.fileInput.nativeElement.addEventListener('click', this.onModalOpen.bind(this));
  }
 
  onModalOpen(event) {
    if (this.authService.isAuthenticated()) {
      this.handleModalPopups();
    }
    else {
      var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'Please login to continue', '')
      this.toastaService.error(toastOptions);
      //{ queryParams: { returnurl: this._activatedRoute.snapshot.url } }
      let returnUrl: any = this._activatedRoute.snapshot;
      this.router.navigate(['/signin'], { queryParams: { returnUrl: returnUrl._routerState.url } });
    }
  }

  handleModalPopups() {
    this.isBoarding = false;
    if (!this.petType) {
      this.displayModal = 'block';
      document.body.style.overflow = 'hidden'
      this.petService.mypetList()
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            this.myPets = result.Data;
            if (this.myPets.length >= 0 && this.myPets[0].PetId != 1)
              this.petLoveRequestDisabled = false;
          }
          else {
            var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'You dont have pets to make love', 'mypets')
            this.toastaService.success(toastOptions);
            this.petLoveRequestDisabled = true;
          }
        })
    }
    else if (this.petType == "Boarding") {
      this.isBoarding = true;
      this.displayBoardingModal = 'block';
      document.body.style.overflow = 'hidden'
   
    }
    else if (this.petType == "Walker" || this.petType == "Trainer"
      || this.petType == "Rescuer"
      || this.petType == "Adoption"
      || this.petType == "Spa"
      || this.petType == "Cab"
      || this.petType == "Volunteers"
    ) {
      this.displayCommonModal = 'block';
      document.body.style.overflow = 'hidden'
    }
  }

  getPetData() {
    this.petService.getPetDetails(this.petId).subscribe((data: any) => {
      this.petData = data.Data[0];
    }, error => {
      console.log(error);
    })
  }

  showHideFilter(): void {
    this.hideShowFilter = !this.hideShowFilter;
  }

  petLoveRequest() {
    if (this.authService.isAuthenticated()) {
      if (this.selectedPetForLove) {
        let requestOwnerId = this.authService.getRequesterOwnerId();

        var data = {
          "PetId": this.petData.PetId,
          "PetOwnerId": this.petData.PetOwnerId,
          "RequesterOwnerId": requestOwnerId,
          "RequesterPetId": this.selectedPetForLove
        }
        this.petService.petLoveRequestsRequest(data, 'RequestPetMatingRequest')
          .subscribe((result: any) => {
            var status = result.Status;
            var errorMessage = result.ErrorMessage;
            if (status != 'Errored') {
              var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'Pet Love Rquest Placed Successfully', '')
              this.toastaService.success(toastOptions);
              this.displayModal = 'none';
              this.router.navigate(['/myrequests']);
            }
            else {
              var toastOptions = this.masterService.setToastOptions('Pet Love Request', errorMessage, '')
              this.toastaService.error(toastOptions);
            }

          });
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'Please select Pet to make love request', '')
        this.toastaService.error(toastOptions);
        this.displayModal = 'block';
      }
    }
    else {
      var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'Please login to continue', '')
      this.toastaService.error(toastOptions);
      this.router.navigate(['/signin']);
    }

  }

  closeModal() {
    this.displayModal = 'none';
    this.displayBoardingModal = 'none';
    this.displayCommonModal = 'none';
    document.body.removeAttribute('style')
  }

  petCommonModalRequest() {
    if (this.petType == "Walker") {
      this.petWalkerRequest();
    }
    else if (this.petType == "Trainer") {
      this.petTrainerRequest();
    }
    else if (this.petType == "Rescuer") {
      this.petRescuerRequest();
    }
    else if (this.petType == "Adoption") {
      this.petAdoptionRequest();
    }
    else if (this.petType == "Spa") {
      this.petSpaRequest();
    }
    else if (this.petType == "Cab") {
      this.petCabRequest();
    }
    else if (this.petType == "Volunteers") {
      this.petVolutneersRequest();
    }
  }

  petWalkerRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petWalkerRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Walker Request', 'Pet Walker Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Walker Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  petTrainerRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petTrainerRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Trainer Request', 'Pet Trainer Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Trainer Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  petRescuerRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petRescuerRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Rescuer Request', 'Pet Rescuer Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Rescuer Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  petAdoptionRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petAdoptionRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Adoption Request', 'Pet Adoption Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Adoption Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  petSpaRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petSpaRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet SPA Request', 'Pet SPA Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet SPA Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }

  petCabRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petCabRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet CAB Request', 'Pet CAB Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet CAB Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }
  
  petVolutneersRequest() {
    let body =
    {
      "PetId": this.petData.PetId,
      "PetOwnerId": this.petData.PetOwnerId,
      "RequesterOwnerId": this.authService.getRequesterOwnerId(),
    }
    this.petService.petVolutneersRequest(body).subscribe((result: any) => {
      var status = result.Status;
      var errorMessage = result.ErrorMessage;
      if (status != 'Errored') {
        var toastOptions = this.masterService.setToastOptions('Pet Volunteers Request', 'Pet CAB Rquest Placed Successfully', '')
        this.toastaService.success(toastOptions);
        this.closeModal();
        this.router.navigate(['/myrequests']);
      }
      else {
        var toastOptions = this.masterService.setToastOptions('Pet Volunteers Request', errorMessage, '')
        this.toastaService.error(toastOptions);
      }

    });
  }
}
