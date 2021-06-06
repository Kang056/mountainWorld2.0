import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() headingName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
