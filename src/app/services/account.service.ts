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
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {}

  // 預設環境路由
  private baseUrl: string = environment.apiUrl;

  // 取得所有權限
  getAllAccount(): Observable<any> {
    return this.httpClient.get(
      `http://127.0.0.1/sqlTest/account.php`,
    );
  }
  // 新增帳號
  addAccount(data): Observable<any> {
    return this.httpClient.post(
      'http://127.0.0.1/sqlTest/account.php', data,
    );
  }

  // 修改帳號
  editAccount(data): Observable<any> {
    return this.httpClient.put(
      `http://127.0.0.1/sqlTest/account.php`, data,
    );
  }

  // 刪除帳號
  deleteAccount(data): Observable<any> {
    return this.httpClient.post(
      `http://127.0.0.1/sqlTest/accountDel.php`, data,
    );
  }
}
