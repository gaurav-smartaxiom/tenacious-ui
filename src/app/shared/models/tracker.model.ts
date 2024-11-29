import { ISensor } from './sensor.model';
export interface ITracker {
  _id: string;
  id: string;
  assignedAt: Date;
  assignedBy: string;
  currentHash: string;
  edgeName: string;
  freq: string;
  min?: string;
  max?: string;
  minH?: string;
  maxH?: string;
  index: number;
  isModified: number;
  previousHash: string;
  shipmentId: string;
  timestamp: number;
  data: ITrackerData;
  sensors?: ISensor[];
  isRemoveTracker: boolean;
  disabled?: boolean;
}

export interface ITrackerData {
  Firmware: number;
  active: boolean;
  blSerialNumber: string;
  boot_rom_ver: number;
  client_id: string;
  deviceUUID: string;
  genesisBlk: string;
  mac_addr: string;
  mfg_name: string;
  model_name: string;
  serial_number: string;
  sw_ver: number;
  token: string;
}
