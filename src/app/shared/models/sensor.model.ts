import { ITracker } from './tracker.model';
import { SHIPMENT_TYPE, STATUS } from "./shipment.model";

export interface ISensor {
  id: string;
  assign: boolean;
  assignedAt: Date;
  assignedBy: string;
  lastScanTime: number;
  mac_addr: string;
  shipmentId?: string;
  trackerId?: string;
  min?: number;
  max?: number;
  nearByTrackers: string[];
  isRemoveSensor: boolean;
  inactive: boolean;
}

export interface ISensorResponse {
  completedAt: Date;
  createdAt: Date;
  createdBy: string;
  deliveryDate: Date;
  destinationLocation: string;
  id: string;
  pickupDate: Date;
  pickupLocation: string;
  s_id: string;
  shipmentDesc: string;
  shipmentName: string;
  shipmentType: SHIPMENT_TYPE;
  status: STATUS;
  trackers: ITracker[];
  startedAt: Date;
  updatedAt: Date;
  updatedBy: Date;
}
