import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: 'master-data',/* canActivate: [authGuard],*/ loadChildren: () => import('../master-data/masterData.module')
        .then(mod => mod.MasterDataModule) },  
      { path: 'dashboard',/* canActivate: [authGuard],*/ loadChildren: () => import('../dashboard/dashboard.module')
        .then(mod => mod.DashboardModule) },  
    { path: 'shipments', /* canActivate: [authGuard], */ loadChildren: () => import('../shipments/shipments.module')
        .then(mod => mod.ShipmentsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
