export interface TenantSignup {
  firstname:string;
  lastname:string
  tenantName: string;
  contactPersonName: string;
  accountType: string;
  tenantEmail: string;
  contactNumber: string;
  tenantEmpSize: string; 
  address: string;
  city: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
  country: string;
  tryforFee: boolean;
  BuyNow: boolean;
  enableSms: boolean;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
  sendEmailAlerts: boolean;
  reportType: string;
  sendDailyReport: boolean;
}
