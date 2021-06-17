import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons.js';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';


import { AsideComponent } from './../../components/template/aside/aside.component';
import { HeaderComponent } from './../../components/template/header/header.component';
import { IndexLoadingComponent } from './../../components/index-loading/index-loading.component';
import { UserComponent } from './../../components/template/header/user/user.component';
import { MapComponent } from './map/map.component';
import { RulerComponent } from './ruler/ruler.component';
import { AccountComponent } from './account/account.component';
import { MountainComponent } from './mountain/mountain.component';

import { IndexButtonComponent } from './../../components/index-button/index-button.component';
import { OperatingBarComponent } from './../../components/operating-bar/operating-bar.component';
import { OverlayComponent } from './../../components/overlay/overlay.component';
import { HeadingComponent } from './../../components/heading/heading.component';
import { FreezeBoxComponent } from './../../components/freeze-box/freeze-box.component';
import { RemoveBoxComponent } from './../../components/remove-box/remove-box.component';
import { TableSortComponent } from './../../components/table-sort/table-sort.component';
import { ChartBoxComponent } from './../../components/chart-box/chart-box.component';

import { SafePipe } from './../../pipes/main.pipe';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
);

@NgModule({
  declarations: [
    IndexComponent,
    AsideComponent,
    HeaderComponent,
    IndexLoadingComponent,
    UserComponent,
    MapComponent,
    RulerComponent,
    AccountComponent,
    MountainComponent,

    IndexButtonComponent,
    OperatingBarComponent,
    OverlayComponent,
    HeadingComponent,
    FreezeBoxComponent,
    RemoveBoxComponent,
    TableSortComponent,
    ChartBoxComponent,

    SafePipe,
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
    NgxEchartsModule.forRoot({ echarts })
  ],
})
export class IndexModule {}
