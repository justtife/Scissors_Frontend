import { Component } from '@angular/core';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  constructor() {}

  shareLink() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Your application title',
          text: 'Check out this link!',
          url: 'https://jumia.com/shoes',
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.warn('Web Share API not supported');
      // Fallback behavior if Web Share API is not supported
      // You can implement custom share behavior here
    }
  }
}
