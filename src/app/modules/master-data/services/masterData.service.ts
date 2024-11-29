import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IMasterData } from '../models/masterData.model';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  public pannel = new BehaviorSubject<{ openModel: boolean, masterKeysId: string }>({ openModel: false, masterKeysId: ''});
  public isOpenPanel = this.pannel.asObservable();

  constructor(private http: HttpClient) { }

  pannelEvent(data: { openModel: boolean, masterKeysId: string }) { this.pannel.next(data); }  

  getAllMasterKeys(org: string) {
    return this.http.get(`${ApiService.URLs.masterDataManagement}?org=${org}`);
  }

  deletemasterKeys(id: string) {
    return this.http.delete(`${ApiService.URLs.masterDataManagement}/${id}`);
  }

  updateMasterKeys(id: string, masterKeys: IMasterData, file: File | null) {
    const formData = new FormData();
    formData.append('IMEI_number', `${masterKeys.IMEI_number}`);
    formData.append('SIM_number', `${masterKeys.SIM_number}`);
    formData.append('client_id', `${masterKeys.client_id}`);
    formData.append('mfg_name', `${masterKeys.mfg_name}`);
    formData.append('model_name', `${masterKeys.model_name}`);
    formData.append('sw_ver', `${masterKeys.sw_ver}`);
    formData.append('boot_rom_ver', `${masterKeys.boot_rom_ver}`);
    formData.append('Firmware', `${masterKeys.Firmware}`);
    if (file) { formData.append('file', file, file.name); }
    return this.http.put<IMasterData>(`${ApiService.URLs.masterDataManagement}/${id}`, formData);
  }

  addmasterKeys(masterKeys: IMasterData, file: File | null) {
    const formData = new FormData();
    formData.append('IMEI_number', `${masterKeys.IMEI_number}`);
    formData.append('SIM_number', `${masterKeys.SIM_number}`);
    formData.append('client_id', `${masterKeys.client_id}`);
    formData.append('mfg_name', `${masterKeys.mfg_name}`);
    formData.append('model_name', `${masterKeys.model_name}`);
    formData.append('sw_ver', `${masterKeys.sw_ver}`);
    formData.append('boot_rom_ver', `${masterKeys.boot_rom_ver}`);
    formData.append('Firmware', `${masterKeys.Firmware}`);
    if (file) { formData.append('file', file, file.name); }
    return this.http.post<IMasterData>(ApiService.URLs.masterDataManagement, formData);
  }

  getAllTenantList() {
    return this.http.get<any>(ApiService.URLs.tenantsList);
  }
}

