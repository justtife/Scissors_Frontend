import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SubDashComponent } from './pages/sub-dash/sub-dash.component';
import { UserComponent } from './pages/user/user.component';
import { AlertComponent } from './components/alert/alert.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { QrcodeComponent } from './pages/qrcode/qrcode.component';
import { SupportComponent } from './pages/support/support.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { LoadingComponent } from './components/loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    SubDashComponent,
    UserComponent,
    AlertComponent,
    DashboardComponent,
    NotFoundComponent,
    AnalyticsComponent,
    QrcodeComponent,
    SupportComponent,
    RedirectComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
