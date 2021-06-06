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

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService,
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
  // call response service
  callResponseService(data: any, note = ''): void {
    console.log(note, data);
    this.responseService.whatTypeOfResponse(data);
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
          sessionStorage.setItem('token', response.token);
          this.addIdentity(response.token);
          form.value.remember ? localStorage.setItem('remberMe', JSON.stringify(loginData)) : localStorage.removeItem('remberMe');
        },
        (error) => {
          console.log(error);
          this.callResponseService(error.error);
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

        this.permissionWork(response.permissions);
        sessionStorage.setItem('user', JSON.stringify(response));
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
      case '[ADMIN_SUPERUSER]':
        pass = {
          aside: {
            dashboard: true,
            person: true,
            organization: true,
            company: true,
            role: true,
            permission: true,
            device: true,
            geofence: true,
            information: true,
            deviceModel: true,
            project: true,
            position: true,
            setup: true,
            pushNotification: true,
            tcApi: true,
          },
          person: {
            select: {
              company: true,
              enabled: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              freeze: true,
            },
            addBox: {
              companySelect: true,
            },
          },
          company: {
            select: {
              enabled: true,
            },
            button: {
              add: true,
              edit: true,
              freeze: true,
            },
          },
          role: {
            select: {
              company: true,
            },
            button: {
              add: true,
              edit: true,
            },
            addBox: {
              companySelect: true
            }
          },
          device: {
            select: {
              company: true,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              batch: true,
              health: true,
            },
            addBox: {
              companySelect: true
            }
          },
          pushNotification: {
            select: {
              company: true,
              project: true,
            },
            button: {
              add: true,
              remove: true,
            },
          },
          tcApi: {
            select: {
              company: true,
              project: true,
            },
            button: {
              add: true,
              remove: true,
            },
          },
          deviceModel: {
            button: {
              add: true,
              remove: true,
            },
          },
          project: {
            select: {
              company: true,
            },
            button: {
              add: true,
              remove: true,
            },
            addBox: {
              companySelect: true
            }
          },
          position: {
            select: {
              company: true,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
            },
            addBox: {
              companySelect: true
            }
          },
          geofence: {
            select: {
              company: true,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              batch: true,
            },
            addBox: {
              companySelect: true
            }
          },
          information: {
            select: {
              company: true,
              project: true,
              type: true
            },
            addBox: {
              companySelect: true
            }
          }
        };
        break;
      case '[MANAGER]':
        pass = {
          aside: {
            dashboard: true,
            position: true,
            project: true,
            device: true,
            geofence: true,
            // information: true,
            person: true,
            // organization: true,
            // role: true,
          },
          project: {
            select: {
              company: false,
            },
            button: {
              add: true,
              remove: true,
            },
          },
          position: {
            select: {
              company: false,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
            },
          },
          geofence: {
            select: {
              company: false,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              batch: true,
            },
          },
          // information: {
          //   select: {
          //     project: true,
          //     type: true
          //   },
          // },
          person: {
            select: {
              enabled: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              freeze: true,
            },
          },
          device: {
            select: {
              company: false,
              project: true,
            },
            button: {
              add: true,
              edit: true,
              remove: true,
              batch: true,
            },
          },
          // role: {
          //   select: {
          //     company: false,
          //   },
          //   button: {
          //     add: true,
          //     edit: true,
          //   },
          // },
        };
        break;
      default:
        pass = {
          aside: {
            dashboard: true,
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
