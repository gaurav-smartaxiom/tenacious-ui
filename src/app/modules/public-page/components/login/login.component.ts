import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subscription, switchMap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ToastrService } from 'ngx-toastr';
import { AccessService } from '../../../../shared/services/access/access.service';
import { API_SUCCESS } from '../../../../core/constants/global-success.constants';
import { API_ERROR } from '../../../../core/constants/global-error.constants';
import { extractIpString, getBrowserName } from '../../../../shared/utilites/browsers-name.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,  FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public loading: boolean = false;
  public passwordEye: boolean = false;
  public isChecked: boolean = true;
  fromEmailClick: boolean = false;
  prevUserEmail: any;
  prevUserPwd: any;
  
  private ipAddress: string = "";
  private emailVerifyToken: string = '';
  private _sub: Subscription = new Subscription();

  constructor(
    private accessService: AccessService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { 
    if (this.authService.isUserAuthenticate()) {
      const { user } = this.commonService.getCurrentUserData();
      this.router.navigate([user && user?.userLevel === "SUPERADMINUSER" ? '/master-data' : '/dashboard']);
    }
  }

  public ngOnInit(): void {
    this._sub.add(this.authService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    }));
    /*create login form fields*/
    this.createLoginForm();
    this.getUserAndCheckEmailVerification();
    /*get remember user from sessionStorage*/
    if (sessionStorage.getItem('rememberUser')) {
      const rememberData = JSON.parse(window.atob(sessionStorage.getItem('rememberUser') || ''));
      if (rememberData) {
        this.loginForm.controls['email'].setValue(rememberData.email);
        this.loginForm.controls['password'].setValue(rememberData.password);
        this.prevUserEmail = rememberData.email;
        this.prevUserPwd = rememberData.password;
        this.isChecked = true;
      }
    }
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }


  getUserAndCheckEmailVerification() {
    this.emailVerifyToken = this.activeRoute.snapshot.queryParamMap.get('token') || '';
    const decryptedToken: any = this.commonService.getDecryptedToken(this.emailVerifyToken);
    if (typeof decryptedToken) {
      this.commonService.setAccessToken(this.emailVerifyToken);
      this._sub.add(this.authService.getUserById(decryptedToken).pipe(
        switchMap(user => {
          if (!user.emailVerified) {
            this.toastr.success(
              API_SUCCESS.EMAIL_SUCCESS,
              API_SUCCESS.EMAIL_VERIFIED_TITLE,
            );
            return this.authService.saveEmailVerifiedStatus(this.emailVerifyToken).pipe(
              map(() => user)
            );
          } else {
            this.toastr.success(
              API_SUCCESS.EMAIL_ALREADY_VERIFYIED,'',
            );
            return of(user);
          }
        })
      ).subscribe({
        next: () => {
        console.log('User verified');
      },
      error: (error) => {
        console.log('error', error);
      }, complete: () => {}}));
    }
  }

  /*create login form*/
  private createLoginForm() {
    /*Initialized form field*/
    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [ Validators.required ]],
    });
  }

  /*convinience getter to access form fields*/
  get f() {
    return this.loginForm.controls;
  }

  /*remember user credentials and store in sessionStorage*/
  remember(e: { target: { checked: any; }; }) {
    const { email, password } = this.loginForm.value;
    if (e.target.checked) {
      if (email && password) {
        sessionStorage.setItem(
          'rememberUser',
          window.btoa(JSON.stringify({ email, password }))
        );
      }
    } else {
      sessionStorage.removeItem('rememberUser');
    }
  }

  checkRembrUserAndCurrenUserAreSame() {
    if (this.prevUserEmail !== this.f['email'].value && this.isChecked) {
      const { email, password } = this.loginForm.value;
      sessionStorage.setItem(
        'rememberUser',
        window.btoa(JSON.stringify({ email, password }))
      );
    }
  }
  /*login user with credentials*/
  doLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    let loginDetails = {
      email: this.loginForm.controls['email'].value.toLowerCase(),
      password: window.btoa(this.loginForm.controls['password'].value)
    }
    this.checkRembrUserAndCurrenUserAreSame();
    const browserName = getBrowserName();
    if (this.ipAddress === "") this.ipAddress = extractIpString();
      this.loading = true;
      this._sub.add(this.authService.login(loginDetails, this.ipAddress, browserName).pipe(
        switchMap(token => {
          this.commonService.setAccessToken(token);
          return this.authService.getUserByToken(token);
        }),
        switchMap(user => {
          return this.authService.getUserById(user);
        }),
        switchMap(user => {
          return this.accessService.getCurrentUserAccessLevel(user).pipe(
            map(resp => ({ ...user, accesslevel: resp }))
          )
        })
      ).subscribe({
        next: (resp) => {
          resp.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          resp.ipAddress = this.ipAddress;
          this.commonService.setUserData(resp);
          this.router.navigate([resp?.userLevel && resp?.userLevel === "SUPERADMINUSER" ? '/master-data' : '/dashboard']);
          this.loading = false;
          this.toastr.success(API_SUCCESS.LOGIN_SUCCESS, '');
        },
        error: (error) => {
          if (error?.message !== API_ERROR.USER_LOGOUT) {
            if (
              error?.message == API_ERROR.INCORRECT_CREDENTIALS ||
              error?.error == API_ERROR.DATABAE_CONNECTION_ERR
            )
              this.toastr.error(API_ERROR.INVALID_LOGIN_CREDENTIALS, '');
            else if (error?.message === API_ERROR.USER_PROFILE_LOCKED) {
              this.toastr.error(API_ERROR.USER_PROFILE_LOCKED);
            }
            else if (error?.message == API_ERROR.CONFIRM_EMAIL) {
              this.router.navigate(['tenant-signup'],{state:{isResendLink:true,emailForResendLink:this.f['email'].value}})
            } else this.toastr.error(API_ERROR.SOMETHING_WENT_WRONG, '');
          }
          this.loading = false;
        }
   }));
  }

}
