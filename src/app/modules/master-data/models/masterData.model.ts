export interface IMasterData {
  id: string;
  IMEI_number: number;
  SIM_number: string;
  client_id: string;
  mfg_name: string;
  communicationType?: string;
  model_name: string;
  sw_ver: string;
  boot_rom_ver: string;
  Firmware: string;
  timeStamp?: number;
}
