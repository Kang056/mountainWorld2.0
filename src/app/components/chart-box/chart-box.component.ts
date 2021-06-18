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
          show : true,                                 // 是否显示工具栏组件
          orient: 'horizontal',                        // 工具栏 icon 的布局朝向'horizontal' 'vertical'
          itemSize: 15,                                 // 工具栏 icon 的大小
          itemGap: 10,                                  // 工具栏 icon 每项之间的间隔
          showTitle: true,                             // 是否在鼠标 hover 的时候显示每个工具 icon 的标题
          feature : {
              mark : {                                 // '辅助线开关'
                  show: true
              },
              // dataView : {                            // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
              //     show: true,                         // 是否显示该工具。
              //     title: '数据视图',
              //     readOnly: false,                    // 是否不可编辑（只读）
              //     lang: ['数据视图', '关闭', '刷新'],  // 数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']
              //     backgroundColor: '#fff',             // 数据视图浮层背景色。
              //     textareaColor: '#fff',               // 数据视图浮层文本输入区背景色
              //     textareaBorderColor: '#333',         // 数据视图浮层文本输入区边框颜色
              //     textColor: '#000',                    // 文本颜色。
              //     buttonColor: '#c23531',              // 按钮颜色。
              //     buttonTextColor: '#fff',             // 按钮文本颜色。
              // },
              magicType: {                            // 动态类型切换
                  show: true,
                  title: '切换',                       // 各个类型的标题文本，可以分别配置。
                  type: ['line', 'bar'],              // 启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
              },
              // restore : {                             // 配置项还原。
              //     show: true,                         // 是否显示该工具。
              //     title: '还原',
              // },
              saveAsImage : {                         // 保存为图片。
                  show: true,                         // 是否显示该工具。
                  type: 'png',                         // 保存的图片格式。支持 'png' 和 'jpeg'。
                  name: 'pic1',                        // 保存的文件名称，默认使用 title.text 作为名称
                  backgroundColor: '#ffffff',        // 保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
                  title: '下載圖表',
                  pixelRatio: 1                        // 保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
              },
              // dataZoom : {                             // 数据区域缩放。目前只支持直角坐标系的缩放
              //     show: true,                         // 是否显示该工具。
              //     title: '缩放',                       // 缩放和还原的标题文本
              //     xAxisIndex: 0,                       // 指定哪些 xAxis 被控制。如果缺省则控制所有的x轴。如果设置为 false 则不控制任何x轴。如果设置成 3 则控制 axisIndex 为 3 的x轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的x轴
              //     yAxisIndex: false,                   // 指定哪些 yAxis 被控制。如果缺省则控制所有的y轴。如果设置为 false 则不控制任何y轴。如果设置成 3 则控制 axisIndex 为 3 的y轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的y轴
              // },
          },
          zlevel: 0,                                   // 所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
          z: 2,                                         // 所属组件的z分层，z值小的图形会被z值大的图形覆盖
          left: 'left',                              // 组件离容器左侧的距离,'left', 'center', 'right','20%'
          top: 'top',                                   // 组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
          right: 'auto',                               // 组件离容器右侧的距离,'20%'
          bottom: 'auto',                              // 组件离容器下侧的距离,'20%'
          width: 'auto',                               // 图例宽度
          height: 'auto',
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
