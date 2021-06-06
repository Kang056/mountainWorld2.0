import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-index-button',
  templateUrl: './index-button.component.html',
  styleUrls: ['./index-button.component.scss'],
})
export class IndexButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() data: any;
  @Input() address: string;
  @Input() form: any;

  @Output() lightBoxOpenEvent = new EventEmitter();
  @Output() lightBoxCloseEvent = new EventEmitter();
  @Output() doActionEvent = new EventEmitter();
  // @Output() routerChangeEvent = new EventEmitter();

  constructor() {}

  // 燈箱開啟
  lightBoxOpen(datas: any, ligthBoxType: string): void {
    this.lightBoxOpenEvent.emit({ datas, ligthBoxType });
  }
  // 執行動作
  doAction(): void {
    this.doActionEvent.emit();
  }
  // 關燈箱
  lightBoxClose(): void {
    this.lightBoxCloseEvent.emit();
  }

  ngOnInit(): void {

  }
}
