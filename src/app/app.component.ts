import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userData: any = {};
  loggedIn: boolean = false;
  isDropdownVisible: boolean = false;
  constructor(private route: Router, private http: UserService) {}
  ngOnInit() {
    const token = localStorage.getItem('srstoken');
    this.loggedIn = false;
    if (token) {
      const isValidToken = this.http.isLoggedIn(token as string);
      if (isValidToken) {
        this.loggedIn = true;
        this.getAUser();
      }
    }
    this.http.loginStatusSubject.subscribe((status) => {
      if (status === true) {
        this.getAUser();
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }
  getAUser() {
    let userID = localStorage.getItem('userID');
    if (userID) {
      this.http.getUser(userID as string).subscribe(
        (response: any) => {
          this.loggedIn = true;
          this.userData = response.data;
        },
        (error) => {
          this.loggedIn = false;
        }
      );
    } else {
      this.loggedIn = false;
    }
  }
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  logOut() {
    localStorage.removeItem('srstoken');
    localStorage.removeItem('userID');
    this.http.logout().subscribe((response) => {
      this.loggedIn = false;
      this.route.navigate(['/home']);
    });
  }
}
