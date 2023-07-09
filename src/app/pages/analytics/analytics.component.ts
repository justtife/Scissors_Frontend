import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from 'src/app/services/url-service.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  urls: any;
  paginations: any;
  showModal: boolean = false;
  currentUrl = window.location.origin.replace(/^https?:\/\//, '');
  selectedPage: number = 0;
  modalOutput: any = { qrcode: '' };
  qrCode: any = {};
  qrCodeDetails: any;
  selectedFilter: string = 'shortUrl';
  tableOutput: any = {};

  constructor(private http: UrlServiceService) {}
  ngOnInit(): void {
    this.onFilterChange(this.selectedFilter);
    this.getUserUrl();
    this.getUserQrCode();
  }
  generateArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }
  getUserUrl(skip: string = '1') {
    const userID = localStorage.getItem('userID');
    this.selectedPage = parseInt(skip);
    if (userID) {
      this.http.getUserUrl(userID, skip).subscribe(
        (response) => {
          this.urls = response.data;
          this.tableOutput.data = response.data.urls;
          this.paginations = Math.ceil(response.data.count / 5);
        },
        (error) => {
          this.urls = null;
          this.tableOutput.data = null;
        }
      );
    }
  }
  getUserQrCode(skip: string = '1') {
    const userID = localStorage.getItem('userID');
    this.selectedPage = parseInt(skip);
    if (userID) {
      this.http.getUserQrCode(userID, skip).subscribe(
        (response) => {
          this.qrCodeDetails = response.data;
          this.tableOutput.data = response.data.urls;
          this.paginations = Math.ceil(response.data.count / 5);
        },
        (error) => {
          this.qrCode = null;
          this.tableOutput.data = null;
        }
      );
    }
  }
  onFilterChange(selectedValue: string) {
    this.selectedFilter = selectedValue;
    if (selectedValue === 'shortUrl') {
      this.tableOutput.type = 'Short URL';
      this.getUserUrl();
    } else if (selectedValue === 'qrCode') {
      this.tableOutput.type = 'Qr Code';
      this.getUserQrCode();
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
