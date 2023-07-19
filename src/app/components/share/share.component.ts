import { Component } from '@angular/core';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  qrCodeImageUrl: string =
    'https://www.w3schools.com/images/w3schools_logo_436_2.png'; // Replace with the actual QR code image URL

  shareLink() {
    const text = 'Check out this image!';
    const shareData = {
      title: 'Your application title',
      text,
      url: 'https://scs-drab.vercel.app',
      files: [this.createFileFromUrl(this.qrCodeImageUrl)],
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported');
      // Fallback behavior if Web Share API is not supported
      // You can implement custom share behavior here
    }
  }
  private createFileFromUrl(url: string): File {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    const blob = new Blob([xhr.response], { type: 'image/png' });
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });
    return file;
  }
}
