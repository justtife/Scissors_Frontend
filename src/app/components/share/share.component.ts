import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  constructor(private metaService: Meta) {}
  updatedImageUrl = 'https://www.w3schools.com/images/w3schools_logo_436_2.png'; // Replace with the URL of the updated image

  shareLink() {
    this.metaService.updateTag({
      property: 'og:image',
      content: this.updatedImageUrl,
    });
    this.metaService.updateTag({
      property: 'og:image:type',
      content: 'image/png',
    });
    this.metaService.updateTag({
      property: 'og:image:width',
      content: '436',
    });
    this.metaService.updateTag({
      property: 'og:image:height',
      content: '228',
    });

    const text = 'Share with ease and make an impact with every click';
    const shareData = {
      title: 'Your application title',
      text,
      url: 'scs-drab.vercel.app',
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
}
