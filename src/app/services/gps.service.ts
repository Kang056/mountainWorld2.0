import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

function callHeaders() {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0',
  });
  const options = { headers };
  return options;
}

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得一個專案device最新定位資訊
  getAllRecord(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/deviceLastestGps/projectId/${id}`,
      callHeaders()
    );
  }

  // 取得device一段時間的歷史定位紀錄
  getRecord(id, start, end): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v1/gps/${id}?satrtTime=${start}&endTime=${end}`,
      callHeaders()
    );
  }
}
