import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;                  // INSERT THIS LINE

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  // @ViewChild('mainSidebar', { static: false }) mainSidebar;
  // @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  // companyMenu = false;
  userData = JSON.parse(sessionStorage.getItem('user'));
  // permissions = JSON.parse(sessionStorage.getItem('user')).permissions;
  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  lang = 'zh';
  constructor(
    private translate: TranslateService
  ) {
    // 添加語言支持
    translate.addLangs(['en', 'zh']);
    // 設置默認語言，一般在無法匹配的時候使用
    translate.setDefaultLang(this.lang);
    // 獲取當前瀏覽器環境的語言比如en、 zh
    // let browserLang = null;
    translate.use(this.lang);
  }

  // siteBar(name) {
  //   switch (name){
  //     case 'company':
  //       this.companyMenu ? this.companyMenu = false : this.companyMenu = true;
  //       break;
  //     default:
  //       break;
  //   }
  // }


  // activeFunc() {
  //   $('li').removeClass('active current-page');
  //   const currentSelectedli = $('a.router-link-exact-active').parent('li');
  //   currentSelectedli.addClass('current-page');
  //   currentSelectedli.siblings().removeClass('active current-page');
  //   const parentLI = currentSelectedli.parent('ul').parent('li');
  //   if (parentLI.length !== 0){parentLI.addClass('active'); }
  // }
  // 切換語言
  changeLang(): void {
    if (this.lang === 'en') {
      this.translate.use('zh');
      this.lang = 'zh';
      sessionStorage.setItem('language', 'zh');
    } else {
      this.translate.use('en');
      this.lang = 'en';
      sessionStorage.setItem('language', 'en');
    }
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    // $('[data-widget="treeview"]').each(() => {
    //   AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    // });
  }

  // ngAfterViewInit(): void {
  //   this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  // }
}
