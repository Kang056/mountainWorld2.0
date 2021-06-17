import { DatePipe } from '@angular/common';
import { MountainService } from './../../../services/mountain.service';
import { ResponseService } from './../../../services/response.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OperatingBarComponent } from './../../../components/operating-bar/operating-bar.component';
import * as XLSX from 'xlsx';

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
    add: this.permissions?.mountain?.button?.add,
    edit: this.permissions?.mountain?.button?.edit,
    remove: this.permissions?.mountain?.button?.remove,
  }; // Operation欄位按鈕類型
  sortType = 'number'; // 排序項目
  sequence = true; // 排序形式 (true:升冪, false:降冪)
  datas: any; // 主表格資料
  @ViewChild('operatingBar') operatingBar: OperatingBarComponent; // 操作區id
  removes = { name: '', enabled: '' };
  getAllDatas: any; // getAll回傳的原始資料
  selectData: any; // 點選到的getAll單筆資料

  // error訊息
  errorName = '';
  errorUsername = '';
  errorRole = '';

  constructor(
    private mountainService: MountainService,
    private responseService: ResponseService,
    private datePipe: DatePipe
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

  // 表格健值清單
  titlesWork(): void {
    for (const [key] of Object.entries(this.getAllDatas[0])) {
      this.titles.push(key);
    }
  }

  export(): void {

    const arr = []; // 表格內容(value), 1次1列
    const title = []; // 表頭(key)
    const wscols = []; // 表頭欄寬
    for (const [key, value] of Object.entries(this.datas[0])) {
      title.push(key);
      wscols.push({ wch: 20 }); // 取得該欄位(value)的字元長度
    }
    arr.push(title);
    console.log(arr);
    this.datas.forEach((item) => {
      const element = [];
      for (const [key, value] of Object.entries(item)) {
        element.push(value);
      }
      console.log(element);
      arr.push(element);
    });
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(arr);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'list');
    XLSX.writeFile(wb, 'Mountains data(' + this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm') + ').xlsx');
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
        this.errorWork(error);
        this.getAllDatas = null;
        this.datas = [];
      }
    );
  }

  // 新增
  addMountain(form): void {
    this.errorReset();
    this.mountainService.addMountain(form.value).subscribe(
      (response) => {
        console.log('add ok', response);
        this.getAllMountain();
        this.lightBox = '';
      },
      (error) => {
        this.errorWork(error);
      }
    );
  }

  // 修改
  editMountain(form): void {
    this.errorReset();
    form.value.id = this.selectData.id;
    console.log('editData', form.value);
    this.mountainService.editMountain(form.value).subscribe(
      (response) => {
        console.log('edit ok', response);
        this.lightBoxClose();
        this.getAllMountain();
      },
      (error) => {
        this.errorWork(error);
      }
    );
  }

  // 刪除
  deleteMountain(): void {
    console.log(this.selectData.id);
    const deleteData = {
      id: this.selectData.id
    };
    this.mountainService.deleteMountain(deleteData).subscribe(
      (response) => {
        console.log('remove ok', response);
        this.lightBoxClose();
        this.getAllMountain();
      },
      (error) => {
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

    this.getAllMountain();
  }

}
