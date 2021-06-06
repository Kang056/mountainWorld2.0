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
export class PersonService {
  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得該公司(正常/凍結)所有帳號
  getAllPerson(id, enabled): Observable<any> {
    return this.httpClient.get(
      this.baseUrl + `/api/v2/persons/?companyId=${id}&enabled=${enabled}`,
      callHeaders()
    );
  }

  // 新增帳號
  addPerson(data): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/api/v2/persons',
      data,
      callHeaders()
    );
  }

  // 修改帳號
  editPerson(id, data): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + `/api/v2/persons/${id}`,
      data,
      callHeaders()
    );
  }

  // 刪除帳號
  deletePerson(id): Observable<any> {
    return this.httpClient.delete(
      this.baseUrl + `/api/v2/persons/${id}`,
      callHeaders()
    );
  }
}
