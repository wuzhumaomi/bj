## 查找

**文档》》 术语速查**

# 安装

```
npm install echarts --save
```

# 注册全局main.js

```
import echarts from 'echarts'

Vue.prototype.echarts = echarts
```

## **在其他地方使用全局变量**

```
this.echarts
```

# 使用

```
   <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="container" style="width: 600px;height:400px;"></div>
```

```
series 加线
legend 加线上描述的名字

两个都要有，才能出来一根线
```



```
   // 显示柱形图
    getEchartData1(){
      var dom = document.getElementById("container");
      var myChart = this.echarts.init(dom);//绑定div
      var app = {};
      var option =null;

      var posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ];

      app.configParameters = {
          rotate: {
              min: -90,
              max: 90
          },
          align: {
              options: {
                  left: 'left',
                  center: 'center',
                  right: 'right'
              }
          },
          verticalAlign: {
              options: {
                  top: 'top',
                  middle: 'middle',
                  bottom: 'bottom'
              }
          },
          position: {
              options: this.echarts.util.reduce(posList, function (map, pos) {
                  map[pos] = pos;
                  return map;
              }, {})
          },
          distance: {
              min: 0,
              max: 100
          }
      };

      app.config = {
        // 调整显示的字
          rotate: 0,
          align: 'center',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function () {
              var labelOption = {
                  normal: {
                      rotate: app.config.rotate,
                      align: app.config.align,
                      verticalAlign: app.config.verticalAlign,
                      position: app.config.position,
                      distance: app.config.distance
                  }
              };
              myChart.setOption({
                  series: [{
                      label: labelOption
                  }, {
                      label: labelOption
                  }, {
                      label: labelOption
                  }, {
                      label: labelOption
                  }]
              });
          }
      };


      var labelOption = {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          // 柱形图上显示的东西
          formatter: '{c}',
          fontSize: 16,
          rich: {
              name: {
                  textBorderColor: '#fff'
              }
          }
      };
      
      // 让图表和浏览器一起缩放
      window.addEventListener("resize", function () {
          myChart.resize();
      });

      option = {
          color: ['#003366', '#006699', '#4cabce', '#e5323e'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          // 显示的数据名称，与下面的数据数名字相呼应
          legend: {
              data: ['项目数', 'bug总数', '已修bug数', 'bug数']
          },
          // 附加项
          // toolbox: {
          //     show: true,
          //     orient: 'vertical',
          //     left: 'right',
          //     top: 'center',
          //     feature: {
          //         mark: {show: true},
          //         dataView: {show: true, readOnly: false},
          //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          //         restore: {show: true},
          //         saveAsImage: {show: true}
          //     }
          // },
          xAxis: [
              {
                  type: 'category',
                  axisTick: {show: false},
                  // x轴及横轴显示的 日期什么的
                  data:[this.nameList].map(function (str) {
                    return str.replace(' ', '\n');
                  }) <<<<<<<<<<<<<<<<<<<<<<<< 新数据换行
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          // 放大缩小
          dataZoom: [
            // 横轴缩放
            {
                type: 'slider',
                // 是否显示，下面的滑动条
                show: true,
                start: 0,
                end: 100,
                handleSize: 8
            },
            // 鼠标缩放
            {
                type: 'inside',
                start: 94,
                end: 100
            },
            // 竖轴缩放
            // {
            //     type: 'slider',
            //     show: true,
            //     yAxisIndex: 0,
            //     filterMode: 'empty',
            //     width: 12,
            //     height: '70%',
            //     handleSize: 8,
            //     showDataShadow: false,
            //     left: '93%'
            // }
        ],
        // 数据
          series: [
              {
                  name: '项目数',
                  type: 'bar',
                  barGap: 0,
                  label: labelOption,
                  //data 这条的数据数组 【1，2，3，4，5】 
                  data: this.TaskNub
              },
              {
                  name: 'bug总数',
                  type: 'bar',
                  label: labelOption,
                  data: this.bugNub
              },
              {
                  name: '已修bug数',
                  type: 'bar',
                  label: labelOption,
                  data: this.bugNub1
              },
              {
                  name: 'bug数',
                  type: 'bar',
                  label: labelOption,
                  data: this.bugNub2
              }
          ]
      };
      if (option && typeof option === "object") {
          myChart.setOption(option, true);
      }
          },
    // end
```

```
折线图
	堆叠
		 {
            name: '搜索引擎',
            type: 'line',
            //去掉就是正常 加上就是堆叠
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }

```

## 	它会让你的图表最大化，相应的会让缩放组件盖到图标上面

```
              grid: {
                left: '3%',
                right: '4%',
                //     bottom: '3%',删掉这个就不会盖到图表了
                containLabel: true
            },
```

## 曲线图

```
  series: [
                {
                    name: this.name,
                    type: 'line',
                    data:this.values,
                    smooth: true《《《《《这个属性
                },
            ]
```

## 标线

```
series 》 { 》 
        markLine: {
            silent: true,
            lineStyle:{
                color:"#555",
            },
            data: [{
                yAxis: 50
            }, {
                yAxis: 100
            }, {
                yAxis: 150
            }, {
                yAxis: 200
            }, {
                yAxis: 300
            }]
        }
```

## 图的填充

```
        grid: {
          top: '10%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
```



## 饼形图的大小

```
            // 洞的大小 图形的大小
            radius: [10, 80],
            //位置
            center: ['50%', '50%'],
```

## 饼形图的字

```
 			// 字
 			label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
            	// 棍
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },

```

字换行

```
 // 字
        label: {
          color: 'rgba(255, 255, 255)',
          formatter: function (params) {
            // debugger
            var strs = params.name.split(''); //字符串数组
            var str = ''
            for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
            str += s;
            if(!(i % 8)) str += '\n'; //按需要求余
            }
            return str
          }
        },
```

## 饼形图中间放字

```
// 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:["#27D9C8","#D8D8D8"],
            title:{
                text:"80%",
                left:"center",
                top:"50%",
                textStyle:{
                    color:"#27D9C8",
                    fontSize:36,
                    align:"center"
                }
            },
            graphic:{
                type:"text",
                left:"center",
                top:"40%",
                style:{
                    text:"运动达标率",
                    textAlign:"center",
                    fill:"#333",
                    fontSize:20,
                    fontWeight:700
                }
            },
            series: [
                {
                    name: '运动情况',
                    type: 'pie',
                    radius: ['65%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                       
                    },
                    
                    data: [
                        { value: 80, name: '已完成' },
                        { value: 20, name: '未完成' },
                       
                    ]
                }
            ]
        };
```

## 点击等事件

https://echarts.apache.org/zh/tutorial.html#ECharts%20%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6%E5%92%8C%E8%A1%8C%E4%B8%BA

查

鼠标事件的处理