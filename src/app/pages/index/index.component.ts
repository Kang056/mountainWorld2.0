import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public sidebarMenuOpened = true;
  @ViewChild('contentWrapper', { static: false }) contentWrapper;
  time: number;
  constructor(private router: Router, private renderer: Renderer2) {}

  // token時效驗證
  tokenVerification(): void {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null) {
      // console.log('sessionStorage沒有token');
      this.router.navigate(['/account']);
      sessionStorage.clear();
    } else {
      // 當前系統時間
      const endTime = new Date(sessionStorage.getItem('tokenExpiration'));
      const nowTime = new Date();
      this.time = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000);
      const clock = setInterval(() => {
        if (this.time > 1) {
          // console.log('尚未過期尚未過期', this.time);
          this.time--;
        } else {
          // console.log('已過期', this.time);
          this.time = null;
          clearInterval(clock);
          this.router.navigate(['/account']);
          sessionStorage.clear();
        }
      }, 1000);
    }
  }

  ngOnInit(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
    this.tokenVerification();
  }

  mainSidebarHeight(height): void {
    this.renderer.setStyle(
      this.contentWrapper.nativeElement,
      'min-height',
      height - 114 + 'px'
    );
  }

  toggleMenuSidebar(): void {
    if (this.sidebarMenuOpened) {
      console.log('collapse');
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      console.log('open');
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }
}
