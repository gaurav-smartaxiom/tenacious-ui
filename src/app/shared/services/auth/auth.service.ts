import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSignup } from '../../models/user-signup.model';
import { TenantSignup } from '../../models/tenant-signup.model';
import { User } from '../../../core/models/user';
import { AccountSetup } from '../../models/account-setup.model';
import * as CryptoJS from 'crypto-js';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  /**
   * @param userId
   * @description get user by id
   */
   getUserById(user: { id: any; }) {
    const options = {
      params: new HttpParams({fromString:`userId=${user.id}`})
    }
    return this.http.get<{ data: any }>(ApiService.URLs.getUserById, options).pipe(
      map(resp => ({ ...resp.data }))
    );
  }

  /**
   *
   * @param token
   * @returns user object
   */
  getUserByToken(token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Access-Control-Allow-Origin', '*'),
    }
    return this.http.get<{ data: any }>(`${ApiService.URLs.getUserByToken}/${token}`, options).pipe(
      map(resp => ({ ...resp.data }))
    );
  }

  /**
   * @param data
   * @description check reset password link expired or not on server
   */
  resetLinkExpired(data: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({ fromString: `email=${data.emailId ? data.emailId : data.officialEmail}&urlId=${data.urlId}`})
    }
    return this.http.get(ApiService.URLs.forgotPassword, options)
  }

  /**
   *
   * @param data
   * @description reset password on server
   */
  resetPassword(data: { officialEmail: any; urlId: any; confirmPassword: any; }) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`email=${data.officialEmail}&urlId=${data.urlId}`})
    }
    delete data?.confirmPassword;
    return this.http.post(ApiService.URLs.resetPassword, data, options)
  }

  /**
   *
   * @param data
   * @description send mail for forgot password
   */
   sendMail(data: { email: any; }) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`email=${data.email}&emailId=${data.email}`})
    }
    return this.http.post(ApiService.URLs.forgotPassword, data, options)
  }


  /**
   * @description email as an argument
   */
  resendMail(email: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`email=${email}`})
    }
    return this.http.post(ApiService.URLs.resendLink, {}, options)
  }

  /*send request to server to register user*/
  tenantSignUp(user: TenantSignup): Observable<TenantSignup> {
    user.isActive = false;
    user.createdBy = "system";
    user.createdDate = new Date();
    user.updatedBy = '';
    user.updatedDate = new Date();
    const options = {headers:new HttpHeaders().set('Content-Type',"application/json")}
  return this.http.post<TenantSignup>(ApiService.URLs.tenantSignup, JSON.stringify(user), options)
  }

  /*send request to server to signup the user*/
  userSignUp(user: UserSignup): Observable<UserSignup> {
    // const org = localStorage.getItem('org').trim();
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`tenant=${user.organizationName}`})
    }
    return this.http.post<UserSignup>(ApiService.URLs.userSignup, JSON.stringify(user), options)
  }

  /* Assign shipment to user */
  assignUserShipment(user: { organizationName: any; }, userEmail: any, shipments: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`tenant=${user.organizationName}`})
    }
    return this.http.post(ApiService.URLs.userAssignShipment,{userOrg:user.organizationName ,userEmail, shipments}, options)
  }

  /* Assign shipment to user */
  getUserAssignedShipments(user: any, orgName: any) {
    return this.http.get(`${ApiService.URLs.userAssignShipment}?userId=${user}&orgName=${orgName}`)
  }

  /*send update request to server to setup admin account data*/
  accountSetup(accountDetails: AccountSetup): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', "application/json"),
      params: new HttpParams({fromString:`email=${accountDetails.email}`})
    };
    delete accountDetails.email;
    return this.http.put(ApiService.URLs.adminSetup, JSON.stringify(accountDetails), options);
  }

  /*send request to server to login user*/
  login(user: User,ipAddress:string,browserName:string): Observable<string> { 
    let encryptedEmail = CryptoJS.AES.encrypt(user.email, 'tenacious').toString();
    encryptedEmail = encryptedEmail.substring(0, 10);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`ipaddress=${ipAddress}&browserName=${browserName}`})
    };

    return this.http.post<{ token: string }>(ApiService.URLs.login, JSON.stringify(user), options).pipe(
      map(resp => resp.token)
    );
  }

  doLogout(user: User,ipAddress:string,browserName:string): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`ipaddress=${ipAddress}&browserName=${browserName}&isPreAuthenticate=true`})
    };
    return this.http.post(ApiService.URLs.logout, JSON.stringify(user), options);
  }

  isUserAuthenticate(): Boolean {
    if (sessionStorage.getItem('data') !== null) {
      return true;
    } 
    return false;
  }

  saveEmailVerifiedStatus(token: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.put(ApiService.URLs.loginVerify, options);
  }

  getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  /**
   *Description: get user by id
* @param userId
* @description get user by id
*/
  getBlUser(user: { emailId: any; id: any; }): Observable<any> {
    const options = {
      params: new HttpParams({ fromString: `email=${user.emailId}&userId=${user.id}` })
    };
    return this.http.get(ApiService.URLs.getBluser, options);
  }
}
