import { ResponseService } from './../../../services/response.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  clock: any;
  time: number;
  constructor(
    private router: Router,
    private responseService: ResponseService,
  ) { }

  loginPage(): void {
    this.router.navigate(['account/login']);
  }

  isServerWork(): void {
    this.responseService.isServerWork().subscribe(
      (response) => {
        clearInterval(this.clock);
        this.loginPage();
      },
      (error) => {
        if (error.status === 200){
          clearInterval(this.clock);
          this.loginPage();
        }
      }
    );
  }

  checkService(): void {
    this.clock = setInterval(() => {
      this.isServerWork();
    }, 1000);
  }

  ngOnInit(): void {
    this.checkService();
  }

}
