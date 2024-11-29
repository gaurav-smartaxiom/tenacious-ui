import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public static URLs = {
    /**
     * Login API URLs
     */
    login: environment.host + '/api/v1/login',
    logout: environment.host + '/api/v1/logout',
    loginVerify: environment.host + '/api/v1/login/verify',
    adminSetup: environment.host + '/api/v1/signup',
    userSignup: environment.host + '/api/v1/tenant/user',
    userAssignShipment: environment.host + '/api/v1/tenant/assignShipment',
    tenantSignup:environment.host + '/api/v1/tenant',
    forgotPassword: environment.host + '/api/v1/forgot-password',
    resetPassword: environment.host + '/api/v1/forgot-password/reset-password',
    userManagement: environment.host + '/api/v1/users',
    getUserByToken: environment.host + '/api/v1/users/details',
    userMgmntUpdateUser: environment.host + '/api/v1/users/updateUser',
    editProfile: environment.host + '/api/v1/users',
    profileImage: environment.host + '/api/v1/users/getUserImage',
    resendLink: environment.host + '/api/v1/users/resendLink',
    getUIReleaseVersion: environment.host + '/api/v1/reports/commit-details',
    getBlReleaseVersion:environment.host+'/api/v1/blocklock-login/bl-commit-details',

    accessControl: environment.host + '/api/v1/access-control',
    edgeManagement: environment.host + '/api/v1/tracker/getEdgeDevice',
    edgeManagementStats: environment.host + '/api/v1/tracker/getEdgeDevice',
    updateEdgeManagement: environment.host + '/api/v1/tracker/updateEdgeChain',

    //shipments
    shipmentManagement: environment.host + '/api/v1/shipments',
    saveTracker: environment.host + '/api/v1/tracker/assign',
    sensors: environment.host + '/api/v1/sensors',
    scanSensors: environment.host + '/api/v1/sensors/scan',
    saveSensors: environment.host + '/api/v1/sensors/assign',
    configure: environment.host + '/api/v1/configure',

    //Master Data
    masterDataManagement: environment.host + '/api/v1/masterKeys',
    tenantsList: environment.host + '/api/v1/users/all-tenants',
    calibrationCertificate: environment.host + '/api/v1/masterKeys/certificate',

    //end-point-management
    endPointManagement: environment.host + '/api/v1/tracker',
    acti: environment.host + '/api/v1/tracker/update-end-point',
    updateEndPointManagement: environment.host + '/api/v1/tracker/update/null',
    activateEndPointManagement: environment.host + '/api/v1/tracker/assign/null',
    deleteEndPointManagement: environment.host + '/api/v1/tracker/delete/null',
    endPointManagementById: environment.host + '/api/v1/tracker/details',
    removeEndPointManagementById: environment.host + '/api/v1/tracker/remove',
    removeSensorsById: environment.host + '/api/v1/sensors/remove',
    getAllTrackerWithShipment: environment.host + '/api/v1/tracker/trackers-with-shipment',

    activateAllProvisions: environment.host + '/api/v1/tracker/activate-all-end-point',
    //counts
    getTotalDevices: environment.host + '/api/v1/tracker/count-end-point',
    getTotalProvisons: environment.host + '/api/v1/tracker/count-provison-end-point',
    getTotalBlocklock: environment.host + '/api/v1/tracker/count-edge-chain',
    getNewUsers : environment.host + '/api/v1/users/get-registered-user',
    getReportsCounts: environment.host + '/api/v1/reports/getCount',
    getReportsInfo: environment.host + '/api/v1/reports/getReportsInfo',

    //provisioning
    activateAllEndpoints: environment.host + '/api/v1/tracker/activate-all-end-point',
    activateAllEdges: environment.host + '/api/v1/tracker/activate-all-edge-devices',

    sysLogs: environment.host + '/api/v1/system-log',
    firstTimeLogin: environment.host + '/api/v1/login/setFirstTimeStatus',
    getUserById: environment.host + '/api/v1/users/getUserById',
    saveDevice: environment.host + '/api/v1/tracker',
    getDevices: environment.host + '/api/v1/tracker',
    deleteDevice: environment.host + '/api/v1/tracker',
    logicalGrp:environment.host + '/api/v1/logical-group',
    baseUrl: environment.host,

    //Event Managment
    eventManagement: environment.host + '/api/v1/data',
    eventAlert: environment.host + '/api/v1/data/alerts',
    /* Download Overall report */
    downloadOverallReport: environment.host + '/api/v1/data/downloadOverallReport',

    //User Chain
    getUserChain:environment.host + '/api/v1/users/getUserChain',
    getUserActionReport:environment.host + '/api/v1/users/userActionReport',

    //utility
    setTimezone:environment.host + '/api/v1/time-clock',

    //graphs
    getTotalEventByDuration: environment.host + '/api/v1/ledger/getEventByDuration',
    getSparklineGraph:  environment.host + '/api/v1/ledger/getSparkLineGraph',
    getTotalDevicesGraph: environment.host + '/api/v1/ledger/getDeviceGraphData',
    getAverageSensorGraph: environment.host + '/api/v1/ledger/getAvgEventBySensor',
    getSensorEvents : environment.host + '/api/v1/ledger/getSensorEvents',
    getNodeMap: environment.host + '/api/v1/node-map',

    //weather
    getWeather: environment.host + '/api/v1/weather',

    //broker node
    getBrokerNode:environment.host+'/api/v1/node-map/getBrokerNode',

    deleteSelected:environment.host+'/api/v1/access-control/DeleteSelected',
    getBluser: environment.host + '/api/v1/users/getBluser',

    // SHIPMENT
    getShipmentById: environment.host + '/api/v1/shipments',

    // Shipements
    getShipmentList: environment.host + '/api/v1/shipments',
  
    // SMART_CONTRACTS_MANAGEMENT
    smartContracts: environment.host + '/api/v1/smart-contract-management',

    //Location Alerts
    locationAlerts: environment.host + '/api/v1/locationAlerts',
    trackerAlertsData: environment.host + '/api/v1/locationAlerts/alertsData',
    notificationAlert: environment.host + '/api/v1/notification-alert',
    notifications: environment.host + '/api/v1/notifications',

    //Comments
    addComment: environment.host + '/api/v1/comments',
        
  }

}
