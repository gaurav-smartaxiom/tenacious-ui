import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from '../common/common.service';
import { ApiService } from '../api/api.service';
import { ITracker } from '../../models/tracker.model';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {
  constructor(private http: HttpClient, private commonService: CommonService,/* private socket: Socket */) { }

  /**
   * @description get all end point list
   */
  getAllEndPoint() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&status=true` })
    };

    return this.http.get<ITracker[]>(ApiService.URLs.endPointManagement, options);
  }

  getAllTrackersWithShipment() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `id=${user.id}&userLevel=${user.userLevel}&status=true` })
    };

    return this.http.get<ITracker[]>(ApiService.URLs.getAllTrackerWithShipment, options);
  }

  /**
   * @description get all end point list
   */
  getCalibrationCertificate(deviceUUID: string) {
    const options = {
      responseType: 'arrayBuffer' as 'json',
    };
    return this.http.get<any>(ApiService.URLs.calibrationCertificate + `/${deviceUUID}`, options);
  }

  /**
 * @description get all end point list with Active & Registered Status
 */
  getAllEndPointReports() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}` })
    };

    return this.http.get(ApiService.URLs.endPointManagement, options);
  }

  getEndPointById(array: any) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&blocklockId=${array.join(',')}` })
    };
    return this.http.get<ITracker[]>(ApiService.URLs.endPointManagement, options);
  }

  deleteEndpoint(data: any) {
    const options = {
      params: new HttpParams({ fromString: `trackerId=${data._id}` })
    };
    return this.http.delete(ApiService.URLs.deleteEndPointManagement, options);
  }

  updateEndpoint(data: { id?: string; _id?: any; }) {
    const { user } = this.commonService.getCurrentUserData();
    const token = localStorage.getItem('token');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ token,
    });

    const options = {
      headers:headers_object,
      params: new HttpParams({ fromString: `trackerId=${data._id}` })
    };
    return this.http.post(ApiService.URLs.activateEndPointManagement, {}, options);
  }


  activateEndpoint(data: { id?: string; _id?: any; }) {
    const body = JSON.stringify(data);
    const { user } = this.commonService.getCurrentUserData();
   const token = localStorage.getItem('token');
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ token,
    });
    const options = {
      headers: headers_object,
      params: new HttpParams({ fromString: `trackerId=${data._id}` })
    };
    return this.http.post(ApiService.URLs.activateEndPointManagement, {}, options);
  }

  getEndPointByStatus(status: boolean) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&status=${status}` })
    };
    return this.http.get(ApiService.URLs.endPointManagement, options);
  }

  connectSocket() {
    const { user } = this.commonService.getCurrentUserData();
    // this.socket.ioSocket.io.opts.query = { email: user.officialEmail, tenantName: user.organizationName } //new options
    // this.socket.ioSocket.io.uri = environment.host //new uri
    // this.socket.connect(); //manually connection
  }
  disconnectSocket(){
    // if(this.socket) this.socket.disconnect();
  }
  requestEvents() {
    // return this.socket.emit('requestEvents');
  }

  receiveEvents() {
    // const demo = this.socket.fromEvent('receiveEventList');
    // return demo;
  }
  getEndpointByDeviceUUID(id: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&deviceUUID=${id}` })
    };
    return this.http.get(ApiService.URLs.endPointManagementById, options);
  }

}

