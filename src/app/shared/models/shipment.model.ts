import { ITracker } from './tracker.model';
export interface IShipment {
 
  id?: string;
  status?: string;
  shipmentName: string;
  shipmentDesc: string;
  shipmentType: string;
  pickupLocation: string;
  pickupDate: number;
  startedAt: number;
  destinationLocation: string;
  deliveryDate: number;
  customKeys?: {
    pickupPersonName: string;
  };
  trackers?: ITracker[];
  geofence_radius? : number;
  Favorite?:boolean
}

export enum STATUS {
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum SHIPMENT_TYPE {
  MOVABLE = 'Movable',
  FIXED = 'Fixed'
}

 export interface ShipmentResponse {
  id: string;
  shipmentName: string;
  shipmentDesc: string;
  shipmentType: string;
  status: string;
  Favorite: boolean; // Add the Favorite field here
  // Include any other fields that might be present in the response
}

