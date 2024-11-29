import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { IMasterData } from '../../models/masterData.model';
import { MasterDataService } from '../../services/masterData.service';
import { CommonService } from '../../../../shared/services/common/common.service';
import { API_ERROR } from '../../../../core/constants/global-error.constants';
import { DashboardService } from '../../../../shared/services/dashboard/dashboard.service';
import { EndPointService } from '../../../../shared/services/end-point/end-point.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './masterData.component.html',
  styleUrls: ['./masterData.component.scss']
})
export class masterDataComponent implements OnInit, OnDestroy {

  showPanel: boolean = false;
  isLoading: boolean = false;
  isopenSearch: boolean = false;
  masterData: any;
  selectedMaster: { id: string, IMEI_number: any; SIM_number: any; client_id: any; mfg_name: any; model_name: any; sw_ver: any; boot_rom_ver: any; Firmware: any; } | null = null;
  user: any;
  masterForm!: FormGroup;
  tenantsList = [];
  pdfResult: File | any;


  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private masterDataService: MasterDataService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private dashboardService: DashboardService,
    private endPointService: EndPointService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    const { user } = this.commonService.getCurrentUserData();
    this.user = user.organizationName;
    this.getMasterData();    
    this.getTenantList();    
    if (user) {
      const socketConnectionId = user.token + new Date().getTime();
      this.dashboardService.connectSocket(socketConnectionId);
      this.dashboardService.getNotificationData();
    }
  }

  ngOnDestroy(): void {
    this.dashboardService.disconnectSocket();
  }

  getMasterData() {
    this.masterDataService.getAllMasterKeys(this.user).subscribe((data: any) => {
      this.masterData = data.items;
      this.isLoading = false;
    }, error => {
      if (error?.message === API_ERROR.USER_LOGOUT) {
        this.commonService.logout(API_ERROR.USER_LOGOUT);
      }
    });
  }

  getTenantList() {
    this.masterDataService.getAllTenantList().subscribe(res => {
      this.tenantsList = res.data;
    })
  }

  addUpdateData(masterData?: {id: string, IMEI_number: any; SIM_number: any; client_id: any; mfg_name: any; model_name: any; sw_ver: any; boot_rom_ver: any; Firmware: any; } | null) {
    this.selectedMaster = masterData ? masterData : null;
    this.showPanel = true;
    this.masterForm = this.formBuilder.group({
      IMEI_number: [masterData ? masterData.IMEI_number : '', Validators.required],
      SIM_number: [masterData ? masterData.SIM_number : '', Validators.required],
      client_id: [masterData ? masterData.client_id : '', Validators.required],
      mfg_name: [masterData ? masterData.mfg_name : 'SmartAxiom,Inc'],
      model_name: [masterData ? masterData.model_name : 'BlockTracker'],
      sw_ver: [masterData ? masterData.sw_ver : '1.01'],
      boot_rom_ver: [masterData ? masterData.boot_rom_ver : '1.01'],
      Firmware: [masterData ? masterData.Firmware : '1.01'],
      file: ['']
    })
  }

  closePanel() {
    this.showPanel = false;
    this.selectedMaster = null;
    this.pdfResult = null;
    this.masterForm.reset();
  }

  saveMaster() {
    const eventMaster = this.selectedMaster ?
      this.masterDataService.updateMasterKeys(this.selectedMaster?.id, this.masterForm.value, this.pdfResult) : this.masterDataService.addmasterKeys(this.masterForm.value, this.pdfResult);
    eventMaster.subscribe(data => {
      this.getMasterData();
      this.toastr.success(this.selectedMaster ? 'Updated Successfully' : 'Added Successfully', '', { timeOut: 3000 });
      this.closePanel();
    },(error) => {
      if (error?.message === API_ERROR.USER_LOGOUT) {
        this.commonService.logout(API_ERROR.USER_LOGOUT);
      } else {
        this.toastr.error(error?.message ? error.message : 'something went wrong please try again', '', { timeOut: 3000 });
      }
    })
  }

  opendeleteModal(master: IMasterData) {
    this.confirmationService.confirm({
      message: `Delete Master Key with IMEI Number ${master.IMEI_number}`,
      header: `Delete Master Key`,
      acceptButtonStyleClass: 'p-button-outlined p-button-danger',
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
      accept: () => {
        this.masterDataService.deletemasterKeys(master?.id).subscribe({
          next: () => {
              this.getMasterData();
              
            },
          error: (error) => {
              if (error?.message === API_ERROR.USER_LOGOUT) {
                this.commonService.logout(API_ERROR.USER_LOGOUT);
              }
            },
          complete: () => {
            this.toastr.success(' Deleted Successfully', ' ', {
              timeOut: 3000
            });
          }
      })}
    });
  }

  downloadCallibration(uuid: string) {
    this.endPointService.getCalibrationCertificate(uuid).subscribe((data: Blob) => {
      this.pdfPreview(data);
    }, error => {
      if (error?.message !== API_ERROR.USER_LOGOUT) {
        this.toastr.error(`${uuid} certificate unable to retrieve at this moment. Please try again`, '', { timeOut: 3000 });
      }
    })
  }

  pdfPreview(data: Blob) {
    const file = new Blob([data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }

}
