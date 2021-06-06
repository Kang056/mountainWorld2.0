import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs'; // websocket
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  // public receivedMessages: string[] = [];
  private topicSubscription: Subscription;
  isCallSocket = false;

  lang = JSON.parse(sessionStorage.getItem('user')).user.companyPo.language;
  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  constructor(
    private rxStompService: RxStompService, // websocket
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




  // websocket停止
  unsubscribe(): void  {
    if (this.isCallSocket) {
      this.topicSubscription.unsubscribe();
      this.isCallSocket = true;
      console.log(`%c 'socket燒毀🔥'`, 'color:yellow;');
    }
  }

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

  ngOnInit(): void  {

  }

  ngOnDestroy(): void  {
    this.unsubscribe();
  }

}
