import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GPwear';
  constructor(
    private renderer: Renderer2
  ){}
  ngOnInit() {
    window.console.log = () => {};
  }
  // ngAfterViewInit(): void {
  //   this.loaderService.httpProgress().subscribe((status: boolean) => {
  //     if (status) {
  //       this.renderer.addClass(document.body, 'cursor-loader');
  //       // this.isLoading = true
  //     } else {
  //       this.renderer.removeClass(document.body, 'cursor-loader');
  //       // this.isLoading = false
  //     }
  //   });
  // }
}
