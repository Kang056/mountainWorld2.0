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
export class GeofenceService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得電子圍籬
  getAllGeofence(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/fence/projectId/${id}`,
      callHeaders()
    );
  }

  // 新增電子圍籬
  addGeofence(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/fence',
      data,
      callHeaders()
    );
  }

  // 修改帳號
  editGeofence(id, data): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + `/api/v2/fence/${id}`,
      data,
      callHeaders()
    );
  }

  // 刪除帳號
  deleteGeofence(id): Observable<any> {
    return this.httpClient.delete(
      this.baseUrl + `/api/v2/fence/${id}`,
      callHeaders()
    );
  }

  // 綁定圍籬
  bindGeofence(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/fenceDevice',
      data,
      callHeaders()
    );
  }

  // 取得device的圍籬
  getDeviceGeofence(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/fenceDevice/deviceId/${id}`,
      callHeaders()
    );
  }
}
