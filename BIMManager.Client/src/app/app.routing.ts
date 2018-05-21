import { Route } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { PublicGuard } from './guards/public.guard';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
  {
    path: 'project',
    canActivate: [AuthGuard],
    loadChildren: 'app/modules/project/project.module#ProjectModule'
  },
  {
    path: 'complex',
    canActivate: [AuthGuard],
    loadChildren: 'app/modules/complex/complex.module#ComplexModule'
  }
];
