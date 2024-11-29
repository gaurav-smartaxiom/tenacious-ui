
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../models/user-signup.model';
import { UserIdleService } from 'angular-user-idle';
import { ConstantVariables } from '../../../../constants/constants';
import { AuthService } from '../auth/auth.service';
import { extractIpString, getBrowserName } from '../../utilites/browsers-name.util';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public constantVariables = ConstantVariables;
  constructor(
    private router: Router,
    private userIdle: UserIdleService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  getTenantData() {
    return JSON.parse(sessionStorage.getItem('user') as string);
  }

  getCurrentUserData(): { user: IUser } {
    const userData = sessionStorage.getItem('data');
    if (userData !== null) {
      const user = JSON.parse(window.atob(userData));
      return { user };
    }
    return { user: {} as IUser };
  }

  setUserData(data: any) {
    const oldData  = sessionStorage.getItem('data');
    if(oldData){
      sessionStorage.removeItem('data');
    }
    const encryp_data = window.btoa(JSON.stringify(data));
    if (encryp_data) {
      sessionStorage.setItem('data', encryp_data);
    }
  }

  /**
   *
   * @param accessToken set access token in sessionStorage
   */
  setAccessToken(accessToken: string) {
    const encryp_token = window.btoa(JSON.stringify(accessToken));
    sessionStorage.setItem('token', encryp_token);
  }

  /**
   * get access token from sessionStorage
   */
  getAccessToken() {
    let decryp_token;
    const token = sessionStorage.getItem('token');
    if (token != null) {
      decryp_token = JSON.parse(window.atob(token));
    }
    return decryp_token;
  }

  getDecryptedToken(token: string) {
    return token ? jwtDecode(token) : '';
  }

  getSignalSvg(signal: number) {
    let signalIcon = signal === 0 ?
      `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-wifi-off" viewBox="2 4 10 12">
                    <path d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"/>
                  </svg>` :
      signal === 1 ?
        `  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-wifi-1" viewBox="2 4 10 12">
                    <path d="M11.046 10.454c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.611-.091l.015-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.708-.707z"/>
                  </svg>` :
        signal < 31 ?
          `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-wifi-2" viewBox="2 4 10 12">
                  <path d="M13.229 8.271c.216-.216.194-.578-.063-.745A9.456 9.456 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.577 1.336c.205.132.48.108.652-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.408.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.611-.091l.015-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .708 0l.707-.707z"/>
                </svg>` :
          signal < 52 ?
            `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-wifi" viewBox="2 4 10 12">
                  <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"/>
                  <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
                </svg>` :
            signal === 99 ?
              `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-reception-0" viewBox="2 4 10 12">
                  <path d="M0 13.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                </svg> `: '';
    return signalIcon;
  }

  getInfoWindowContent(locationData: { latitude: any; longitude: any; time: { toLocaleString: (arg0: undefined, arg1: { year: string; month: string; day: string; hour: string; hour12: boolean; minute: string; second: string; }) => any; }; sensors: string | any[]; }, bat: any, batValue: any, signal?: any, isBlutag?: any, data?: any) {
    let content = '';
    if (signal) {
      let signalIcon = this.getSignalSvg(signal);
      content = '<b>' + '<table>' +
        '<tr>' +
        '<td>' + 'Lat.' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.latitude}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Long.' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.longitude}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Time' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.time.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' })}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Battery' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${bat} ${batValue}%` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Signal' + '</td>' +
        '<td>' + '<b>' + `&nbsp;&nbsp ${signalIcon}${signal}` + '</b>' + ` ` + '</td>' +
        '</tr>' +
        '</table>' + '</b>'
    } else {
      content = '<b>' + '<table>' +
        '<tr>' +
        '<td>' + 'Lat.' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.latitude}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Long.' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.longitude}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Time' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.time.toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' })}` + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + 'Battery' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${bat} ${batValue}%` + '</td>' +
        '</tr>' +
        '</table>' + '</b>';
    }
    if (locationData.sensors && locationData.sensors.length) {
      let part1 = content ? content.split('</table>')[0] : '';
      let part2 = '<b>' + '<tr>' +
        '<td>' + 'BluTags:' + '</td>' +
        '<td>' + `&nbsp;&nbsp ${locationData.sensors[0].tag}, ${locationData.sensors[0].temperature}` + '</td>' +
        '</tr>';
      content = part1;
      content = content.concat(part2);
      for (let i = 1; i < locationData.sensors.length; i++) {
        const part3 = '<tr>' +
          '<td>' + '' + '</td>' +
          '<td>' + `&nbsp;&nbsp ${locationData.sensors[i].tag}, ${locationData.sensors[i].temperature}` + '</td>' + '</tr>';
        content = content.concat(part3);
      }
      let part4 = '</table>' + '</b>';
      content = content.concat(part4);
    }
    return content;
  }

  logout(msg?: string) {
    const { user } = this.getCurrentUserData();
    const browserName = getBrowserName();
    const ipAddress = user?.ipAddress ? user?.ipAddress : extractIpString();
    if (msg) { this.toastr.warning(msg, ' ', { timeOut: 3000 }); }
    this.authService.doLogout({ email: user.officialEmail }, ipAddress, browserName).subscribe(() => {
      this.doLogout();
    }, (e: HttpErrorResponse) => {
      this.doLogout();
    })
  }

  doLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('user');
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
    this.router.navigate(['/login']);
  }

  /**
   * @description reset current user token
   */
  resetToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
      sessionStorage.removeItem('token');
    }
  }

  public parseEventPayload(eventPayload: any): any {
    // s_id:c0a2,gps:33.89039,-117.96370,bat:3.60V#040c138727834,+26.225#040c138727835,+26.226 // SAMPLE PAYLOAD DATA
    // "s_id:000000f0f041,gps:33.89037,-117.96360,bat:3.90V,TH:32,30" payload data with battery // SAMPLE PAYLOAD DATA
    const arr = eventPayload.split("#");
    if (arr.length >= 1) {
      const trackerData = arr[0];
      const blueTagsData = arr.slice(1, arr.length);
      // SHIPMENT ID
      const shipmentId = trackerData.substring(trackerData.indexOf('s_id:') + 5, trackerData.indexOf(','));
      // LOCATION WITH LATITUDE AND LONGITUDE
      const latitudeAndLongitude = trackerData.match(/gps:/g) && !(trackerData.match(/gps:N/g))
        ? trackerData.substring(trackerData.indexOf('gps:') + 4, trackerData.match(/bat:/g) ? trackerData.indexOf(',bat:') : trackerData.length) : '';
      const latitude = latitudeAndLongitude ? latitudeAndLongitude.split(',')[0] : null;
      const longitude = latitudeAndLongitude ? latitudeAndLongitude.split(',')[1] : null;
      const location = latitude && longitude ? `${latitude || null},${longitude || null}` : 'N/A';

      // BATTERY
      const battery = trackerData.substring(trackerData.indexOf(',bat:') + 5, trackerData.length).split(',')[0];
      const batteryAlert = battery.split('V')[0] > 3.7 ? 'High' : battery.split('V')[0] > 3.5 ? 'Medium' : 'Low';
      
      // BLUE TAG (SENSORS) DATA
      const sensorData = blueTagsData;
      const tempAndHumidity = trackerData.match(/TH:/g) ? trackerData.substring(trackerData.indexOf(',TH:') + 4, trackerData.length) : []
      // These are temporary variables
      const sensorName = 'Tracker';
      const sensorType = 'BlueTag';
      const humidity = tempAndHumidity.length ? (tempAndHumidity?.split(',')[1]?.slice(0, 2) || '') : '';
      let temp = tempAndHumidity.length ? tempAndHumidity.split(',')[0] : '';
      const signal = trackerData.split(',RSSI:')[1] ? trackerData.split(',RSSI:')[1] : tempAndHumidity.length
        ? tempAndHumidity?.split(',')[1]?.split('RSSI:')[1] : null;
      const eventMessage = null;
      if (temp.includes('--')) 
        temp =  temp.slice(1);
    
      return { sensorName, sensorType, trackerData, sensorData, eventMessage, humidity, temp, latitude, longitude, location, battery, signal, batteryAlert };
    } else {
      return null;
    }
  }

  public parseEventPayloadOld(eventPayload: any): any {
    // Tracker#C#@#Tem & Hum:32173,34519;GPS:33.89042,-117.96366#
    const arr = eventPayload.split("#");
    if (arr.length >= 5) {
      const sensorName = arr[0];
      const sensorType = arr[1];
      const sensorData = arr[3];
      const eventMessage = arr[4];

      const humidityAndTemperature = sensorData.substring(sensorData.indexOf(':') + 1, sensorData.indexOf(';GPS:'));
      const humidity = humidityAndTemperature.split(',')[0] ? humidityAndTemperature.split(',')[0] : null;
      const temperature = humidityAndTemperature.split(',')[1] ? humidityAndTemperature.split(',')[1] : null;

      const latitudeAndLongitude = sensorData.substring(sensorData.indexOf(';GPS:') + 5, sensorData.length);
      const latitude = latitudeAndLongitude.split(',')[0];
      const longitude = latitudeAndLongitude.split(',')[1];
      const location = `${latitude},${longitude}`;
      const signal = sensorData.split(',RSSI:')[1] ? sensorData.split(',RSSI:')[1] : null;

      return { sensorName, sensorType, sensorData, eventMessage, humidity, temperature, latitude, longitude, location, signal };
    } else {
      return null;
    }
  }

  public playAudio(): void {
    const soundName = this.constantVariables.NOTIFICATION_SOUND;
    const audio = new Audio(soundName);
    audio.src = soundName;
    audio.autoplay = true;
    audio.load();
    audio.play();
  }
}
