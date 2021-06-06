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
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得所有公司
  getAllCompany(): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + '/api/v2/companys',
      callHeaders()
    );
  }

  // 新增公司
  addCompany(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/companys/',
      data,
      callHeaders()
    );
  }

  // 修改公司
  editCompany(id, data): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + `/api/v2/companys/${id}`,
      data,
      callHeaders()
    );
  }
}
