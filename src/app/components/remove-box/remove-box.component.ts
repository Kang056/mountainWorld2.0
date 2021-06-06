import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remove-box',
  templateUrl: './remove-box.component.html',
  styleUrls: ['./remove-box.component.scss']
})
export class RemoveBoxComponent implements OnInit {

  @Input() pageName: string;
  @Input() removes: any;
  @Input() lightBox: string;
  @Output() removeClickEvent = new EventEmitter();
  @Output() lightBoxCloseEvent = new EventEmitter();

  constructor() { }

  // 凍結
  remove(): void {
    this.removeClickEvent.emit();
  }
  // 關燈箱
  lightBoxClose(): void {
    this.lightBoxCloseEvent.emit();
  }
  ngOnInit(): void {
  }

}
