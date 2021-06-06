import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

// const headers = new HttpHeaders({
//   Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//   'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
//   Pragma: 'no-cache',
//   Expires: '0',
// });

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = environment.apiUrl;

  // 取token
  login(data): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/login', data);
  }

  // 取使用者資料
  addIdentity(token): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(this.baseUrl + '/api/v2/persons/details', {
      headers,
    });
  }
}
