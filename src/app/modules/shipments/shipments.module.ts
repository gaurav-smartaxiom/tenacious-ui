import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsRoutingModule } from './shipments-routing.module';
import { ShipmentsComponent } from './shipments/shipments.component';

@NgModule({
  declarations: [ShipmentsComponent],
  imports: [
    CommonModule,
    ShipmentsRoutingModule
  ]
})
export class ShipmentsModule { }
