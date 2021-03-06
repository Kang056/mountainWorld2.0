import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss']
})
export class TableSortComponent implements OnInit {

  @Input() name: string;
  @Input() sortType: string;
  @Input() sequence: boolean;
  @Output() sortBtnEvent = new EventEmitter();

  constructor() { }

  // ζεΊζι
  sortBtnClick(key: string, sequence: boolean): void {
    this.sortBtnEvent.emit({key, sequence});
  }

  ngOnInit(): void {
  }

}
