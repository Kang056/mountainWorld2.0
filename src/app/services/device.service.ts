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
export class DeviceService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得device
  getAllDevice(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/devices/projectId/${id}`,
      callHeaders()
    );
  }

  // 新增device
  addDevice(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/devices',
      data,
      callHeaders()
    );
  }

  // 批量新增device
  batchDevice(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/devices/saveFromTempImei',
      data,
      callHeaders()
    );
  }

  editDevice(id: number, data: any): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + `/api/v2/devices/${id}`,
      data,
      callHeaders()
    );
  }

  deleteDevice(id): Observable<any> {
    return this.httpClient.delete(
      this.baseUrl + `/api/v2/devices/${id}`,
      callHeaders()
    );
  }

  // device綁定person
  // bindDevice(data): Observable<any> {
  //   return this.httpClient.post(
  //     this.baseUrl + '/api/v2/devicePersons',
  //     data,
  //     callHeaders()
  //   );
  // }
}
