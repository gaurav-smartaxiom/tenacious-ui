import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { masterDataComponent } from './components/masterData/masterData.component';
import { masterDataModule } from './masterData-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [masterDataComponent],
  imports: [
    CommonModule,
    masterDataModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class MasterDataModule {

 }
