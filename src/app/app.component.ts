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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get current cordinates.
          //positionCords = { "lat": position.coords.latitude, "lng": position.coords.longitude };
          localStorage.setItem('latitude', position.coords.latitude.toString());
          localStorage.setItem('longitude', position.coords.longitude.toString());
        },
        (error) => {
          // On error code..
        },
        { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
      );
    }
  }
  onActivate() {
    window.scroll(0, 0);
  }
}
