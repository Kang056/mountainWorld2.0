import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  @Input() lightBox: any;
  @Output() lightBoxCloseEvent = new EventEmitter();

  constructor() { }

  lightBoxClose(): void {
    this.lightBoxCloseEvent.emit();
  }

  ngOnInit(): void {
  }

}
