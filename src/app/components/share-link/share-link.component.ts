import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss'],
})
export class ShareLinkComponent {
  @Input() link: any;
  @Input() qrcode?: string;
  async shareLink() {
    const shareData: {
      title: string;
      text: string;
      url: string;
      files?: File[];
    } = {
      title: 'Scissors - URL Shortner',
      text: 'Share with ease and make an impact with every click...\n',
      url: `https://${this.link}`,
    };
    if (this.qrcode) {
      const file = await this.createFileFromUrl(this.qrcode);
      shareData.files = [file];
    }
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported');
    }
  }
  private async createFileFromUrl(url: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'qr-code.png', { type: 'image/png' });
    return file;
  }
}
