import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-freeze-box',
  templateUrl: './freeze-box.component.html',
  styleUrls: ['./freeze-box.component.scss']
})
export class FreezeBoxComponent implements OnInit {
  @Input() pageName: string;
  @Input() freezes: any;
  @Input() lightBox: string;
  @Output() freezeClickEvent = new EventEmitter();
  @Output() lightBoxCloseEvent = new EventEmitter();

  constructor() { }

  // 凍結
  freeze(): void {
    this.freezeClickEvent.emit();
  }
  // 關燈箱
  lightBoxClose(): void {
    this.lightBoxCloseEvent.emit();
  }
  ngOnInit(): void {
  }

}
