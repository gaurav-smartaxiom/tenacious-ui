import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    TableModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your API Key
    // }),
  ]
})
export class DashboardModule {
  
}
