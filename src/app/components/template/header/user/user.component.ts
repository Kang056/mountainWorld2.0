import { AccountService } from './../../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData = JSON.parse(sessionStorage.getItem('user'));
  deadline = sessionStorage.getItem('tokenExpiration');
  timeinterval: any;
  time: any;
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  // 修改密碼
  changePassword(): void {
    const old = prompt('請輸入你的舊密碼', '');
    if (old) {
      const new1 = prompt('請輸入你的新密碼 ( 最少八碼 )', '');
      if (new1) {
        const new2 = prompt('請再次輸入你的新密碼 ( 最少八碼 )', '');
        if (new1 === new2) {
          // console.log('驗證正確');
          const formData = new FormData();
          formData.append('password', new1);
          const editData = {
            password: new1,
            enabled: this.userData.user.enabled,
            name: this.userData.user.name,
            roleIds: null,
          };
          this.accountService.editAccount(JSON.parse(sessionStorage.getItem('user')).user.id, editData)
          .subscribe(
            res => {
              alert('editPassword ok');
            },
            error => {
              console.log('editPassword ng', error.error);
              console.log('editData', editData);
            }
          );
        } else {
          console.log('二次密碼不同');
        }
      } else { alert('已取消'); }
    }
  }

  // 時間拆解
  getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {total, days, hours, minutes, seconds };
  }

  // 倒數計時
  initializeClock(endtime) {
    const endtimeClock = endtime;
    const the = this;
    function updateClock() {
      const time = the.getTimeRemaining(endtimeClock);
      the.time = {
        total: time.total,
        days: time.days,
        hours: ('0' + time.hours).slice(-2),
        minutes: ('0' + time.minutes).slice(-2),
        seconds: ('0' + time.seconds).slice(-2),
      };
      if (time.total <= 0) {
        clearInterval(this.timeinterval);
      }
    }
    updateClock();
    this.timeinterval = setInterval(updateClock, 1000);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['account']);
    clearInterval(this.timeinterval);
  }
  ngOnInit(): void {
    this.initializeClock(this.deadline);
  }


}
