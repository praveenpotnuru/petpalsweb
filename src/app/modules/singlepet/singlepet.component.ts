import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PetserviceService } from '../../services/petservice.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';

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
      this.displayModal = 'block';
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
    else {
      var toastOptions = this.masterService.setToastOptions('Pet Love Request', 'Please login to continue', '')
      this.toastaService.error(toastOptions);
      //{ queryParams: { returnurl: this._activatedRoute.snapshot.url } }
      let returnUrl: any = this._activatedRoute.snapshot;
      this.router.navigate(['/signin'], { queryParams: { returnUrl: returnUrl._routerState.url } });
    }
  }

  getPetData() {
    this.petService.getPetDetails(this.petId).subscribe((data: any) => {
      this.petData = data.Data[0];
      console.log(this.petData);
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
  }
}
