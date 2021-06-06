import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from './../../../../services/person.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData = JSON.parse(sessionStorage.getItem('user'));
  // @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.hideDropdownMenu();
  //   }
  // }

  constructor(
    // private elementRef: ElementRef,
    private personService: PersonService,
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
          this.personService.editPerson(JSON.parse(sessionStorage.getItem('user')).user.id, editData)
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
  ngOnInit(): void {
    // this.user = this.appService.user;
  }

  // toggleDropdownMenu() {
  //   if (this.dropdownMenu.nativeElement.classList.contains('show')) {
  //     this.hideDropdownMenu();
  //   } else {
  //     this.showDropdownMenu();
  //   }
  // }

  // showDropdownMenu() {
  //   this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  // }

  // hideDropdownMenu() {
  //   this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  // }

  logout(): void  {
    sessionStorage.clear();
    this.router.navigate(['account']);
  }

}
