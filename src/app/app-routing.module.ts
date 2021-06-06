import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

// import { MainComponent } from './pages/main/main.component';
// import { BlankComponent } from './views/blank/blank.component';
// import { LoginComponent } from './pages/login/login.component';
// import { ProfileComponent } from './views/profile/profile.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { DashboardComponent } from './views/dashboard/dashboard.component';
// import { NonAuthGuard } from './utils/guards/non-auth.guard';


// const routes: Routes = [
//   {
//     path: '',
//     component: MainComponent,
//     canActivate: [AuthGuard],
//     canActivateChild: [AuthGuard],
//     children: [
//       {
//         path: 'profile',
//         component: ProfileComponent,
//       },
//       {
//         path: 'blank',
//         component: BlankComponent,
//       },
//       {
//         path: '',
//         component: DashboardComponent,
//       },
//     ],
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     canActivate: [NonAuthGuard],
//   },
//   {
//     path: 'register',
//     component: RegisterComponent,
//     canActivate: [NonAuthGuard],
//   },
//   { path: '**', redirectTo: '' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
//   exports: [RouterModule],
// })
const indexModule = () => import('./pages/index/index.module').then(x => x.IndexModule);
const accountModule = () => import('./pages/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: 'index', loadChildren: indexModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: 'account', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
