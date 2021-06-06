import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
export class ResponseService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
  private baseUrl = environment.apiUrl;

  isServerWork(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/api/v1/serverStatus`);
  }

  whatTypeOfResponse(error) {
    localStorage.setItem(`error${new Date()}`, JSON.stringify(error));
    let data;
    switch (error?.type) {
      case 1: // 表單錯誤 invalidParamList: [{ fieldName:"", reason:"" }, {...} ]
        data = this.formValidate(error);
        break;
      case 2: // 商業邏輯錯誤 messageList: [""]
        data = this.businessValidate(error);
        break;
      case 3: // 未知錯誤 message: ""
        data = this.unKnow(error);
        break;
      default:
        // 未定義
        this.accident();
        break;
    }
    return data;
  }

  formValidate(error: any) {
    return error.invalidParamList;
  }

  businessValidate(error: any) {
    // 商業邏輯錯誤 messageList: [""]
    error.messageList.map((item) => {
      this.toastr.error(item);
    });
    return false;
  }

  unKnow(error: any) {
    // 未知錯誤 message: ""
    this.toastr.error(error.title);
    // this.toastr.error(error.message);
    console.log(`%c ${error.message}`, 'color:red;');
    // this.router.navigate(['account/maintenance']);
    return false;
  }

  accident() {
    console.log('???在type1~3外的錯誤');
    this.isServerWork().subscribe(
      (response) => {
        // this.toastr.error((errObj));
        console.log('不要看了，伺服器活著');
      },
      (error) => {
        // this.router.navigate(['account/maintenance']); // 前往系統維修頁面
        console.log('e04，沒有伺服器');
      }
    );
  }

  showMessage(mes: string = '') {
    this.toastr.info(mes);
  }

  clearMessage() {
    this.toastr.clear();
  }
}
