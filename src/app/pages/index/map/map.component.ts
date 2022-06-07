import { ChartBoxComponent } from './../../../components/chart-box/chart-box.component';
import { MountainService } from './../../../services/mountain.service';
import { ResponseService } from './../../../services/response.service';
import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { OperatingBarComponent } from './../../../components/operating-bar/operating-bar.component';
import gpxParser from 'gpxparser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  userData = JSON.parse(sessionStorage.getItem('user'));
  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  pageName = 'map'; // 分頁主標題
  lightBox = ''; // 燈箱開關
  datas: any; // 主表格資料 某公司某專案的裝置資訊
  @ViewChild('operatingBar') operatingBar: OperatingBarComponent; // 操作區id
  @ViewChild('chartBox') chartBox: ChartBoxComponent; // 操作區id
  // error訊息
  errorName = '';
  errorDescription = '';
  errorType = '';
  getAllDatas: any;

  isLoading = false;

  selectData: any; // 點選到的getAll單筆資料

  titles = []; // 主表格表頭

  gpxDatas: any;

  points: any;
  // 健康資訊
  healthData: any;
  constructor(
    private mountainService: MountainService,
    private responseService: ResponseService,
    private ngZone: NgZone,
  ) {}



  // 開啟燈箱
  selected(data: any, ligthBoxType: string): void {
    console.log('data', data, 'ligthBoxType', ligthBoxType);
    this.selectData = data;
    this.lightBox = ligthBoxType;
  }

  // 關閉燈箱
  lightBoxClose(): void {
    this.lightBox = '';
    this.errorReset();
  }


  // 資料整理
  datasWork(): void {
    this.shapeRemove();
    this.datas = this.operatingBar.datasSearch(this.getAllDatas);
    this.drawMark(this.datas);
  }

  shapeRemove(): void {
    (window as any).shapeRemove();
  }

  // 定位標記
  drawMark(data): void {
    // console.log(data[0]);
    data.forEach(item => {
      (window as any).drawMarker(item);
    });
    // if (data[0]?.latitude) {
    //   (window as any).drawMarker(data[0]);
    // }
  }
  // 表格健值清單
  titlesWork(): void {
    for (const [key] of Object.entries(this.getAllDatas[0])) {
      this.titles.push(key);
    }
  }

  getAllMountain(): void {
    this.isLoading = true;
    this.shapeRemove();
    this.mountainService.getAllMountain().subscribe(
      (response) => {
        console.log('getAll', response);
        this.getAllDatas = response;
        this.getAllDatas.map((item, idx) => {
          item.number = idx + 1;
        });
        if (this.getAllDatas?.length > 0) {
          this.titlesWork();
        }
        this.datasWork();
      },
      (error) => {
        this.errorWork(error);
        this.getAllDatas = null;
        this.datas = [];
      }
    );
    this.isLoading = false;
  }


  getGPX(elevation){
    const xhr = new XMLHttpRequest();
    xhr.onload =  () => {
      const gpx = new gpxParser();
      gpx.parse(xhr.response);
      const totalDistance = gpx.tracks[0].distance.total; // 總距離
      this.points = gpx.tracks[0].points;
      const geoJSON = gpx.toGeoJSON();
      // console.log('gpx', gpx);
      console.log('points', this.points);
      // console.log('points', gpx.tracks[0].points);
      // console.log('totalDistance', totalDistance);
      // console.log('geoJSON', geoJSON);
      // console.log(geoJSON.features[0].geometry.coordinates);
      (window as any).drawRecordMark(this.points);
    };
    xhr.open('get', `assets/gpxs/${elevation}.gpx`, true);
    xhr.send(null);
  }


  elevationChart(elevation) {
    console.log(this.points);
    this.lightBox = 'chartBox';
    this.chartBox.chartWork(this.points);
  }

  mapInit(): void {
    (window as any).mapInit();
  }


  compareFn() {
    return 0;
  }

  errorReset(): void {
    this.errorName = '';
    this.errorDescription = '';
    this.errorType = '';
  }

  errorWork(error): void {
    const err = this.responseService.backResponse(error);
    if (err) {
      err.forEach((item) => {
        if (item.fieldName === 'name') {
          this.errorName += ` ${item.reason}`;
        }
        if (item.fieldName === 'detail') {
          this.errorDescription += ` ${item.reason}`;
        }
        if (item.fieldName === 'permissionIds') {
          this.errorType += ` ${item.reason}`;
        }
      });
    } else {
      console.log('表單沒錯', err);
    }
  }
  //git6
  ngOnInit(): void {
    this.mapInit();
    this.getAllMountain();
    // tslint:disable-next-line: no-string-literal
    window['getGPX'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (elevation) => (this.getGPX(elevation)),
    };
    // tslint:disable-next-line: no-string-literal
    window['elevation'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (elevation) => (this.elevationChart(elevation)),
    };
  }

  ngOnDestroy(): void {
    (window as any).resetOpenStreeMap();
  }
// git test2
}
