import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss'],
})
export class CsvComponent implements OnInit {
  @Input() datas: any;
  constructor(
    private datePipe: DatePipe
  ) {}


  /*
  datas 結構預計是：
  datas = [
    {
      key: value,
      key: value,
      ...
    },
    {...}
  ]
  */

  exportCSV(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datas); // 表單內容
    const wb: XLSX.WorkBook = XLSX.utils.book_new(); // 活頁本
    XLSX.utils.book_append_sheet(wb, ws, 'test'); // 活頁本,表單內容,表單名
    XLSX.writeFile(wb, `${this.datePipe.transform(Date.now(), 'yyyy-mm-ddTHH-mm-ss')}.xlsx`); // 活頁本,檔名
  }
  ngOnInit(): void {}
}
