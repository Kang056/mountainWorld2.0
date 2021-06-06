import { MountainComponent } from './mountain/mountain.component';
import { AccountComponent } from './account/account.component';
import { RulerComponent } from './ruler/ruler.component';
import { MapComponent } from './map/map.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../helpers/auth.guard';

import { IndexComponent } from './index.component';



const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'map', component: MapComponent },
      { path: 'ruler', component: RulerComponent },
      { path: 'account', component: AccountComponent },
      { path: 'mountain', component: MountainComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class IndexRoutingModule {}
