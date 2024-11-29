import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { masterDataComponent } from './components/masterData/masterData.component';

const routes: Routes = [
  { path: '', component: masterDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class masterDataModule { }
