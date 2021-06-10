import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  backResponse(error) {
    console.log(error);
    let data;
    switch (error?.error?.type) {
      case 1:
        data = this.formValidate(error?.error);
        break;
      case 2:
        data = this.businessValidate(error?.error);
        break;
      case 3:
        data = this.unKnow(error?.error);
        break;
      default:
        console.log('type error');
        this.toastr.error('系統異常type4');
        // this.router.navigate(['account/maintenance']);
        break;
    }
    return data;
  }

  formValidate(error) {
    // error?.invalidParamList.forEach(item => this.toastr.error(item.reason));
    return error.invalidParamList;
  }

  businessValidate(error) {
    error?.messageList.forEach(item => this.toastr.error(item));
    return false;
  }

  unKnow(error) {
    this.toastr.error(error?.title);
    // this.router.navigate(['account/maintenance']);
    return false;
  }
}
