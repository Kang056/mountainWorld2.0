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
export class HealthService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  getAllHealth(projectId: number, pageNumber: number): Observable<any> { // 🐇沒正式串API，我瞎編的
    return this.httpClient.get(this.baseUrl + `/healthData?projectId=${projectId}&page=${pageNumber}`);
  }
  getHealth(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/healthData?imei=' + data);
  }
  // 步數資訊
  steps(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/steps?imei=' + data);
  }
  // 心率資訊
  heartRates(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/heartRates?imei=' + data);
  }
  // 體溫資訊
  bodyTemperatures(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/bodyTemperature?imei=' + data);
  }
  // 電量資訊
  batterys(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/batterys?imei=' + data);
  }

  // 卡路里資訊 (尚無此資料)
  calories(id): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/calories/deviceId/${id}`
    );
  }
  // 血壓資訊
  bloodPressures(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/bloodPressures?imei=' + data);
  }
  // 睡眠資訊
  sleeps(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/sleeps?imei=' + data);
  }
  // 訊號資訊
  signals(data): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/signals?imei=' + data);
  }
}
