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
        <el-button class="button" @click="opens('http://222.75.204.3:8081/#/login')">管理平台</el-button>
        <!--        <el-button class="button" @click="opens('http://222.75.204.17:12503/webgis/login.jsp')">危货运输<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></el-button>-->
        <el-dropdown
            class="button">
          <div style="line-height: 4vh">宁东各局<i class="el-icon-arrow-down el-icon--right"></i></div>
          <el-dropdown-menu slot="dropdown" class="dropdownMenu">
            <el-dropdown-item v-for="(item,index) in bureaus" :key="index">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
            class="button">
          <div style="line-height: 4vh">综合运输<i class="el-icon-arrow-down el-icon--right"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in goods" :key="index">{{ item.lable }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--        <el-button class="button" @click="opens('https://pc.huihaoyun.cn/login.html?v=1324/')">普货运输</el-button>-->
      </div>
      <div>
        <h1 style="margin-top: 8%">{{ this.titlename }}</h1>
      </div>
      <div class="right">
        <el-button class="button" @click="opens()">客运运输</el-button>
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
                <div v-for="(ite,ind) in ('000000'+ item.number).slice(-6)" :key="ind" class="total">
                  <div>{{ ("0" + ite).slice(-1) }}</div>
                </div>
              </div>
              <div>{{ item.name }}</div>
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
          </div>
          <div id="chart1"></div>
        </div>
      </div>
      <!--  地图  -->
      <div class="analysis">
        <div class="map">
          <about></about>
        </div>
        <div class="roll">
          <el-table
              :data="tabledata"
              height="99%"
              ref="table"
              @row-click="Tablemap"
              @cell-mouse-enter="mouseEnter"
              @cell-mouse-leave="mouseLeave"
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
                label="所属业户"
                width="100%">
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
              <div class="high-risk">28</div>
              <div>高风险</div>
            </div>
            <div>
              <div class="medium-risk">8</div>
              <div>中风险</div>
            </div>
            <div>
              <div class="low-risk">38</div>
              <div>低风险</div>
            </div>
          </div>
        </div>
        <div class="suspected-faulty-vehicle">
          <div class="left">驾驶员异常报警分布</div>
          <div id="suspected-fault"></div>
        </div>
        <div class="risk">
          <div class="left">当月疫情风险趋势</div>
          <div id="risk-trend"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../css/font/iconfont.css"
import axios from "axios"
import about from "@/views/idnex"
import "@/css/home.css"

export default {
  name: 'HomeView',
  components: {
    about
  },
  data() {
    return {
      timeId: null,
      bureaus: ["建设和交通局", "科技和信息化局"],
      goods: [
        {
          lable: "危货运输"
        },
        {
          lable: "普货运输"
        },
        {
          lable: "公铁联运"
        },
      ],

      tabledata: [
        {
          date: '宁AK2600',
          name: '秦放',
          address: '宁夏',
          Belonging: '众鑫运输',
          type: '腐蚀品',
          description: '五氧化二磷',
          tonnage: '10吨'
        }, {
          marker: [106.7821, 38.1919],
          date: '宁AG8205',
          name: '罗致',
          address: '宁夏',
          Belonging: '众鑫运输',
          type: '第七类',
          goods: '危货',
          description: '海洋污染物',
          tonnage: '13吨'
        }, {
          marker: [106.567, 38.192],
          date: '宁AB9991',
          name: '王鑫',
          address: '宁夏',
          Belonging: '孚惠工贸',
          goods: '危货',
          type: '爆炸品',
          description: '液态二氧化碳',
          tonnage: '8吨'
        }, {
          marker: [107.567821, 32.192319],
          date: '宁AL0897',
          name: '张猛',
          address: '宁夏',
          Belonging: '众鑫运输',
          goods: '危货',
          type: '易燃物',
          description: '甲烷',
          tonnage: '20吨'
        }, {
          marker: [110, 38.192319],
          date: '宁AM9098',
          name: '褚宇',
          address: '宁夏',
          Belonging: '	孚惠工贸',
          goods: '危货',
          type: '放射线物',
          description: '二氧化镅',
          tonnage: '26吨'
        }, {
          marker: [100, 30],
          date: '宁AJ8338',
          name: '李兴浩',
          address: '宁夏',
          Belonging: '众鑫运输',
          goods: '危货',
          type: '氧化剂',
          description: '氯酸钾',
          tonnage: '30吨'
        }, {
          marker: [92, 40],
          date: '宁AL0875',
          name: '张浩',
          address: '宁夏',
          Belonging: '众鑫运输',
          type: '毒害品',
          goods: '危货',
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
            data: []
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
            data: []
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
            data: []
          }
        ]
      },
      totals: [
        {
          name: '企业总数',
          number: '38'
        }, {
          name: '车辆总数',
          number: '19'
        }, {
          name: '运营商总数',
          number: '3'
        },
      ],
      button_id: ['今日报警分布', '驾驶异常分布'],
      name: '车辆报警分布',
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
      marker: [106.567821, 38.192319],
      iconStyle: [],
      totaldata: {
        total: 200,
        online: 154,
        offline: 46,
      },
      access_token: '',
      refresh_token: '',
      titlename: '',
      alarm: {}
    }
  },
  mounted() {
    this.config()
    // this.Group()
    // this.warnGroup()
    this.autoscroll()
    this.getmounted()
  },
  filters: {
    filtertotal(data) {
      if (data == 'offline') {
        return '离线车辆'
      } else if (data == 'total') {
        return '车辆总数'
      } else if (data == 'online') {
        return '在线车辆'
      }
    },
  },
  methods: {
    iconColor() {
      // this.iconStyle = []
      for (let i = 0; i < this.tableData.length; i++) {
        switch (this.tableData[i].goods) {
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
    Tablemap(row){
      this.marker=row.marker
    },
    getmounted() {
      this.getEchartData()
      this.getEchartData1()
      this.getEchartfaulty()
      this.getTime()
      this.getEchartvehicle()
      this.autoscroll()
      this.iconColor()
    },
    getEchartData() {
      const myChart = this.$echarts.init(document.getElementById('chart'));
      myChart.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart.resize()
      })

    },
    getEchartData1() {
      let myChart = this.$echarts.init(document.getElementById('chart1'));
      myChart.setOption(this.options);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getEchartfaulty() {
      let myChart = this.$echarts.init(document.getElementById('suspected-fault'));
      myChart.setOption(this.faulty);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getTime() {
      let data = [
        [39, 89, 6, 93, 33, 25, 31, 30, 67, 35, 58, 100, 72, 44, 73, 66, 8, 0, 10, 68, 1, 55, 60, 14, 61, 84, 87, 80, 71, 82, 92],
        [34, 8, 23, 33, 42, 41, 28, 1, 47, 14, 32, 9, 14, 7, 32, 17, 12, 6, 26, 4, 18, 20, 18, 12, 38, 35, 49, 9, 43, 40, 11],
        [35, 39, 93, 67, 47, 98, 19, 32, 42, 23, 48, 15, 85, 57, 90, 77, 41, 65, 83, 16, 80, 82, 30, 33, 34, 58, 44, 53, 40, 25, 89],
      ]
      let date = new Date()
      let day = date.getDate()
      for (let i = 0; i < this.trend.series.length; i++) {
        for (let j = 0; j < day; j++) {
          this.trend.series[i].data.push(data[i][j])
        }
      }
      this.getEcharttrend()
    },
    getEcharttrend() {
      let myChart = this.$echarts.init(document.getElementById('risk-trend'));
      myChart.setOption(this.trend);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    getEchartvehicle(res) {
      let myChart = this.$echarts.init(document.getElementById('yesterday-mileage'));
      var option = {
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
              {
                value: res.value[0],
                name: res.x[0]
              }, {
                value: res.value[1],
                name: res.x[1]
              }, {
                value: res.value[2],
                name: res.x[2]
              }, {
                value: res.value[3],
                name: res.x[3]
              }, {
                value: res.value[4],
                name: res.x[4]
              }, {
                value: res.value[5],
                name: res.x[5]
              }, {
                value: res.value[6],
                name: res.x[6]
              },
            ],
          }
        ]
      }
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    gettotal() {
      let that = this
      var token = localStorage.players
      axios.get(
          'http://222.75.204.3:8081/basic/dashboard-set/vehicle/count?regionCode=640181',
          {
            headers:
                {
                  // Authorization: token
                  Authorization: token
                }
          }
      ).then(function (res) {
        that.totals[1].number = res.data.data.total.toString()
        that.totaldata.total = res.data.data.total
        that.totaldata.online = res.data.data.online
        that.totaldata.offline = res.data.data.offline
      }).catch(function (err) {
      })
    },
    userinfo(token) {
      let that = this

      axios.get('http://222.75.204.3:8081/basic/user/info', {
        params: {
          access_token: token,
        }
      }).then(function (res) {
        that.titlename = res.data.data.sysUser.platformName
      })
    },
    config() {
      let that = this
      let Authorization = 'Basic dGVzdDp0ZXN0'
      axios.post(
          'http://222.75.204.3:8081/auth/oauth/token?username=admin&password=9894%2B9Yxne9Lhe3Hz%2BWvQQ%3D%3D&grant_type=password&scope=server',
          {}, {
            headers:
                {
                  Authorization: Authorization
                }
          }
      ).then(function (res) {
        that.access_token = res.data.token_type + ' ' + res.data.access_token
        that.refresh_token = res.data.token_type + ' ' + res.data.refresh_token
        localStorage.players = res.data.token_type + ' ' + res.data.access_token
        that.gettotal()
        that.userinfo(res.data.access_token)
        that.Group()
        that.warnGroup()
      }).catch(function (err) {
      })

    },
    autoscroll() {
      const table = this.$refs.table
      const divData = table.bodyWrapper;
      this.timeId = setInterval(() => {
        divData.scrollTop += 1;
        if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
          divData.scrollTop = 0;
        }
      }, 30);
    },
    mouseEnter() {
      clearInterval(this.timeId)
    },
    mouseLeave() {
      this.autoscroll()
    },
    Group() {
      let that = this
      var token = localStorage.players
      axios('http://222.75.204.3:8081/report/chart/driverDsm?warnGroup=2',
          {
            methods: "get",
            headers: {
              Authorization: token
            }
          }).then((res) => {
        this.getEchartvehicle(res.data.data)
      })
    },
    warnGroup() {
      let that = this
      axios('http://43.142.179.198:8081/carcount/getList',
          {
            methods: "get",
          }).then((res) => {
        this.alarm = res.data.data.list
      })

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
      line-height: 0;

    }

    .right {
      width: 25%;
      display: flex;
      justify-content: space-between;
      margin-right: 5%;
    }

    .button {
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
            margin-right: 2%;

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
        height: 18%;
        overflow: hidden;
        background: url("../img/roll.png") no-repeat;
        background-size: 99% 100%;
        //margin-top:-3%;


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
          width: 50%;
          height: 100%;
        }
      }

      .kilometre {
        color: white;
        text-align: center;
        margin-top: -1%;
        position: relative;

        span {
          font-size: 3vh;
        }

        //
        //div {
        //  line-height: 3vh;
        //}
      }


      .map {
        width: 100%;
        height: 66%;
        background: url(../img/amap.png) no-repeat;
        background-size: 97% 100%;
        margin-bottom: 1%;
        position: relative;
        //margin-top: -1%;
        padding: 1%;


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

//.margin{
//  margin-top: -10px;
//}
.icon-huoche {
  color: green;
}

.ad {
  color: #1aac19;
}

::v-deep.row {
  background: transparent;

  row-item {
    background: transparent;
  }
}
</style>