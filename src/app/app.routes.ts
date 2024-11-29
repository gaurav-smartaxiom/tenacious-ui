import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { UserManualComponent } from './modules/user-manual/user-manual.component';

export const routes: Routes = [
    { path: '', /* canActivate: [loginGuard],*/ loadChildren: () => import('./modules/public-page/public-page.module')   
        .then(mod => mod.PublicPageModule) },
    { path: '', /* canActivate: [authGuard], */ loadChildren: () => import('./modules/layout/layout.module')
        .then(mod => mod.LayoutModule) },
    {path: 'user-manual', component: UserManualComponent }
];
