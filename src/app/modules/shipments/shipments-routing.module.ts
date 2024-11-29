import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ReportShipmentComponent } from './components/report-shipment/report-shipment.component';

const routes: Routes = [
  { path: '', component: ShipmentsComponent},
  {path: 'report', component: ReportShipmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentsRoutingModule { }
