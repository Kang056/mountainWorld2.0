import { ResponseService } from './../../../services/response.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from './../../../services/company.service';
import { PersonService } from './../../../services/person.service';
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
  pageName = 'person'; // 分頁主標題
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
  selects = [
    {
      selectName: 'company',
      permissions: this.permissions.person.select.company,
      name: 'companyId',
      selectItem: [{ itemName: '', itemValue: '' }],
    },
    {
      selectName: 'state',
      name: 'enable',
      permissions: this.permissions.person.select.enabled,
      selectItem: [
        { itemName: 'normal', itemValue: '0' },
        { itemName: 'freeze', itemValue: '1' },
      ],
    },
  ]; // 操作區選單資料
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
    private companyService: CompanyService,
    private personService: PersonService,
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
    if (ligthBoxType === 'edit') {
      this.checkBoxWork();
    }
    if (ligthBoxType === 'freeze') {
      this.freezes.name = data.name;
      this.freezes.enabled = data.enabled;
    }
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

  // 下拉選單設定
  selectClick(selectDatas: any): void {
    console.log(selectDatas);
    this.selectCompanyId =
      selectDatas.companyId || this.userData.user.companyPo.id;
    selectDatas.enable === '0'
      ? (this.personStates = true)
      : (this.personStates = false);
    this.getAllPerson(Number(selectDatas.companyId || this.userData.user.companyPo.id), Number(this.personStates));
  }

  // 排序
  setSort(setSortTypeData: any): void {
    this.sortType = setSortTypeData.key;
    this.sequence = setSortTypeData.sequence;
    this.datasWork();
  }

  // 下拉選單過濾(凍結狀態)
  personStatesFilter(personDatas: any): void {
    let datas;
    if (this.personStates) {
      datas = personDatas.filter((item) => {
        if (item.enabled === true) {
          return item;
        }
      });
    } else {
      datas = personDatas.filter((item) => {
        if (item.enabled === false) {
          return item;
        }
      });
    }
    return datas;
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
    // 凍結狀態過濾
    this.datas = this.personStatesFilter(this.getAllDatas);
    // 篩選
    this.datas = this.operatingBar.datasSearch(this.datas);
    // 排序
    this.datas = this.datasSort(this.datas);
  }

  // 取得所有公司
  getAllCompany(): void {
    this.companyService.getAllCompany().subscribe(
      (response) => {
        this.companyDatas = response;
        console.log('this.companyDatas', this.companyDatas);
        this.selects[0].selectItem = [];
        this.permissions?.person?.select?.company
          ? (this.selectCompanyId = this.companyDatas[0].id)
          : (this.selectCompanyId = this.userData.user.companyPo.id);
        this.companyDatas.forEach((item) => {
          this.selects[0].selectItem.push({
            itemName: item.enName + ' | ' + item.zhName,
            itemValue: item.id,
          });
        });
      },
      (error) => {
        this.callResponseService(error.error, 'getAllCompany ng');
      }
    );
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
    this.roleService.getAllRole(this.selectCompanyId).subscribe(
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
        this.callResponseService(error.error, 'getAllPermission');
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
  getAllPerson(companyId, enable): void {
    this.personService.getAllPerson(companyId, enable).subscribe(
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
  addPerson(form): void {
    this.errorReset();
    form.value.companyId
      ? (form.value.companyId = form.value.companyId)
      : (form.value.companyId = this.selectCompanyId);
    this.personService.addPerson(form.value).subscribe(
      (response) => {
        console.log('add ok', response);
        this.getAllPerson(this.selectCompanyId, true);
        this.lightBox = '';
      },
      (error) => {
        this.callResponseService(error.error, 'add ng');
      }
    );
  }

  // 修改
  editPerson(form): void {
    this.errorReset();
    form.value.roleIds = this.roleDataWork(form.value);
    form.value.enabled = this.selectData.enabled;
    const editData: any = {};
    editData.enabled = form.value.enabled;
    editData.name = form.value.name;
    editData.roleIds = form.value.roleIds;
    console.log('editData', editData);
    this.personService.editPerson(this.selectData.id, editData).subscribe(
      (response) => {
        console.log('edit ok', response);
        this.lightBoxClose();
        this.getAllPerson(this.selectCompanyId, true);
      },
      (error) => {
        this.callResponseService(error.error, 'edit ng');
      }
    );
  }

  // 凍結
  freezePerson(): void {
    const editData = {
      enabled: this.selectData.enabled ? false : true,
      name: this.selectData.name,
      roleIds: [],
      sex: this.selectData.sex,
    };
    this.personService.editPerson(this.selectData.id, editData).subscribe(
      (response) => {
        console.log('freeze ok', response);
        this.lightBoxClose();
        this.getAllPerson(this.selectCompanyId, this.personStates);
      },
      (error) => {
        this.callResponseService(error.error, 'freeze ng');
      }
    );
  }

  // 刪除
  deletePerson(): void {
    this.personService.deletePerson(this.selectData.id).subscribe(
      (response) => {
        console.log('remove ok', response);
        this.lightBoxClose();
        this.getAllPerson(this.selectCompanyId, this.personStates);
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
    this.getAllCompany();
    this.getAllPerson(this.userData.user.companyPo.id, true);
  }

}
