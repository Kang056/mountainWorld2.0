import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart-box',
  templateUrl: './chart-box.component.html',
  styleUrls: ['./chart-box.component.scss']
})
export class ChartBoxComponent implements OnInit {

  @Input() lightBox: string;
  @Output() lightBoxCloseEvent = new EventEmitter();
  deviceDatas: any; // device頁籤
  isChart = true;

  elevation: any;
  echartoption: any; // echarts
  winWidth = window.innerWidth;
  echartDataZoom = [{
    type: 'inside',
    disabled: false,
    start: 0,
  }, {}];
  myTheme = ''; // 主題色

  constructor(
    private datePipe: DatePipe
  ) {}

  moldChange() {
    this.myTheme === '' ? this.myTheme = 'dark' : this.myTheme = '';
  }

  // resize事件
  onResize(event) {
    const winWidth = event.target.innerWidth;
    this.winWidth = winWidth;
  }

  lightBoxClose(): void {
    this.lightBoxCloseEvent.emit();
  }

  // 圖表
  chartWork(points): void {
    this.elevation = points;
    const elevationtime = [];
    const elevationdata = [];
    points.map((item) => {
      elevationtime.push(this.datePipe.transform(item.time, 'MM/dd HH:mm'));
      elevationdata.push(item.ele);
    });
    // chart參數區
    if (this.elevation) {
      this.echartoption = {
        tooltip: {
          trigger: 'axis',
          position: (pt: any) => [pt[0], '10%']
        },
        legend: {
          data: ['海拔']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: elevationtime,
          showMinLabel: true,
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
          },
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
        },
        yAxis: {
          type: 'value',
          min: 0
        },
        dataZoom: this.winWidth <= 768 ? [] : this.echartDataZoom,
        series: [{
          name: '海拔',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: '#3cba9f'
          },
          areaStyle: {
            color: 'rgba(68,190,190,.3)'
          },
          data: elevationdata
        }]
      };
    }
  }

  doNot() {
    return false;
  }
  ngOnInit(): void {}

}
