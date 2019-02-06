import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-petnews',
  templateUrl: './petnews.component.html',
  styleUrls: ['./petnews.component.less']
})
export class PetnewsComponent implements OnInit {
  petNews: any;
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    this.masterService.getPetNews().subscribe((data: any) => {
      this.petNews = data.Data;
    }, error => {
      console.log(error);
    })
  }

}
