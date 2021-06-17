import { DatePipe } from '@angular/common';
import { ResponseService } from './../../../services/response.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit, OnDestroy, Renderer2, AfterContentInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterContentInit {
  public isAuthLoading = false;
  token: string;
  rememberMe: any;
  lang = 'zh';
  isLoadind = false;
  endTime: any = this.datePipe.transform(new Date().getTime() + 24 * 60 * 60 * 1000, 'yyyy-MM-ddTHH:mm:ss');
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private responseService: ResponseService
  ) {
    // 添加語言支持
    translate.addLangs(['en', 'zh']);
    // 設置默認語言，一般在無法匹配的時候使用
    translate.setDefaultLang(this.lang);
    // 獲取當前瀏覽器環境的語言比如en、 zh
    // let browserLang = null;
    translate.use(this.lang);
  }



  selectClick(lang: any): void {
    console.log('lang', lang.form.value.language);
    this.lang = lang.form.value.language;
    this.translate.use(this.lang);
  }
  login(form): void {
    if (form.value.username && form.value.password) {
      this.isLoadind = true;
      const loginData = {
        username: form.value.username,
        password: form.value.password
      };
      this.loginService.login(loginData).subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('token', response.username);
          this.addIdentity(response.username);
          form.value.remember ? localStorage.setItem('remberMe', JSON.stringify(loginData)) : localStorage.removeItem('remberMe');
        },
        (error) => {
          console.log(error);
          this.isLoadind = false;
        }
      );
    } else {
      // this.toastr.success('Have fun storming the castle!', 'Miracle Max Says');
      this.toastr.error('未輸入帳密');
      this.isLoadind = false;
      // this.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
    }
  }

  // 以token取得登入者資訊
  addIdentity(token: string): void {
    this.loginService.addIdentity(token).subscribe(
      (response) => {
        console.log('userData', response);
        this.permissionWork(response[0]?.roleId);
        sessionStorage.setItem('user', JSON.stringify(response));
        sessionStorage.setItem('tokenExpiration', this.endTime);
        this.router.navigate(['index']);
        // this.isLoadind = false;
      },
      (error) => {
        // const errorData = (window as any).backResponse(error?.error);
        // console.log(errorData);
        this.router.navigate(['account/maintenance']);
        // this.isLoadind = false;
      }
    );
  }

  permissionWork(permissions: string): void {
    let pass = {};
    switch (permissions) {
      case '1':
        pass = {
          aside: {
            mountain: true,
            map: true,
            account: true,
            ruler: true,
          },
          account: {
            button: {
              add: true,
              edit: true,
              remove: true,
            },
          },
          mountain: {
            button: {
              add: true,
              edit: true,
              remove: true,
            },
          },
        };
        break;
      case '2':
        pass = {
          aside: {
            mountain: true,
            map: true,
            account: false,
            // ruler: true,
          },
          mountain: {
            button: {
              add: false,
              edit: false,
              remove: false,
            },
          },
        };
        break;
      default:
        pass = {
          aside: {
            mountain: true,
            map: true,
            account: false,
            // ruler: true,
          },
          mountain: {
            button: {
              add: false,
              edit: false,
              remove: false,
            },
          },
        };
        break;
    }
    sessionStorage.setItem('permissions', JSON.stringify(pass));
  }


  ngOnInit(): void {

    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    if (localStorage.getItem('remberMe')) {
      this.rememberMe = JSON.parse(localStorage.getItem('remberMe'));
    }
  }

  ngAfterContentInit() {

    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });

  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
