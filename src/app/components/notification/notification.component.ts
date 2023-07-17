import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() response: any;
  showAlert: boolean = true;

  onCancelClick(): void {
    this.showAlert = false;
  }
}
