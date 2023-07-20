import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean = false;
  user = {
    user: '',
    password: '',
  };
  response: object | any = {};
  ngOnInit(): void {
    const token = localStorage.getItem('srstoken');
    if (token && this.http.isLoggedIn(token as string)) {
      this.route.navigate(['/dashboard']);
    }
  }
  constructor(private http: UserService, private route: Router) {}
  async onSubmit() {
    this.isSubmitting = true;
    this.response = {};
    try {
      this.response = {};
      this.http.loginUser(this.user).subscribe(
        (response) => {
          localStorage.setItem('srstoken', response.token);
          localStorage.setItem('userID', response.data.userID);
          this.http.setLoginStatus(true);
          this.route.navigate(['/dashboard']);
          this.isSubmitting = false;
        },
        (error) => {
          this.response.message = error.error.message;
          this.response.icon = 'bi-exclamation-circle';
          this.response.type = 'alert-warning';
          this.isSubmitting = false;
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  initiateGoogleAuth() {
    this.http.initiateGoogleAuth().subscribe((response) => {
      console.log(response);
    });
  }
}
