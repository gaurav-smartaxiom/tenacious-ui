import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule, LayoutRoutingModule, RouterOutlet,
  ]
})
export class LayoutModule { }
