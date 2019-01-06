import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private _activatedRoute: ActivatedRoute, private petService: PetserviceService) {
    this.petId = this._activatedRoute.snapshot.params.id;
    this.petType = this._activatedRoute.snapshot.params.type;
  }

  ngOnInit() {
    this.getPetData();
  }

  getPetData() {
    debugger;
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
}
