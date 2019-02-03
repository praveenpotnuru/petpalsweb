import { Component, OnInit } from '@angular/core';
import { PetserviceService } from 'src/app/services/petservice.service';
import { MasterService } from 'src/app/services/master.service';
import { ToastaService } from 'projects/ngx-toasta/src/public_api';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.less']
})
export class ContactusComponent implements OnInit {

  constructor(private petService: PetserviceService,
    private masterService: MasterService,
    private toastaService: ToastaService
  ) { }

  ngOnInit() {
  }

  onContactClick() {

    this.petService.contactUs("", "")
      .subscribe((result: any) => {
        console.log(result)
        let status = result.Status;
        if (status != "Errored") {
          var toastOptions = this.masterService.setToastOptions('', 'Thanks for contacting us', '')
          this.toastaService.success(toastOptions);
        }
        else {
          var toastOptions = this.masterService.setToastOptions('', result.ErrorMessage, '')
          this.toastaService.error(toastOptions);
        }
      })

  }
}
