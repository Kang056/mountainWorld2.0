import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-operating-bar',
  templateUrl: './operating-bar.component.html',
  styleUrls: ['./operating-bar.component.scss']
})
export class OperatingBarComponent implements OnInit {
  @Input() titles = [];
  @Input() selects: any;
  @Output() selectClickEvent = new EventEmitter();
  @Output() datasWorkEvent = new EventEmitter();
  keyWord = '';

  constructor() { }

  // 下拉選單設定
  selectClick(selectData: any): void {
    console.log(selectData.form.value);
    this.selectClickEvent.emit(selectData.form.value);
  }

  // 關鍵字搜尋設定
  setSearch(keyWord): void  {
    this.keyWord = keyWord.form.value.name;
    this.datasWorkEvent.emit();
  }

  // 關鍵字搜尋作業
  datasSearch(datas: any) {
    const searchDatas = datas.filter(item => {
      let find = false;
      Object.values(item).forEach(data => {
        if (data) {
          return data.toString().indexOf(this.keyWord) > -1 ? find = true : false;
        }
      });
      return find ? item : false;
    });
    return searchDatas;
  }

  ngOnInit(): void {
  }

}
