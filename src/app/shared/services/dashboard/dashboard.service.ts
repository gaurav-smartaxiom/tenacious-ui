import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment-timezone';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../common/common.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  timeZone = moment.tz.guess();
  timeZoneOffset = new Date().getTimezoneOffset();

  private _devicesFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  devicesFilter$ = this._devicesFilter.asObservable();
  toggleDevicesFilter(value: boolean) {
    this._devicesFilter.next(value);
  }

  private _avgcountsFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  avgcountsFilter$ = this._avgcountsFilter.asObservable();
  toggleAvgcountsFilter(value: boolean) {
    this._avgcountsFilter.next(value);
  }

  private _sensorsFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  sensorsFilter$ = this._sensorsFilter.asObservable();
  toggleSensorsFilter(value: boolean) {
    this._sensorsFilter.next(value);
  }

  private _pqueueFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  pqueueFilter$ = this._pqueueFilter.asObservable();
  togglePqueueFilter(value: boolean) {
    this._pqueueFilter.next(value);
  }

  private _teventsFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  teventsFilter$ = this._teventsFilter.asObservable();
  toggleTeventsFilter(value: boolean) {
    this._teventsFilter.next(value);
  }

  private _nodemapsFilter: BehaviorSubject<boolean> = new BehaviorSubject(true);
  nodemapsFilter$ = this._nodemapsFilter.asObservable();
  toggleNodemapsFilter(value: boolean) {
    this._nodemapsFilter.next(value);
  }

  private _mapCardSection: BehaviorSubject<boolean> = new BehaviorSubject(true);
  mapCardSection$ = this._mapCardSection.asObservable();
  toggleMapCardSection(value: boolean) {
    this._mapCardSection.next(value);
  }

  private _eventLogCardSection: BehaviorSubject<boolean> = new BehaviorSubject(true);
  eventLogCardSection$ = this._eventLogCardSection.asObservable();
  toggleEventLogCardSection(value: boolean) {
    this._eventLogCardSection.next(value);
  }

  private _openPopup: Subject<boolean> = new Subject();
  openPopup$ = this._openPopup.asObservable();
  togglePopup(value: boolean) {
    this._openPopup.next(value);
  }

  constructor (
    private http: HttpClient, 
    private sanitizer: DomSanitizer, 
    private commonService: CommonService, 
    private socket: Socket
  ) { }

  /**
   *
   * @param user
   * @description set first time login status
   */
  setFirstTimeLoginStatus(user: any) {
    const data = {
      id: user.id,
      firstTimeLogin: true,
    }
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&userId=${user.id}` })
    };
    return this.http.put(ApiService.URLs.firstTimeLogin, data, options);
  }

  getImage(): any {
    const { user } = this.commonService.getCurrentUserData();

    return this.http.get(ApiService.URLs.profileImage, { responseType: 'blob', params: new HttpParams({ fromString: `email=${user.officialEmail}&userId=${user.id}&base64=${environment.enableBase64}` }) })
      .pipe(
        map((res: any) => {
          const urlCreator = window.URL;
          return this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
        })
      );
  }

  getImageBase64() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `base64=${environment.enableBase64}&userId=${user.id}` })
    };
    return this.http.get(ApiService.URLs.profileImage, options);
  }

  getTotalDevices() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}` })
    };

    return this.http.get(ApiService.URLs.getTotalDevices, options);
  }

  getTotalProvisons() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}` })
    };

    return this.http.get(ApiService.URLs.getTotalProvisons, options);
  }

  getTotalBlocklock() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}` })
    };

    return this.http.get(ApiService.URLs.getTotalBlocklock, options);
  }

  getAllUsers() {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.get(`${ApiService.URLs.getNewUsers}?email=${user.officialEmail}`, options);
  }

  getTotalEventByDuration(type: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&duration=${type}` })
    };

    return this.http.get(ApiService.URLs.getTotalEventByDuration, options);
  }

  getSparklineGraph(type: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&type=${type}` })
    };

    return this.http.get(ApiService.URLs.getSparklineGraph, options);
  }

  /**
   * Description: get tagname for ui release
   * @description get tagname for ui release
   */
  getUIReleaseVersion(user: undefined) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get(ApiService.URLs.getUIReleaseVersion, options);
  }

  /** 
   * Description: get tagname for blocklock release
   * @description get tagname for blocklock release
   */
  getBLReleaseVersion(user: { officialEmail: any; } | undefined) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user?.officialEmail}` })
    };
    return this.http.get(ApiService.URLs.getBlReleaseVersion, options);
  }

  connectSocket(socketConnectionId: string = '') {
    const { user } = this.commonService.getCurrentUserData();
    let encryptedEmail = CryptoJS.AES.encrypt(user.officialEmail, 'tenacious').toString();
    encryptedEmail = encryptedEmail.substring(0, 10);
    let encryptedSocketConnectionId = CryptoJS.AES.encrypt(socketConnectionId, 'tenacious').toString();
    encryptedSocketConnectionId = encryptedSocketConnectionId.substring(0, 10);
    this.socket.ioSocket.io.opts.query = { tenantName: user.organizationName, socketConnectionId: socketConnectionId } //new options
    this.socket.ioSocket.io.uri = environment.host//new uri
    this.socket.connect(); //manually connection
    const userDetails = {
      officialEmail: user.officialEmail,

    };
  }

  requestCounts(user?: undefined) {
    const edge = this.requestEdgeChainCount();
    const provison = this.requestProvisionEndPointCount();
    const activeEdge = this.requestActiveEdgeCount();
    const events = this.requestEventCount();
    const endpoint = this.requestEndPointCount(user);
    return;
  }

  requestEdgeChainCount() {
    const data = this.socket.emit('requestEdgeChainCount');
    return (data);
  }

  requestActiveEdgeCount() {
    const data = this.socket.emit('requestActiveEdgeCount');
    return (data);
  }

  edgeChainCount() {
    const data = this.socket.fromEvent('receiveEdgeChainCount');
    return (data);
  }

  activeEdgeCount() {
    const data = this.socket.fromEvent('receiveActiveEdgeCount');
    return (data);
  }

  requestEndPointCount(user: { id: any; userLevel: any; token: any; } | undefined) {
    const data = this.socket.emit('requestEndPointCount', { userId: user?.id, userLevel: user?.userLevel, token: user?.token });
    return (data);
  }

  endPointCount() {
    const data = this.socket.fromEvent('receiveEndPointCount');
    return (data);
  }

  requestProvisionEndPointCount() {
    const data = this.socket.emit('requestProvisionEndPointCount');
    return (data);
  }

  provisionEndPointCount() {
    const data = this.socket.fromEvent('receiveProvisionEndPointCount');
    return (data);
  }

  requestEventCount() {
    const data = this.socket.emit('requestEventCount');
    return (data);
  }

  eventCount() {
    const data = this.socket.fromEvent('receiveEventCount');
    return (data);
  }

  requestgenerateAlerts() {
    const data = this.socket.emit('requestGenerateAlerts');
    return (data);
  }

  generateAlerts() {
    const data = this.socket.fromEvent('receiveGenerateAlerts');
    return (data);
  }

  requestSparkLine(type: string) {
    const data = this.socket.emit('requestSparkLine', { type: type });
    return (data);
  }

  usersSparklineGraph() {
    const data = this.socket.fromEvent('usersSparkline');
    return (data);
  }

  eventsSparklineGraph() {
    const data = this.socket.fromEvent('eventsSparkline');
    return (data);
  }

  activeEndpointsSparklineGraph() {
    const data = this.socket.fromEvent('activeEndpointsSparkline');
    return (data);
  }

  provisioningQueueSparklineGraph() {
    const data = this.socket.fromEvent('provisioningQueueSparkline');
    return (data);
  }

  totalEndpointsSparklineGraph() {
    const data = this.socket.fromEvent('totalEndpointsSparkline');
    return (data);
  }

  requestEventByDuration(duration: string) {
    const data = this.socket.emit('requestEventByDuration', { duration: duration, timeZone: this.timeZone });
    return (data);
  }

  eventByDuration() {
    const data = this.socket.fromEvent('receiveEventByDuration');
    return (data);
  }


  requesteventsOfSelectedShipment(shipment: any, i: number) {
    const data = this.socket.emit('requestEventsOfSelectedShipment', { shipment: shipment, i: i });
    return (data);
  }

  eventsOfSelectedShipment() {
    const data = this.socket.fromEvent('receiveEventsOfSelectedShipment');
    return (data);
  }

  requestDeviceByDuration(duration: string) {
    const data = this.socket.emit('requestDeviceByDuration', { duration: duration, timeZone: this.timeZone });
    return (data);
  }

  deviceByDuration() {
    const data = this.socket.fromEvent('receiveDeviceByDuration');
    return (data);
  }

  requestAverageSensorData(duration: string, sensorMacAddr: string, blSerialNumber: string, deviceToken: string, shipmentId: string) {
    const data = this.socket.emit('requestMovingAverageSensorData', 
      { duration, sensorMacAddr, timeZone: this.timeZone, blSerialNumber, deviceToken, shipmentId });
    return (data);
  }

  averageSensorData() {
    const data = this.socket.fromEvent('receiveAverageSensorData');
    return (data);
  }

  requestSensorEventsData(duration: string, sensorMacAddr: any, deviceToken: any, shipmentId: any) {
    const data = this.socket.emit('requestSensorEventsData', 
      { duration, sensorMacAddr, timeZone: this.timeZone, deviceToken, shipmentId });
    return (data);
  }

  sensorEventsData() {
    const data = this.socket.fromEvent('receiveSensorEventsData');
    return (data);
  }

  requestEvents() {
    const data = this.socket.emit('requestEvents');
    return (data);
  }

  requestSensorList() {
    const data = this.socket.emit('requestSensorList');
    return (data);
  }

  receiveEvents() {
    const data = this.socket.fromEvent('receiveEventList');
    return (data);
  }

  reciveSensor() {
    const data = this.socket.fromEvent('reciveSensorList');
    return (data);
  }

  requestAvgEventDataSensorList(edgeToken: string, endToken: string) {
    const data = this.socket.emit('requestAvgEventDataSensorList', { edgeToken: edgeToken, endToken: endToken });
    return (data);
  }

  requestSensorGraphData(shipmentId: any, trackerId: any, sensorId: any, duration: string) {
    const data = this.socket.emit('requestAverageSensorData', { shipmentId, trackerId, sensorId, duration });
    return (data);
  }

  requestEvnetDataSensorList(edgeToken: string, endToken: string) {
    const data = this.socket.emit('requestEventDataSensorList', { edgeToken: edgeToken, endToken: endToken });
    return (data);
  }

  avgEventDataSensorList() {
    const data = this.socket.fromEvent('reciveAvgEventDataSensorList');
    return (data);
  }
  evnetDataSensorList() {
    const data = this.socket.fromEvent('reciveEventDataSensorList');
    return (data);
  }

  disconnectSocket() {
    if (this.socket) this.socket.disconnect();
  }

  getTotalDevicesGraph(type: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&duration=${type}` })
    };

    return this.http.get(ApiService.URLs.getTotalDevicesGraph, options);
  }

  getAverageSensorGraph(type: string, sensor: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&duration=${type}&sensorType=${sensor}` })
    };

    return this.http.get(ApiService.URLs.getAverageSensorGraph, options);
  }

  getSensorEvents(type: string, sensor: string) {
    const { user } = this.commonService.getCurrentUserData();
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&duration=${type}&sensorType=${sensor}` })
    };

    return this.http.get(ApiService.URLs.getSensorEvents, options);
  }

  public getNotificationData() {
    const { user } = this.commonService.getCurrentUserData();
    this.socket.emit('notificationRequest', user.token);
    return this.socket.fromEvent('notificationReceived');
  }

  public requestLatestEvent() {
    const data = this.socket.fromEvent('receivelatestEvent');
    return (data);
  }

  public latestEvent = new BehaviorSubject<any>([]);
  public latestEvent$ = this.latestEvent.asObservable();
  getLatestEvents(data: any) { this.latestEvent.next(data); }

  public trackerAlertsData(shipmentId?: any, userLevel?: any, userId?: any) {
    if (shipmentId)
      return this.http.get(`${ApiService.URLs.trackerAlertsData}?sid=${shipmentId}`);
    else
      return this.http.get(`${ApiService.URLs.trackerAlertsData}?userId=${userId}&userLevel=${userLevel}`);
  }

  public getSmartNotification() {
    return this.socket.fromEvent('receiveSmartNotification');
  }

  public updateSmartNotification() {
    return this.socket.fromEvent('receiveNotificationReadStatus');
  }

  public removedSmartNotification() {
    return this.socket.fromEvent('removedSmartNotification');
  }

  public getShipmentList() {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get(ApiService.URLs.getShipmentList, options);
  }


  public getShipmentById(shipmentId: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.get(`${ApiService.URLs.getShipmentById}/${shipmentId}`, options);
  }


  public getPolygonCoordinates(id: string) {
    return this.http.get(`${ApiService.URLs.locationAlerts}/${id}`)
  }

  requestAlertCount(userLevel: any, userId: any, userToken: any) {
    this.socket.emit('requestAlertCounts', { userLevel, userId, userToken });
    const data = this.socket.fromEvent('receiveAlertCount');
    return data;
  }

  public downloadOverallReport(user: { officialEmail: any; organizationName: any; fullName: any; timeZone: any; }, isDownload: any) {
    const options: any = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams({ fromString: `email=${user.officialEmail}&tenant=${user.organizationName}&name=${user.fullName}&timeZone=${user.timeZone}&downloadReport=${isDownload}` })
    };
    if (isDownload) { options['responseType'] = 'blob'; }
    return this.http.get(`${ApiService.URLs.downloadOverallReport}`, options)
  }

}
