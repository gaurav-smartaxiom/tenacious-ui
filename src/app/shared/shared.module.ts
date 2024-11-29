import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonService } from './services/common/common.service';
import { AccessService } from './services/access/access.service';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { GlobalErrorHandlerService } from './services/global-error-handler/global-error-handler.service';
import { RequestCache } from './services/request-cache/request-cache.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AccessService,
    ApiService,
    AuthService,
    CommonService,
    GlobalErrorHandlerService,
    RequestCache
  ]
})
export class PublicPageModule { }
