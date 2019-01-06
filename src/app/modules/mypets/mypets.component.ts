import { Component, OnInit } from '@angular/core';
import { MyPet } from 'src/app/shared/models/MyPet.model';
import { Router } from '@angular/router';
import { PetserviceService } from 'src/app/services/petservice.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';

@Component({
  selector: 'app-mypets',
  templateUrl: './mypets.component.html',
  styleUrls: ['./mypets.component.less']
})
export class MypetsComponent implements OnInit {

  loadedMyPetList: MyPet[] = [];
  showloadingImage: boolean = true;


  securityToken: string;
  loginUserId: string;
  withdrawRequestId: number;

  // @ViewChild('searchInput') searchValue: ElementRef;

  constructor(
    private myPetService: PetserviceService,
    private router: Router,
    private masterService: MasterService,
    private toastaService: ToastaService
  ) {

  }

  ngOnInit() {
   this.getMyPets();
  }

  getMyPets(){
    this.myPetService.mypetList()
    .subscribe((result: any) => {
      let status = result.Status;
      if (status != "Errored") {
        this.loadedMyPetList = result.Data;
      }
      else {
        //this.toastr.error(result.ErrorMessage, 'Error')
      }
    })
  }
  onDetailsClick(petId: number) {
    this.router.navigate(['/petdetails/' + petId]);
  }

  onLoveClick(petId: number) {
    this.myPetService.makePetFavourite(petId)
      .subscribe((result: any) => {
        let status = result.Status;
        if (status != "Errored") {
          var toastOptions = this.masterService.setToastOptions('Add Favourite', 'Pet Successfully added as favourite', '')
          this.toastaService.success(toastOptions);
          this.getMyPets();
        }
        else {
          var toastOptions = this.masterService.setToastOptions('Add Favourite', result.ErrorMessage, '')
          this.toastaService.error(toastOptions);
        }
      })
    return false;
  }

  onDeleteClick(_DeletePetId: number) {
    this.withdrawRequestId = _DeletePetId;
  }

  onDeletePet() {
    console.log(this.withdrawRequestId)
    this.myPetService.deleteMypet(this.withdrawRequestId)
      .subscribe((result: any) => {
        let status = result.Status;
        if (status != "Errored") {
          var toastOptions = this.masterService.setToastOptions('Delete Pet', 'Pet Successfully deleted', '')
          this.toastaService.success(toastOptions);

          this.getMyPets();

        }
        else {
          var toastOptions = this.masterService.setToastOptions('Delete Pet', result.ErrorMessage, '')
          this.toastaService.error(toastOptions);
        }
      })
  }

}
