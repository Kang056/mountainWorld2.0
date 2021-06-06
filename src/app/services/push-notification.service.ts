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
export class PushNotificationService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 查所有DeviceGroup
  getAllPushNotification(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/customerApis/${id}`,
      callHeaders()
    );
  }

  // 新增DeviceGroup
  addPushNotification(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/customerApis',
      data,
      callHeaders()
    );
  }

  // 刪除DeviceGroup
  deletePushNotification(id): Observable<any> {
    return this.httpClient.delete(
      this.baseUrl + `/api/v2/customerApis/${id}`,
      callHeaders()
    );
  }
}
