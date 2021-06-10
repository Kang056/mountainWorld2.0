import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs'; // websocket
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  // public receivedMessages: string[] = [];
  private topicSubscription: Subscription;
  isCallSocket = false;

  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  constructor(
    private rxStompService: RxStompService, // websocket
    private translate: TranslateService
  ) {}







  ngOnInit(): void  {

  }


}
