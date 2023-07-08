import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SubDashComponent } from './pages/sub-dash/sub-dash.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SupportComponent } from './pages/support/support.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { QrcodeComponent } from './pages/qrcode/qrcode.component';
import { AuthGuard } from './services/auth-guard.service';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: SubDashComponent },
      { path: 'profile', component: UserComponent },
      { path: 'support', component: SupportComponent },
      { path: 'qrcode', component: QrcodeComponent },
      { path: 'analytics', component: AnalyticsComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: RedirectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
