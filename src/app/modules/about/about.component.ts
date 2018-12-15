import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  private fragment: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    // try {
    //   document.querySelector('#' + this.fragment).scrollIntoView();
    // } catch (e) { }
  }
  onAnchorClick(){
    debugger;
    let x = document.querySelector("#profile1");
    if (x){
        x.scrollIntoView();
    }
  }
}
