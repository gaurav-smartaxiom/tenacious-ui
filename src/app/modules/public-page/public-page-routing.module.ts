import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { loginGuard } from '../../core/guards/login.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '', component: PublicPageComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent, /* canActivate: [loginGuard] */ },
      { path: 'forgot-password', component: ForgotPasswordComponent, /* canActivate: [loginGuard] */ },
      { path: 'verify-email', component: VerifyEmailComponent, /* canActivate: [loginGuard] */ }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPageRoutingModule { }
