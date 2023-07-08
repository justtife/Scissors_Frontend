import { Component } from '@angular/core';
import { UrlServiceService } from 'src/app/services/url-service.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  urls: any;
  currentUrl = window.location.origin.replace(/^https?:\/\//, '');
  num = [1, 2, 3, 4];
  skip: any;
  constructor(private http: UrlServiceService) {}
  getUserUrl() {
    setTimeout(() => {
      const userID = localStorage.getItem('userID');
      if (userID) {
        this.http.getUserUrl(userID, this.skip).subscribe(
          (response) => {
            this.urls = response.data.reverse();
          },
          (error) => {
            this.urls = null;
          }
        );
      }
    });
  }
}
