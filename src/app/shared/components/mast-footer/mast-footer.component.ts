import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mast-footer',
  templateUrl: './mast-footer.component.html',
  styleUrls: ['./mast-footer.component.less']
})
export class MastFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onFBClick() {
    window.open(`https://www.facebook.com/petpals.love/`, "_blank");
  }
  onInstaGramClick() {
    window.open(`https://www.instagram.com/petpalslove/`, "_blank");
  }
  onYoutubeClick(){
    window.open(`https://www.youtube.com/channel/UCJuHynWZfsNvI-AmK2M-Knw`, "_blank");
  }
  onPinterestClick(){
    window.open(` https://in.pinterest.com/petpalslove`, "_blank");
  }
}
