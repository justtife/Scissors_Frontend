import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  showSuccessMessage() {
    Swal.fire({
      title: 'Message Sent',
      text: 'You request has been received, an email will be sent to you. Thank you',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      // cancelButtonColor: '#d33',
      confirmButtonColor: 'rgba(21, 49, 174, 0.904)',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('test');
      } else {
        console.log('closed');
      }
    });
  }

  showError() {
    Swal.fire('Error occured !');
  }
}
