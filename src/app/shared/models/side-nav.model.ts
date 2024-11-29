export enum Menu_Path {
  'End Point Management' = '/end-point-management',
  'Provisioning Queue' = '/provisioning-queue',
  'Dashboard' = '/dashboard',
  'Reports' = '/reports',
  'Edge Management' = '/edge-management',
  'Utility' = '/utility',
  'Access Control' = '/access-control',
  'Shipments' = '/shipments',
  'Master Data' = '/master-data'
}

export interface IMenu {
  name: string;
  path: string;
  submenu?: IMenu[];
  isOpen?: boolean;
}

export interface IPermission {
  action: boolean;
  create: boolean;
  delete: boolean;
  name: string;
  submenu?: {
    [key: string]: IPermission;
  };
  update: boolean;
  view: boolean;
}

export interface INotification {
  senderId?: string,
  receiverId: string,
  shipmentId?: string,
  blockTrackerToken?: string,
  type: string,
  subject?: string,
  message: string,
  dateTime: Date,
  readStatus?: boolean,
  id: string
}

export interface INotifiactionAction {
  type: 'Update' | 'Delete',
  notification: INotification,
  isOpenViewModal: boolean,
  shipmentId: string
}