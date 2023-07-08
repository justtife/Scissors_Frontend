import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from 'src/app/services/url-service.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  ngOnInit(): void {
    this.getUserUrl();
    this.getUserQrCode();
  }
  urls: any;
  paginations: any;
  showModal: boolean = false;
  currentUrl = window.location.origin.replace(/^https?:\/\//, '');
  num = [1, 2, 3, 4];
  selectedPage: number = 0;
  modalOutput: any = { qrcode: '' };
  qrCode: any = {};
  qrCodeDetails: any;

  constructor(private http: UrlServiceService) {}
  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }
  getUserUrl(skip: string = '1') {
    const userID = localStorage.getItem('userID');
    this.selectedPage = parseInt(skip);
    if (userID) {
      this.http.getUserUrl(userID, skip).subscribe(
        (response) => {
          console.log(response.data);
          this.urls = response.data;
          this.paginations = Math.ceil(response.data.count / 5);
        },
        (error) => {
          this.urls = null;
        }
      );
    }
  }
  getUserQrCode() {
    const userID = localStorage.getItem('userID');
    if (userID) {
      this.http.getUserQrCode(userID).subscribe(
        (response) => {
          this.qrCodeDetails = response.data;
        },
        (error) => {
          this.qrCode = null;
        }
      );
    }
  }
  previousPage() {
    if (this.selectedPage > 1) {
      this.getUserUrl((this.selectedPage - 1).toString());
    }
  }
  nextPage() {
    if (this.selectedPage < this.paginations) {
      this.getUserUrl((this.selectedPage + 1).toString());
    }
  }
  displayQR(qrcode: string) {
    this.modalOutput.qrcode = qrcode;
    this.showModal = true;
  }
  cancelModal() {
    this.showModal = false;
    this.modalOutput = {};
  }
}
