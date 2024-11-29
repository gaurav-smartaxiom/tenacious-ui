import { IPermission } from './side-nav.model';
export interface UserSignup {
  fullName: string;
  officialEmail: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  contactNumber: number;
  organizationName: string;
}

export interface IAccessLevel {
  action: boolean;
  createdBy: string;
  id: string;
  levelname: string;
  name: string;
  permissions: {
    [key: string]: IPermission
  };
  type: string;
  updatedBy: string;
}

export interface IUser {
  accesslevel: IAccessLevel;
  accountType: string;
  address: string;
  city: string;
  contactNumber: number;
  country: string;
  domainName: string;
  emailVerified: boolean;
  firstTimeLogin: boolean;
  fullName: string;
  id: string;
  ipAddress?: string;
  lastLogin: string;
  officialEmail: string;
  organizationName: string;
  password: string;
  roleId: string;
  state: string;
  token: string;
  userLevel: string;
  zipCode: string;
  enableSms: any;
  profilePicture?: string;
  passwordUpdatedAt?: number;
  defaultFrequency?: number;
  assignedShipments?: any;
  sendEmailAlerts?: boolean;
  sendDailyReport?: boolean;
  reportType? : string;
  enableNotificationSound:boolean;
  enableNotification:boolean
}

export interface IUserInfo {
  exp: number;
  iat: number;
  id: string;
  officialEmail: string;
  tenantName: string;
}