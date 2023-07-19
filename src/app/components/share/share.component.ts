import { Component } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent {
  shareContent: any = {
    url:
      'https://img.freepik.com/free-photo/white-horse-runs-beach_1340-34263.jpg',
    text: 'Your share text goes here',
  };
  share() {
    if (navigator.share && this.shareContent) {
      const { text, url } = this.shareContent;

      // Create an <input> element to pick the image file
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];

        // Create a File object from the picked image file
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const image = reader.result as string;

            // Call the navigator.share() method with the image, text, and URL
            navigator
              .share({
                title: 'Share Title',
                text,
                url,
                files: [file],
              })
              .then(() => console.log('Shared successfully'))
              .catch((error) => console.error('Error sharing:', error));
          };
          reader.readAsDataURL(file);
        }
      };

      // Trigger the file picker dialog
      input.click();
    } else {
      console.warn('Web Share API not supported');
      // Fallback behavior if Web Share API is not supported
      // You can implement custom share behavior here
    }
  }
}
