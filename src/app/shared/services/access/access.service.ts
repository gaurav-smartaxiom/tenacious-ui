import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from '../common/common.service';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http:HttpClient, private commonService:CommonService) { }

  /**
   * @description get all userlist
  */
  getUserManagement() {
    const {user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
     // params: new HttpParams({fromString:`email=${user.officialEmail}&organizationName=${user.organizationName}&userId=${user.id}`})
      params: new HttpParams({fromString:`organizationName=${user.organizationName}&userId=${user.id}`})
    };
    return this.http.get(ApiService.URLs.userManagement, options);
  }

  /**
   *
   * @param data
   * @description save new user to server
   */
  postUserManagement(data: { fullName: string; userLevel: string; password: string; address: string; contactNumber: string; officialEmail: string; id: string; }) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      params: new HttpParams({fromString:`email=${user.officialEmail}&tenant=${user.organizationName}`})
    };
    return this.http.post(ApiService.URLs.userManagement, data,options);
  }

  /**
   *
   * @param deleteUserData
   * @description delete new user
   */
  deleteUserManagement(deleteUserData: any) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`email=${user.officialEmail}&username=${deleteUserData.officialEmail}&tenant=${user.organizationName}&id=${deleteUserData.id}`})
    };
    return this.http.delete(ApiService.URLs.userManagement, options);
  }

  /**
   *
   * @param data
   * @description create new access level
   */
  createAccessLevel(data: { type: string; name: string; levelname: string; action: boolean; createdBy: string; updatedBy: string; createdAt: Date; permissions: {}; }) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`email=${user.officialEmail}`})
    };
    return this.http.post(ApiService.URLs.accessControl, data, options);
  }

  /**
   * @description get all access levels
   */
  getAccessLevel() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    // params: new HttpParams({fromString:`email=${user.officialEmail}&userLevel=${user.userLevel}`})
     params: new HttpParams({fromString:`userLevel=${user.userLevel}`})
    };
    return this.http.get(ApiService.URLs.accessControl, options);
  }

  getCurrentUserAccessLevel(user: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.get(`${ApiService.URLs.accessControl}?userLevel=${user.userLevel}`, options).pipe(
      map((resp: any) => {
        return resp.find( (x: any) => x.levelname === user.userLevel)
      })
    );
  }

  /**
   *
   * @param levelData
   * @description delete access level
   */
  deleteLevel(levelData: any) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`email=${user.officialEmail}&id=${levelData.id}`})
    };
    return this.http.delete(ApiService.URLs.accessControl, options);
  }
  deleteAllLevel(levelData: any) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({fromString:`email=${user.officialEmail}`})
    };
    return this.http.post(ApiService.URLs.deleteSelected,levelData, options);
  }


  getUserChain() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}` })
    };
    return this.http.get(ApiService.URLs.getUserChain, options);
  }

  getUserActionReport(officialEmail: Array<String>) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `id=${officialEmail}&type=user` }),
    };
    return this.http.get(`${ApiService.URLs.getUserActionReport}`, options);
  }

  editProfile(body: { id: string; fullName: string; officialEmail: string; password: string; address: string; city: string; country: string; state: string; zipCode: string; }) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      params: new HttpParams({ fromString: `email=${user.officialEmail}&base64=${environment.enableBase64}` })
    };
    return this.http.post(ApiService.URLs.editProfile, body, options);
  }

}

