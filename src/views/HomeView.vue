<template>
  <div class="home">
    <vue-particles

        color="#dedede"

        :particleOpacity="0.7"

        :particlesNumber="50"

        shapeType="star"

        :particleSize="4"

        linesColor="#FFFFFF"

        :linesWidth="2"

        :lineLinked="true"

        :lineOpacity="0.4"

        :linesDistance="150"

        :moveSpeed="3"

        :hoverEffect="true"

        hoverMode="grab"

        :clickEffect="false"

        clickMode="push" class="cash"
    >
    </vue-particles>
    <!--  按钮  -->
    <div class="head">
      <div class="left">
        <el-button class="button" @click="opens('http://222.75.204.3:8081/#/login')">监管平台</el-button>
        <el-button class="button" @click="opens('http://aimonitoring.rybsj.cn/webgis/login.jsp')">危货运输</el-button>
        <el-button class="button" @click="opens('https://pc.huihaoyun.cn/login.html?v=1324/')">普货运输</el-button>
      </div>
      <div>
        <h1>宁东物流大数据监管平台</h1>
      </div>
      <div class="right">
        <el-button class="button" @click="opens()">公铁联运</el-button>
        <el-button class="button" @click="opens()">大宗贸易</el-button>
        <el-button class="button" @click="opens()">第三方服务</el-button>
      </div>
    </div>
    <div class="summary">
      <!--  当天车辆报警汇总  -->
      <div class="operate">
        <div class="border">
          <div class="auto" v-for="(item,index) in totals" :key="index">
            <div class="enterprise flex">
              <div class="number flex">
                <div class="total" v-for="(ite,ind) in item" :key="ind">
                  <div>{{ ite }}</div>
                </div>
              </div>
              <div>{{ index }}</div>
            </div>
          </div>
        </div>
        <div class="vehicles flex">
          <div class="online">
            <table cellspacing="0" border="1">
              <tr v-for="(item,index) in option.series[0].data" :key="index">
                <th>{{ item.name }}</th>
                <td>{{ item.value }}</td>
              </tr>
            </table>
          </div>
          <div style="width:60%;">
            <div style="width: 100%;height: 90%;" id="chart">

            </div>
          </div>
        </div>
        <div class="police">
          <div>
            <div class="font">{{ this.name }}</div>
            <!--            <div class="distribution">-->
            <!--              <button @click="ap(index)" :id="index" v-for="(item,index) in this.button_id" :key="index">{{-->
            <!--                  item-->
            <!--                }}-->
            <!--              </button>-->
            <!--            </div>-->
          </div>
          <div id="chart1"></div>
        </div>
      </div>
      <!--  地图  -->
      <div class="analysis">
        <div class="mileage">
          <h2 style="text-align: center;color: white;">车辆行驶里程风险</h2>
          <div class="flex around" style="height: 90%">
            <div class="kilometre">
              <div v-for="(item,index) in this.travel" :key="index">{{ item.title }}安全行驶累计里程 <span>{{
                  item.num
                }}</span> 公里
              </div>
            </div>
            <div class="vehicle-mileage">
              <div style="width: 100%;height: 80%;" id="yesterday-mileage"></div>
            </div>
          </div>
        </div>
        <div class="map">
          <div class="statistics">
            <div>车辆总数：193</div>
            <div>在线数量：160</div>
            <div>离线数量：33</div>
          </div>
          <div class="amap-example">
            <amap
                id="AmapMar"
                ref="centerMap"
            >
              <amap-map-type/>
              <!--              <amap-district-layer-province />-->
              <div v-for="(item,index) in amapCoordinate">
                <amap-marker
                    :key="index"
                    :position="item.position"
                    auto-move
                    is-custom
                >
                  <el-popover
                      placement="right"
                      width="400"
                      trigger="click"
                  >
                    <table style="width: 100%;text-align: center;" cellspacing="0" border="1">
                      <tr>
                        <th>姓名</th>
                        <th>车牌号</th>
                        <th>出发地</th>
                        <th>到达地</th>
                        <th>货物类型</th>
                      </tr>
                      <tr>
                        <td>{{ item.name }}</td>
                        <td>{{ item.license }}</td>
                        <td>{{ item.departure }}</td>
                        <td>{{ item.destination }}</td>
                        <td>{{ item.type }}</td>
                      </tr>
                    </table>
                    <div slot="reference" class="icon iconfont" style="color: red" v-html="iconStyle[index]">
                    </div>
                  </el-popover>
                </amap-marker>
              </div>

            </amap>
          </div>
          <div class="vehicle">
            <div>
              <el-button>
                危货车
              </el-button>
            </div>
            <div>
              <el-button>
                普货车
              </el-button>
            </div>
            <div>
              <el-button>
                公铁联运
              </el-button>
            </div>
            <div>
              <el-button>
                大宗贸易
              </el-button>
            </div>
            <div>
              <el-button>
                客运车
              </el-button>
            </div>
            <div>
              <el-button>
                汇总
              </el-button>
            </div>
          </div>
        </div>
        <div class="roll">
          <el-table
              :data="tableData"
              height="99%"
              ref="table"
              :header-cell-style="{
                background: '#00065CFF',
                color: '#fff',
                }"
          >
            <el-table-column
                prop="name"
                label="司机姓名">
            </el-table-column>
            <el-table-column
                prop="date"
                label="车牌号">
            </el-table-column>
            <el-table-column
                prop="address"
                label="归属地">
            </el-table-column>
            <el-table-column
                prop="Belonging"
                label="所属业户">
            </el-table-column>
            <el-table-column
                prop="type"
                label="货物种类">
            </el-table-column>
            <el-table-column
                prop="description"
                label="货物名称">
            </el-table-column>
            <el-table-column
                prop="tonnage"
                label="货物吨数">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--  业主车辆报警汇总  -->
      <div class="property">
        <div class="security">
          <div class="flex early-warning">
            <div class="active-safety">
              <div class="align">
                <div class="line"><span class="icon iconfont icon-anquan"></span></div>
                <div class="margin">88</div>
              </div>
              <div class="align">主动安全车辆数</div>
            </div>
            <div class="police">
              <div class="align">
                <div class="line"><span class="icon iconfont icon-zuoyebaojing-copy"></span></div>
                <div>2</div>
              </div>
              <div class="align">今日报警数</div>
            </div>
          </div>
          <div class="flex around align intelligence">
            <div>
              <div class="high-risk">51</div>
              <div>高风险</div>
            </div>
            <div>
              <div class="medium-risk">24</div>
              <div>中风险</div>
            </div>
            <div>
              <div class="low-risk">13</div>
              <div>低风险</div>
            </div>
          </div>
        </div>
        <div class="suspected-faulty-vehicle">
          <div class="left">驾驶异常报警分布</div>
          <div id="suspected-fault"></div>
        </div>
        <div class="risk">
          <div class="left">近30日风险趋势</div>
          <div id="risk-trend"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import "../css/font/iconfont.css"

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      amapCoordinate: [
        {
          position: [116.464258, 39.999067],
          name: '李默',
          license: '宁AS5313',
          departure: '宁夏',
          destination: "北京",
          type: '普货',
        },
        {
          position: [106.567821, 38.192319],
          name: '秦放',
          license: '宁C32761',
          departure: '宁夏',
          destination: "上海",
          type: '危货',
        },
      ],
      tableData: [{
        date: '宁AK2600',
        name: '李文华',
        address: '宁夏回族自治区',
        Belonging: '宁夏众鑫运输有限公司',
        type: '腐蚀品',
        description: '五氧化二磷',
        tonnage: '10吨'
      }, {
        date: '宁AG8205',
        name: '罗致',
        address: '宁夏回族自治区',
        Belonging: '宁夏众鑫运输有限公司',
        type: '第七类',
        description: '海洋污染物',
        tonnage: '13吨'
      }, {
        date: '宁AB9991',
        name: '王鑫',
        address: '宁夏回族自治区',
        Belonging: '宁夏孚惠工贸有限公司',
        type: '爆炸品',
        description: '液态二氧化碳',
        tonnage: '8吨'
      }, {
        date: '宁AL0897',
        name: '张猛',
        address: '宁夏回族自治区',
        Belonging: '宁夏众鑫运输有限公司',
        type: '易燃物',
        description: '甲烷',
        tonnage: '20吨'
      }, {
        date: '宁AM9098',
        name: '褚宇',
        address: '宁夏回族自治区',
        Belonging: '	宁夏孚惠工贸有限公司',
        type: '放射线物',
        description: '二氧化镅',
        tonnage: '26吨'
      }, {
        date: '宁AJ8338',
        name: '李兴浩',
        address: '宁夏回族自治区',
        Belonging: '宁夏众鑫运输有限公司',
        type: '氧化剂',
        description: '氯酸钾',
        tonnage: '30吨'
      }, {
        date: '宁AL0875',
        name: '张浩',
        address: '宁夏回族自治区',
        Belonging: '宁夏众鑫运输有限公司',
        type: '毒害品',
        description: '甲醇',
        tonnage: '27吨'
      }
      ],
      title: '',
      newList: [], // 数据
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}辆 ({d}%)'
        },
        // color:['red','yellow','green','blue',''],
        series: [
          {
            name: '车辆上线情况',
            type: 'pie',
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },

            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 157, name: '今日在线'},
              {value: 33, name: '今日离线'},
              {value: 14, name: '3日离线'},
              {value: 8, name: '7日离线'},
              {value: 0, name: '30日以上'}
            ]
          }
        ]
      },
      faulty: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}次 '
        },
        xAxis: {
          type: 'category',
          data: ['生理疲劳', '抽烟', '打电话', '分神驾驶', '驾驶员异常', '其他报警'],
          axisLabel: {
            interval: 0,
            rotate: 20,
            margin: 20,
            textStyle: {
              align: 'center'
            },

          },
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '15%'
        },
        textStyle: {
          color: '#fff'
        },
        series: [
          {
            data: [260, 26, 37, 266, 40, 2253],
            type: 'bar'
          }
        ]
      },
      options: {
        legend: {
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}次 '
        },
        textStyle: {
          color: '#fff'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 20,
            margin: 20,
            textStyle: {
              align: 'center'
            },

          },
          data: ['超速报警', '疲劳驾驶', '2-5时禁驾', '偏离路线', '其他报警']
        },
        yAxis: {},
        series: [
          {
            name: '报警总数',
            type: 'bar',
            data: [150, 105, 110, 100, 100]
          },
          {
            name: '已处理',
            type: 'bar',
            data: [220, 82, 100, 100, 63]
          }
        ]
      },
      trend: {
        tooltip: {
          trigger: 'item',
          formatter: '第{b}日 : 有{c}辆'
        },
        legend: {
          data: ['高风险', '中风险', '低风险'],
          textStyle: {
            color: "#fff"
          }
        },
        textStyle: {
          color: "#fff"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
          }
        ],
        yAxis: [
          {
            type: 'value',
          }
        ],
        series: [
          {
            name: '高风险',
            type: 'line',
            stack: 'Total',
            areaStyle: {
              color: '#ec6666'
            },
            itemStyle: {
              normal: {
                color: '#ec6666'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 10, 18, 30, 33, 33, 31, 32, 29, 26, 26, 30, 24, 23, 28, 31, 24, 20, 24, 23, 24]
          },
          {
            name: '中风险',
            type: 'line',
            stack: 'Total',
            areaStyle: {
              color: '#fda401'
            },
            itemStyle: {
              normal: {
                color: '#fda401'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 7, 6, 5, 5, 4, 1, 3, 5, 5, 5, 3, 8, 8, 1, 4, 10, 9, 8]
          },
          {
            name: '低风险',
            type: 'line',
            stack: 'Total',
            areaStyle: {
              color: '#8fca75'
            },
            itemStyle: {
              normal: {
                color: '#8fca75'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 15, 26, 38, 44, 42, 46, 45, 40, 35, 35, 41, 39, 38, 39, 45, 40, 35, 41, 41, 44]
          }
        ]
      },
      vehicle_running: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : 有{c}辆 '
        },
        series: [
          {
            name: '昨日里程',
            type: 'pie',
            radius: '100%',
            label: { //饼图图形上的文本标签
              normal: {
                formatter(v) {
                  let text = v.name
                  if (text.length <= 3) {
                    return text;
                  } else if (text.length > 3 && text.length <= 8) {
                    return text = `${text.slice(0, 3)}\n${text.slice(3)}`
                  } else if (text.length > 8 && text.length <= 16) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8)}`
                  } else if (text.length > 16 && text.length <= 24) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16)}`
                  } else if (text.length > 24 && text.length <= 30) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24)}`
                  } else if (text.length > 30) {
                    return text = `${text.slice(0, 8)}\n${text.slice(8, 16)}\n${text.slice(16, 24)}\n${text.slice(24, 30)}\n${text.slice(30)}`
                  }
                },
                textStyle: {
                  fontWeight: 1000, //文字的粗线
                  fontSize: 15,    //文字的字体大小
                  color: '#fff'
                },
              }
            },
            data: [
              {value: 1048, name: '100公里以下'},
              {value: 735, name: '100-200公里'},
              {value: 580, name: '200-500公里'},
              {value: 484, name: '500-1000公里'},
              {value: 300, name: '1000-1500公里'},
              {value: 484, name: '超过1500公里'},
            ],
          }
        ]
      }
      ,
      totals: {
        企业总数: [0, 0, 0, 0, 0, 3],
        个体总数: [0, 0, 0, 0, 0, 0],
        车辆总数: [0, 0, 0, 1, 9, 3]
      },
      button_id: ['今日报警分布', '驾驶异常分布'],
      name: '今日报警分布',
      travel: [
        {
          title: '车辆',
          num: '94006812'
        },
        {
          title: '本月',
          num: '955980'
        },
        {
          title: '今日',
          num: '504162'
        }
      ],
      map: null,
      marker: [],
      iconStyle: [],
    }
  },
  mounted() {
    this.getmounted()
  },
  methods: {
    iconColor() {
      // this.iconStyle = []
      for (let i = 0; i < this.amapCoordinate.length; i++) {
        switch (this.amapCoordinate[i].type) {
          case "危货":
            this.iconStyle.push("&#xe60e;")
            break;
          case "普货" :
            this.iconStyle.push("&#xe60e;")
            break;
          case "客运":
            this.iconStyle.push("&#xe60e;")
            break;
          case "公交":
            this.iconStyle.push("&#xe60e;")
            break;
          case "出租车":
            this.iconStyle.push("&#xe60e;")
            break;
        }
      }
    },
    ap(id) {
      this.name = document.getElementById(id).innerHTML
      // console.log(this.option.series[0].name)
      // this.options.series[0].name = '123'
      // this.options.series[1].name = '13'
      if (id == 0) {
        this.options.xAxis.data = ['超速报警', '疲劳驾驶', '2-5时禁驾', '偏离路线', '其他报警']
        this.options.series = [
          {
            name: '报警总数',
            type: 'bar',
            data: [150, 105, 110, 100, 100]
          },
          {
            name: '已处理',
            type: 'bar',
            data: [220, 82, 100, 100, 63]
          }
        ]
      } else if (id == 1) {
        this.options.xAxis.data = ['生理疲劳', '抽烟', '打电话', '分神驾驶', '驾驶员异常', '其他报警']
        this.options.series = [
          {
            name: '报警总数',
            type: 'bar',
            data: [1250, 1205, 1120, 1020, 1200, 500]
          },
          {
            name: '已处理',
            type: 'bar',
            data: [2210, 812, 1010, 1010, 613, 1000]
          }
        ]
      }
      this.getEchartData1()
    },
    getmounted() {
      this.getEchartData()
      this.getEchartData1()
      this.getEchartfaulty()
      this.getEcharttrend()
      this.getEchartvehicle()
      this.autoscroll()
      this.iconColor()
    },
    getEchartData() {
      const myChart = this.$echarts.init(document.getElementById('chart'));
      const seriesLabel = {
        show: true
      };

      myChart.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart.resize()
      })

    },
    getEchartData1() {
      let myChart = this.$echarts.init(document.getElementById('chart1'));
      const seriesLabel = {
        show: true
      };
      myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getEchartfaulty() {
      let myChart = this.$echarts.init(document.getElementById('suspected-fault'));
      const seriesLabel = {
        show: true
      };

      myChart.setOption(this.faulty);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getEcharttrend() {
      let myChart = this.$echarts.init(document.getElementById('risk-trend'));
      const seriesLabel = {
        show: true
      };

      myChart.setOption(this.trend);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getEchartvehicle() {
      let myChart = this.$echarts.init(document.getElementById('yesterday-mileage'));
      const seriesLabel = {
        show: true
      };

      myChart.setOption(this.vehicle_running);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    autoscroll() {
      const table = this.$refs.table
      const divData = table.bodyWrapper
      setInterval(() => {
        divData.scrollTop += 1
        if (divData.clientHeight + divData.scrollTop === divData.scrollHeight || divData.clientHeight + divData.scrollTop === divData.scrollHeight - 1) {
          divData.scrollTop = 0
        }
      }, 30)
    },
    opens(url) {
      if (url !== undefined) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#particles-js {
  width: 99%;
  // height: calc(100% - 100px);
  height: 99%;
  position: absolute;
}

.home {
  width: 100%;
  height: 100vh;
  background: #00065b url(../img/bg.jpg) no-repeat;
  overflow: hidden;
  background-size: 100% 100%;
  margin: 0;
  padding: 0;
  border: none;
  //position: relative;

  .head {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
    position: relative;


    .left {
      width: 25%;
      display: flex;
      justify-content: space-between;
      margin-left: 5%;
    }

    h1 {
      color: white;
      line-height: 0vh;

    }

    .right {
      width: 25%;
      display: flex;
      justify-content: space-between;
      margin-right: 5%;
    }

    .el-button {
      width: 25%;
      color: white;
      background: #00065b url(../img/bnt.png) no-repeat;
      text-align: center;
      background-size: cover;
      border: 0;
      margin-top: 10%;
    }
  }

  .summary {
    width: 96%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: -1% auto;


    .operate {
      width: 22%;
      height: 100%;
      //font-family: "Impact";

      .border {
        width: 95%;
        height: 20%;
        //border: 1px solid #00c2fd;
        background: url(../img/border.png) no-repeat;
        background-size: 99% 100%;
        padding-top: 5%;
        padding-left: 5%;
        margin-bottom: 5%;
        position: relative;

        .enterprise {
          width: 100%;
          font-size: 2vh;
          line-height: 5vh;
          color: #00c2fd;
          margin-top: 1%;
          font-weight: bolder;

          .number {
            width: 70%;
            height: 5%;
            margin-right: 5%;

            .total {
              width: 20%;
              color: white;
              text-align: center;
              line-height: 5vh;
              margin-left: 1%;
              font-size: 3vh;
              background: #00c3ed;
              border-radius: 5px;
            }
          }
        }
      }

      .vehicles {
        width: 95%;
        height: 25%;
        background: url(../img/vehicles.png) no-repeat 0 0;
        background-size: 99% 100%;
        color: white;
        padding-top: 5%;
        padding-left: 5%;
        margin-bottom: 5%;
        position: relative;

        .online {
          width: 40%;
          //background: red;
          table {
            width: 100%;
            height: 23vh;
            text-align: center;
            border: 1px solid #00c2fd;
            border-collapse: collapse;

            th {
              width: 50%;
              font-size: 1.5vh;
              background: #00c2fd;
            }
          }

        }
      }

      .police {
        width: 97%;
        height: 32%;
        color: white;
        background: url("../img/police.png") no-repeat;
        background-size: 99% 100%;
        padding-top: 3%;
        position: relative;
        //margin-top: 30%;

        .font {
          font-weight: bolder;
          margin-bottom: 3%;
        }

        .distribution {
          button {
            border-radius: 10px;
            background: #00c2fd;
            color: white;
          }

          button:hover {
            cursor: pointer;
          }
        }

        #chart1 {
          width: 100%;
          height: 95%;
        }
      }

    }

    .analysis {
      width: 55%;
      height: 100%;

      .roll {
        height: 22%;
        overflow: hidden;
        background: url("../img/roll.png") no-repeat;
        background-size: 99% 100%;


        ::v-deep .el-table {
          width: 90%;
          margin: 2px auto;
          height: 100%;
          background: transparent;
          color: white;
          position: inherit;

          .el-table__body-wrapper::-webkit-scrollbar {
            /*width: 0;宽度为0隐藏*/

            width: 0;
            display: none;
          }

          .gutter {
            background: #00065c;
          }

          .el-table__body-wrapper {
            background: transparent;
          }

          tr {
            background: transparent;
          }

          tr:hover {
            color: black;
          }
        }
      }

      .mileage {
        width: 100%;
        height: 20%;
        margin-bottom: 1%;
        background: url("../img/mileage.png") no-repeat;
        background-size: 99% 100%;

        h2 {
          margin-top: 0;
          margin-bottom: 1%;
        }

        .vehicle-mileage {
          width: 45%;
          height: 100%;
        }
      }

      .kilometre {
        width: 50%;
        color: white;

        span {
          font-size: 3vh;
        }

        div {
          line-height: 4vh;
        }
      }


      .map {
        width: 100%;
        height: 42%;
        background: url(../img/amap.png) no-repeat;
        background-size: 99% 100%;
        margin-bottom: 1%;
        position: relative;

        .amap-example {
          width: 93%;
          height: 75%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 1%;
        }

        .statistics {
          width: 50%;
          display: flex;
          justify-content: space-between;
          margin: auto;
          padding-top: 1%;
          color: white;

        }

        .vehicle {
          display: flex;
          color: white;
          width: 80%;
          justify-content: space-between;
          margin: auto;
          padding-top: 5px;

          .el-button {
            width: 100%;
            border: 0;
            color: #00c2fd;
            background: url(../img/bnt.png) no-repeat;
          }
        }
      }
    }


    .property {
      width: 22%;
      height: 100%;
      color: white;


      .security {

        width: 100%;
        height: 22%;
        background: url(../img/security.png) no-repeat;
        background-size: 99% 100%;
        margin-bottom: 5%;
        position: relative;

        .early-warning {
          width: 98%;
          border-bottom: 1px dashed white;

          .active-safety {
            width: 50%;
            padding-bottom: 1%;
            border-right: 1px dashed white;
          }

          .police {
            width: 50%;

          }
        }

        .intelligence {
          margin-top: 3%;

          .high-risk {
            color: red;
          }

          .medium-risk {
            color: orange;
          }

          .low-risk {
            color: yellow
          }
        }

      }

      .suspected-faulty-vehicle {
        width: 100%;
        height: 25%;
        background: url(../img/suspected-faulty-vehicle.png) no-repeat;
        background-size: 99% 100%;
        padding-top: 3%;
        margin-bottom: 5%;

        #suspected-fault {
          width: 100%;
          height: 100%;
        }
      }

      .risk {
        width: 100%;
        height: 33%;
        background: url(../img/risk.png) no-repeat;
        background-size: 99% 100%;
        //margin-top: 5%;
        padding-top: 3%;

        #risk-trend {
          width: 100%;
          height: 90%;
        }
      }
    }
  }
}

.flex {
  display: flex;
}

.around {
  justify-content: space-around;
}

.align {
  text-align: center;
  margin-top: 1vh;
}

//
//.line {
//  line-height: 30px;
//}

.left {
  margin-left: 8%;
}

//.margin{
//  margin-top: -10px;
//}
.icon-huoche {
  color: green;
}
</style>