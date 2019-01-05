import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'tst';

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem('latitude', position.coords.latitude.toString());
        localStorage.setItem('longitude', position.coords.longitude.toString());
      });
    }else{
      alert("location is not enabled");
    }
  }
  onActivate() {
    window.scroll(0, 0);
  }
}
