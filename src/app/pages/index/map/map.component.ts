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
  // error訊息
  errorName = '';
  errorDescription = '';
  errorType = '';
  getAllDatas: any;

  isLoading = false;

  selectData: any; // 點選到的getAll單筆資料


  titles = []; // 主表格表頭

  gpxDatas: any;


  // 健康資訊
  healthData: any;
  constructor(
    private mountainService: MountainService,
    private responseService: ResponseService,
    private ngZone: NgZone,
  ) {}
  // call response service
  callResponseService(data: any, note = ''): void {
    const err = this.responseService.whatTypeOfResponse(data);
    if (err) {
      err.map((item) => {
        const names = ['name', 'description', 'type'];
        names.map((log) => {
          if (item.fieldName === log) {
            eval(`this.error${this.caps(log)} += '${item.reason}';`);
          }
        });
      });
    } else {
      console.log(note, data);
    }
  }


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
        this.callResponseService(error.error);
        this.getAllDatas = null;
        this.datas = [];
      }
    );
    this.isLoading = false;
  }


  getGPX(elevation){
    if (elevation === '3952' || elevation === '3886' || elevation === '3560' || elevation === '3496' || elevation === '3492') {
      const xhr = new XMLHttpRequest();
      xhr.onload =  () => {
        const gpx = new gpxParser();
        gpx.parse(xhr.response);
        const totalDistance = gpx.tracks[0].distance.total; // 總距離
        const points = gpx.tracks[0].points;
        const geoJSON = gpx.toGeoJSON();
        // console.log('gpx', gpx);
        console.log('points', points);
        // console.log('points', gpx.tracks[0].points);
        // console.log('totalDistance', totalDistance);
        // console.log('geoJSON', geoJSON);
        // console.log(geoJSON.features[0].geometry.coordinates);
        (window as any).drawRecordMark(points);
      };
      xhr.open('get', `assets/gpxs/${elevation}.gpx`, true);
      xhr.send(null);
    }
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
  caps(str: string) {
    // 轉大寫
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  ngOnInit(): void {
    this.mapInit();
    this.getAllMountain();
    // tslint:disable-next-line: no-string-literal
    window['getGPX'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (elevation) => (this.getGPX(elevation)),
    };
  }

  ngOnDestroy(): void {
    (window as any).resetOpenStreeMap();
  }

}
