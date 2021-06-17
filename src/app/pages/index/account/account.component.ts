import { AccountService } from './../../../services/account.service';
import { ResponseService } from './../../../services/response.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from './../../../services/role.service';
import { OperatingBarComponent } from './../../../components/operating-bar/operating-bar.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userData = JSON.parse(sessionStorage.getItem('user'));
  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  pageName = 'account'; // 分頁主標題
  lightBox = ''; // 燈箱開關
  titles = []; // 主表格表頭
  btns = {
    add: this.permissions?.account?.button?.add,
    edit: this.permissions?.account?.button?.edit,
    remove: this.permissions?.account?.button?.remove,
  }; // Operation欄位按鈕類型
  sortType = 'number'; // 排序項目
  sequence = true; // 排序形式 (true:升冪, false:降冪)
  datas: any; // 主表格資料
  @ViewChild('operatingBar') operatingBar: OperatingBarComponent; // 操作區id
  removes = { name: '', enabled: '' };
  rolesData: any; // 權限
  getAllDatas: any; // getAll回傳的原始資料
  selectData: any; // 點選到的getAll單筆資料
  selectRoles = []; // roleCheckBox


  // error訊息
  errorName = '';
  errorUsername = '';
  errorRole = '';

  constructor(
    private accountService: AccountService,
    private roleService: RoleService,
    private responseService: ResponseService
  ) {}

  // 燈箱開關
  selected(data: any, ligthBoxType: string): void {
    this.selectData = data;
    this.lightBox = ligthBoxType;
    if (ligthBoxType === 'remove') {
      this.removes.name = data.name;
      this.removes.enabled = data.enabled;
    }
    console.log('selected', data);
  }

  // 關閉燈箱
  lightBoxClose(): void {
    this.lightBox = '';
    this.errorReset();
  }



  // 排序
  setSort(setSortTypeData: any): void {
    this.sortType = setSortTypeData.key;
    this.sequence = setSortTypeData.sequence;
    this.datasWork();
  }

  // 排序作業
  datasSort(datas: any): void {
    const idx = this.titles.indexOf(this.sortType);
    if (this.sequence) {
      datas.sort((a, b) => {
        return Object.values(a)[idx] > Object.values(b)[idx] ? 1 : -1;
      });
    } else {
      datas.sort((a, b) => {
        return Object.values(a)[idx] < Object.values(b)[idx] ? 1 : -1;
      });
    }
    return datas;
  }

  // 資料整理
  datasWork(): void {
    // 篩選
    this.datas = this.operatingBar.datasSearch(this.getAllDatas);
    // 排序
    this.datas = this.datasSort(this.datas);
  }


  // checkbox表單送出前處理
  roleDataWork(datas) {
    const roleIds = [];
    for (const [key, value] of Object.entries(datas)) {
      if (key.indexOf('role') > -1) {
        if (value) {
          roleIds.push(Number(key.slice(4)));
        }
      }
    }
    return roleIds;
  }

  // checkBox表單顯示前處理
  checkBoxWork(): void {
    this.roleService.getAllRole().subscribe(
      (response) => {
        this.rolesData = response;
        this.rolesData.forEach((item) => {
          this.selectData.roles.map((data) => {
            if (data.id === item.id) {
              item.checkBoxType = true;
            }
          });
        });
        this.selectRoles = this.rolesData;
        console.log('this.selectRoles', this.selectRoles);
      },
      (error) => {
        this.errorWork(error);
      }
    );
  }
  // 表格健值清單
  titlesWork(): void {
    for (const [key] of Object.entries(this.getAllDatas[0])) {
      this.titles.push(key);
    }
  }
  // 取得所有
  getAllAccount(): void {
    this.accountService.getAllAccount().subscribe(
      (response) => {
        console.log('getAll', response);
        this.getAllDatas = response;
        this.getAllDatas = this.getAllDatas.filter(item => {
          return item.id !== 1 ? item : false;
        });
        this.getAllDatas.map((item, idx) => {
          item.number = idx + 1;
        });

        if (this.getAllDatas?.length > 0) {
          this.titlesWork();
        }
        this.datasWork();
      },
      (error) => {
        this.errorWork(error);
        this.getAllDatas = null;
        this.datas = [];
      }
    );
  }

  // 新增
  addAccount(form): void {
    this.errorReset();
    console.log(form.value);
    this.accountService.addAccount(form.value).subscribe(
      (response) => {
        console.log('add ok', response);
        this.getAllAccount();
        this.lightBox = '';
      },
      (error) => {
        console.log(error);
        this.errorWork(error);
      }
    );
  }

  // 修改
  editAccount(form): void {
    this.errorReset();
    form.value.id = this.selectData.id;

    this.accountService.editAccount(form.value).subscribe(
      (response) => {
        console.log('edit ok', response);
        this.lightBoxClose();
        this.getAllAccount();
      },
      (error) => {
        this.errorWork(error);
      }
    );
  }


  // 刪除
  deleteAccount(): void {
    console.log(this.selectData.id);
    const deleteData = {
      id: this.selectData.id
    };
    this.accountService.deleteAccount(deleteData).subscribe(
      (response) => {
        console.log('remove ok', response);
        this.lightBoxClose();
        this.getAllAccount();
      },
      (error) => {
        console.log(error);
        this.errorWork(error);
      }
    );
  }

  errorReset(): void {
    this.errorName = '';
    this.errorUsername = '';
    this.errorRole = '';
  }


  errorWork(error): void {
    const err = this.responseService.backResponse(error);
    if (err) {
      err.forEach((item) => {
        if (item.fieldName === 'name') {
          this.errorName += ` ${item.reason}`;
        }
        if (item.fieldName === 'detail') {
          this.errorUsername += ` ${item.reason}`;
        }
        if (item.fieldName === 'permissionIds') {
          this.errorRole += ` ${item.reason}`;
        }
      });
    } else {
      console.log('表單沒錯', err);
    }
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

}
