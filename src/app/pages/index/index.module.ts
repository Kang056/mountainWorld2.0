import { CsvComponent } from './../../components/csv/csv.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';





import { AsideComponent } from './../../components/template/aside/aside.component';
import { HeaderComponent } from './../../components/template/header/header.component';
import { IndexLoadingComponent } from './../../components/index-loading/index-loading.component';
import { UserComponent } from './../../components/template/header/user/user.component';


import { IndexButtonComponent } from './../../components/index-button/index-button.component';
import { OperatingBarComponent } from './../../components/operating-bar/operating-bar.component';
import { OverlayComponent } from './../../components/overlay/overlay.component';
import { HeadingComponent } from './../../components/heading/heading.component';
import { FreezeBoxComponent } from './../../components/freeze-box/freeze-box.component';
import { RemoveBoxComponent } from './../../components/remove-box/remove-box.component';
import { TableSortComponent } from './../../components/table-sort/table-sort.component';

import { SafePipe } from './../../pipes/main.pipe';
import { MapComponent } from './map/map.component';
import { RulerComponent } from './ruler/ruler.component';
import { AccountComponent } from './account/account.component';
import { MountainComponent } from './mountain/mountain.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    IndexComponent,

    // DeviceComponent,
    // ProjectComponent,
    // PaginationComponent,
    // DeformedTableComponent,
    CsvComponent,

    AsideComponent,
    HeaderComponent,
    IndexLoadingComponent,
    // MessageComponent,
    // NotificationComponent,
    UserComponent,

    IndexButtonComponent,
    OperatingBarComponent,
    OverlayComponent,
    HeadingComponent,
    FreezeBoxComponent,
    RemoveBoxComponent,
    TableSortComponent,
    // HealthComponent,
    // BatchBindGeofenceComponent,
    // BatchBindHealthComponent,


    SafePipe,


    MapComponent,
    RulerComponent,
    AccountComponent,
    MountainComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class IndexModule {}
