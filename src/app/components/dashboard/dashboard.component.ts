import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() pageTitle: string | any;
  @Input() pageSubTitle: string | any;
  isWidthToggled: boolean = true;
  loading: boolean = true;
  response: any = {
    message: '',
    icon: '',
    type: '',
  };
  ngOnInit(): void {
    this.setLoading();
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setLoading(event.url);
      }
    });
  }

  constructor(private http: UserService, private route: Router) {}
  toggleWidth() {
    this.isWidthToggled = !this.isWidthToggled;
  }
  setLoading(url?: string) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  logout() {
    localStorage.removeItem('srstoken');
    localStorage.removeItem('userID');
    this.loading = true;
    this.http.logout().subscribe((response) => {
      this.http.setLoginStatus(false);
      this.route.navigate(['/home']);
    });
  }
}
