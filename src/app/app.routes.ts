import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './auth/auth-guard';
import { List } from './list/list';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'list', component: List, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];
