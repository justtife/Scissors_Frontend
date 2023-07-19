import { Component } from '@angular/core';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  qrCodeImageUrl: string =
    'https://res.cloudinary.com/dllgzg6si/image/upload/v1689773227/scissors_user/default_Pestino1%40gmail.com.png'; // Replace with the actual QR code image URL

  async shareLink() {
    const text = 'Check out this image!';
    const file = await this.createFileFromUrl(this.qrCodeImageUrl);
    const shareData = {
      title: 'Your application title',
      text,
      url: 'https://scs-drab.vercel.app',
      files: [file],
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

  private async createFileFromUrl(url: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });
    return file;
  }
}
