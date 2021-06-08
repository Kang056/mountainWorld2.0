import { MountainService } from './../../../services/mountain.service';
import { ResponseService } from './../../../services/response.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { RoleService } from './../../../services/role.service';
import { OperatingBarComponent } from './../../../components/operating-bar/operating-bar.component';

@Component({
  selector: 'app-mountain',
  templateUrl: './mountain.component.html',
  styleUrls: ['./mountain.component.scss']
})
export class MountainComponent implements OnInit {

  userData = JSON.parse(sessionStorage.getItem('user'));
  permissions = JSON.parse(sessionStorage.getItem('permissions'));
  pageName = 'mountain'; // 分頁主標題
  lightBox = ''; // 燈箱開關
  titles = []; // 主表格表頭
  btns = {
    add: this.permissions?.person?.button?.add,
    edit: this.permissions?.person?.button?.edit,
    freeze: this.permissions?.person?.button?.freeze,
    remove: this.permissions?.person?.button?.remove,
  }; // Operation欄位按鈕類型
  sortType = 'number'; // 排序項目
  sequence = true; // 排序形式 (true:升冪, false:降冪)
  datas: any; // 主表格資料
  @ViewChild('operatingBar') operatingBar: OperatingBarComponent; // 操作區id

  freezes = { name: '', enabled: '' };
  removes = { name: '', enabled: '' };
  companyDatas: any; // 公司選單
  rolesData: any; // 權限
  getAllDatas: any; // getAll回傳的原始資料
  selectData: any; // 點選到的getAll單筆資料
  selectRoles = []; // roleCheckBox
  personStates = true; // enable選單
  selectCompanyId: number; // companyId選單

  // error訊息
  errorName = '';
  errorUsername = '';
  errorCompany = '';
  errorRole = '';

  constructor(

    private mountainService: MountainService,
    private roleService: RoleService,
    private responseService: ResponseService
  ) {}
  // call response service
  callResponseService(data: any, note = ''): void {
    const err = this.responseService.whatTypeOfResponse(data);
    if (err) {
      err.map((item) => {
        const names = ['name', 'username', 'company', 'role'];
        names.map((log) => {
          if (item.fieldName === log) {
            eval(`this.error${this.caps(log)} += '${item.reason}';`);
          }
        });
      });
    } else {
      console.log(note, data);
    }
  }
  caps(str: string) {
    // 轉大寫
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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

  // 表格健值清單
  titlesWork(): void {
    for (const [key] of Object.entries(this.getAllDatas[0])) {
      this.titles.push(key);
    }
  }
  // 取得所有
  getAllMountain(): void {
    this.mountainService.getAllMountain().subscribe(
      (response) => {
        console.log('getAll', response);
        this.getAllDatas = response;
        this.getAllDatas.map((item, idx) => {
          item.number = idx + 1;
        });
        if (this.getAllDatas?.length > 0) {
          this.titlesWork();
        }
        this.datasWork();
      },
      (error) => {
        this.callResponseService(error.error, 'getAll ng');
        this.getAllDatas = null;
        this.datas = [];
      }
    );
  }

  // 新增
  addMountain(form): void {
    this.errorReset();
    form.value.companyId
      ? (form.value.companyId = form.value.companyId)
      : (form.value.companyId = this.selectCompanyId);
    this.mountainService.addMountain(form.value).subscribe(
      (response) => {
        console.log('add ok', response);
        this.getAllMountain();
        this.lightBox = '';
      },
      (error) => {
        this.callResponseService(error.error, 'add ng');
      }
    );
  }

  // 修改
  editMountain(form): void {
    this.errorReset();
    console.log('editData', form.value);
    this.mountainService.editMountain(this.selectData.id, form.value).subscribe(
      (response) => {
        console.log('edit ok', response);
        this.lightBoxClose();
        this.getAllMountain();
      },
      (error) => {
        this.callResponseService(error.error, 'edit ng');
      }
    );
  }

  // 凍結
  freezeMountain(): void {
    const editData = {
      enabled: this.selectData.enabled ? false : true,
      name: this.selectData.name,
      roleIds: [],
      sex: this.selectData.sex,
    };
    this.mountainService.editMountain(this.selectData.id, editData).subscribe(
      (response) => {
        console.log('freeze ok', response);
        this.lightBoxClose();
        this.getAllMountain();
      },
      (error) => {
        this.callResponseService(error.error, 'freeze ng');
      }
    );
  }

  // 刪除
  deleteMountain(): void {
    this.mountainService.deleteMountain(this.selectData.id).subscribe(
      (response) => {
        console.log('remove ok', response);
        this.lightBoxClose();
        this.getAllMountain();
      },
      (error) => {
        this.callResponseService(error.error, 'remove ng');
      }
    );
  }

  errorReset(): void {
    this.errorName = '';
    this.errorUsername = '';
    this.errorCompany = '';
    this.errorRole = '';
  }

  ngOnInit(): void {

    this.getAllMountain();
  }

}
