import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  shareLink() {
    const imageUrl =
      'https://resizing.app/blog/how-to-resize-image-without-losing-quality/irfanview.jpg';
    const text = 'Check out this image!';
    const shareData = {
      title: 'Your application title',
      text,
      url: 'https://jumia.com/shoes',
      files: [new File([imageUrl], 'image.jpg', { type: 'image/jpeg' })],
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
