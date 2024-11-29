import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { PublicPageRoutingModule } from './public-page-routing.module';

@NgModule({
  declarations: [PublicPageComponent],
  imports: [RouterOutlet, PublicPageRoutingModule],
})
export class PublicPageModule { }
