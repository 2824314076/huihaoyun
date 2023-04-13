<template>
  <div class="container">
    <!-- 分组31b70d5f-499f-44ed-8add-db9947bf87bf开始-->
    <div id="item31b70d5f-499f-44ed-8add-db9947bf87bf">
      <!-- 组件2b7a1a18-5d30-4e7d-8794-e8eb3e5b9d98开始-->

      <div id="item2b7a1a18-5d30-4e7d-8794-e8eb3e5b9d98"></div>
      <!-- 组件2b7a1a18-5d30-4e7d-8794-e8eb3e5b9d98结束-->

      <!-- 组件51f604bb-52a8-4a5b-9eba-78758f281d09开始-->

      <div id="item51f604bb-52a8-4a5b-9eba-78758f281d09">
        <img
            :style="{width: '100%', height: '100%'}"
            alt=""
            src="@/assets/images/84421412-d046-4bd8-9200-a93d829ccae5.png"
        />
      </div>
      <!-- 组件51f604bb-52a8-4a5b-9eba-78758f281d09结束-->
    </div>
    <!-- 分组31b70d5f-499f-44ed-8add-db9947bf87bf结束-->
  </div>
</template>

<script>
import '@/assets/css/index.css'
import "@/assets/css/reset.css"
import "@/assets/css/custom-animation.css";
import * as echarts from 'echarts';
import "echarts-wordcloud";
import "echarts-liquidfill";
import axios from 'axios';
import {swiper, swiperSlide} from "vue-awesome-swiper";
import vueSeamlessScroll from "vue-seamless-scroll";
import 'swiper/css/swiper.css'
import "dayjs/locale/zh-cn";
import countTo from "vue-count-to";

import loading from "@/assets/components/loading/index.vue"

export default {
  data() {
    return {}
  },
  components: {
    swiper,
    swiperSlide,
    vueSeamlessScroll,
    countTo,
    "wt-loading": loading,
  },
  mounted() {
    this.$nextTick(() => {


      /**
       *
       * @param {*} id
       * @param {*} animations
       * 执行动画库函数【不用修改,可自行调整位置】
       * 声明初始值
       * 判断动画是否结束
       */
      function playAnimation(id, animations) {

        let index = 0
        let ele = document.querySelector(id)
        setAnimation(ele, animations[index])
        ele.addEventListener('webkitAnimationEnd', function () {
          if (index < animations.length - 1) {
            index++
            setAnimation(ele, animations[index])
          }
        })
      }

      /**
       *
       * @param {*} element
       * @param {*} animation
       * 执行动画库函数【不用修改,可自行调整位置】
       * 取index对应的动画
       * 给元素animation重新赋值
       */
      function setAnimation(element, animation) {
        const action = `${animation.duration * 1000}ms ease ${animation.delayed * 1000}ms ${animation.loop ? "infinite" : animation.frequency} normal both running ${animation.type}`
        element.style.animation = action
      }
    })

    // 自适应宽度处理


    /**
     *
     * 窗口发生改变自动刷新页面
     * 这样做不太友好，一般做法当前页面大小发生改变去重新加载echarts对象
     * 最好自行修改一下，当然。不要也可以，不会影响功能使用
     *
     */
    window.onresize = () => location.reload()


    this.method2b7a1a18_5d30_4e7d_8794_e8eb3e5b9d98();


    this.method51f604bb_52a8_4a5b_9eba_78758f281d09();


  },
  methods: {


    method2b7a1a18_5d30_4e7d_8794_e8eb3e5b9d98() {


// 基于准备好的dom，初始化地图实例
      const myChart = echarts.init(document.getElementById("item2b7a1a18-5d30-4e7d-8794-e8eb3e5b9d98"));

// 指定地图的配置项
      let option = {
        "visualMap": null,
        "geo": {
          "map": "china",
          "roam": false,
          "zoom": 1,
          "left": "center",
          "top": "middle",
          "bottom": "auto",
          "right": "auto",
          "label": {"show": true, "color": "#ffffff", "fontSize": 12, "fontWeight": "normal", "fontStyle": "normal"},
          "itemStyle": {
            "areaColor": "rgba(20, 27, 51, 0)",
            "borderWidth": 0.8,
            "borderColor": "rgba(0, 188, 212, 0)",
            "borderType": "solid",
            "shadowColor": "rgba(0, 188, 212, 1)",
            "shadowOffsetX": 0,
            "shadowOffsetY": 0,
            "opacity": 1
          },
          "emphasis": {
            "label": {
              "show": true,
              "color": "#ffffff",
              "fontSize": 18,
              "fontWeight": "normal",
              "fontStyle": "normal"
            },
            "itemStyle": {
              "areaColor": "rgba(23, 30, 59, 0)",
              "borderWidth": 1,
              "borderColor": "rgba(34, 48, 85, 0)",
              "borderType": "solid",
              "shadowBlur": 0,
              "shadowColor": "#000000",
              "shadowOffsetX": 0,
              "shadowOffsetY": 0,
              "opacity": 1
            }
          },
          "zlevel": 1
        },
        "series": [{
          "type": "lines",
          "name": "飞行轨迹1",
          "effect": {
            "show": true,
            "period": 3,
            "trailLength": 0.4,
            "symbol": "arrow",
            "symbolSize": 2,
            "color": "rgba(3, 169, 244, 1)"
          },
          "lineStyle": {"color": "rgba(3, 169, 244, 1)", "width": 1, "opacity": 0.1, "curveness": 0.3},
          "emphasis": {"lineStyle": {"color": "rgba(255,67,67,1)", "width": 3, "opacity": 0.5, "curveness": 0.3}},
          "data": [{
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[111.47704161981218, 40.7516612213197], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[111.53543843243, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[110.1863843345, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[112.2453, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[121.5354231668, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[111.6573416186, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[123.18343483315545, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[121.15613843548, 30], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[80, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "coords": [[80, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }],
          "zlevel": 2,
          "symbolSize": 10,
          "large": true,
          "symbol": "circle"
        }, {
          "scalRatio": 5,
          "name": "1",
          "type": "effectScatter",
          "zlevel": 2,
          "legendHoverLink": true,
          "rippleEffect": {
            "color": "rgba(3, 169, 244, 1)",
            "number": 3,
            "period": 4,
            "scale": 4,
            "brushType": "stroke"
          },
          "coordinateSystem": "geo",
          "symbol": "circle",
          "label": {
            "show": false,
            "position": "inside",
            "rotate": 0,
            "color": "#ffffff",
            "fontSize": 12,
            "backgroundColor": "rgba(0,0,0,0)"
          },
          "itemStyle": {
            "color": "rgba(3, 169, 244, 1)",
            "borderColor": "#000",
            "borderWidth": 0,
            "borderType": "solid",
            "borderCap": "butt",
            "shadowBlur": 0,
            "shadowColor": "#333333",
            "shadowOffsetX": 0,
            "shadowOffsetY": 0
          },
          "emphasis": {
            "label": {
              "show": false,
              "position": "inside",
              "rotate": 0,
              "color": "#ffffff",
              "fontSize": 12,
              "backgroundColor": "rgba(0,0,0,0)"
            },
            "itemStyle": {
              "color": "#f4e925",
              "borderColor": "#000",
              "borderWidth": 0,
              "borderType": "solid",
              "borderCap": "butt",
              "shadowBlur": 10,
              "shadowColor": "#333333",
              "shadowOffsetX": 0,
              "shadowOffsetY": 0
            }
          },
          "hoverAnimation": true,
          "data": [{"name": "海门", "value": [111.47704161981218, 40.7516612213197, 9]}, {
            "name": "鄂尔多斯",
            "value": [109.781327, 39.608266, 12]
          }, {"name": "招远", "value": [120.38, 37.35, 12]}, {
            "name": "舟山",
            "value": [122.207216, 29.985295, 12]
          }, {"name": "烟台", "value": [121.39, 37.52, 28]}, {
            "name": "福州",
            "value": [119.3, 26.08, 9]
          }, {"name": "瓦房店", "value": [121.979603, 39.627114, 9]}, {
            "name": "即墨",
            "value": [120.45, 36.38, 9]
          }, {"name": "抚顺", "value": [123.97, 41.97, 9]}, {
            "name": "玉溪",
            "value": [102.52, 24.35, 9]
          }, {"name": "张家口", "value": [114.87, 40.82, 9]}, {
            "name": "阳泉",
            "value": [113.57, 37.85, 9]
          }, {"name": "莱州", "value": [119.942327, 37.177017, 9]}, {
            "name": "湖州",
            "value": [120.1, 30.86, 9]
          }, {"name": "寿光", "value": [118.73, 36.86, 9]}, {
            "name": "盘锦",
            "value": [122.070714, 41.119997, 9]
          }, {"name": "长治", "value": [113.08, 36.18, 9]}, {
            "name": "深圳",
            "value": [114.07, 22.62, 9]
          }, {"name": "珠海", "value": [113.52, 22.3, 9]}, {
            "name": "宿迁",
            "value": [118.3, 33.96, 9]
          }, {"name": "咸阳", "value": [108.72, 34.36, 9]}, {
            "name": "铜川",
            "value": [109.11, 35.09, 9]
          }, {"name": "平度", "value": [119.97, 36.77, 9]}, {
            "name": "佛山",
            "value": [113.11, 23.05, 44]
          }, {"name": "泸州", "value": [105.39, 28.91, 9]}, {
            "name": "西宁",
            "value": [101.74, 36.56, 57]
          }, {"name": "宜宾", "value": [104.56, 29.77, 9]}, {
            "name": "呼和浩特",
            "value": [111.65, 40.82, 9]
          }, {"name": "成都", "value": [104.06, 30.67, 9]}, {
            "name": "大同",
            "value": [113.3, 40.12, 9]
          }, {"name": "镇江", "value": [119.44, 32.2, 9]}, {
            "name": "桂林",
            "value": [110.28, 25.29, 59]
          }, {"name": "张家界", "value": [110.479191, 29.117096, 9]}, {
            "name": "宜兴",
            "value": [119.82, 31.36, 9]
          }, {"name": "北海", "value": [109.12, 21.49, 9]}, {
            "name": "西安",
            "value": [108.95, 34.27, 9]
          }, {"name": "金坛", "value": [119.56, 31.74, 9]}, {
            "name": "东营",
            "value": [118.49, 37.46, 9]
          }, {"name": "牡丹江", "value": [129.58, 44.6, 9]}, {
            "name": "遵义",
            "value": [106.9, 27.7, 63]
          }, {"name": "绍兴", "value": [120.58, 30.01, 9]}, {"name": "扬州", "value": [119.42, 32.39, 9]}]
        }]
      };
      let source = [{
        "name": "飞行轨迹1", "source": {
          "type": "static",
          "filter": {"isFilter": false, "filterId": -1},
          "isAutoUpdate": false,
          "autoUpdateTime": 60,
          "mapping": [{
            "name": "fromName",
            "required": true,
            "description": "起始",
            "type": "string",
            "mapping": "fromName"
          }, {
            "name": "toName",
            "required": true,
            "description": "结束",
            "type": "string",
            "mapping": "toName"
          }, {
            "name": "coords",
            "required": true,
            "description": "[0]起始位置，[1]结束位置",
            "type": "array",
            "mapping": "coords"
          }],
          "static": [{
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[111.47704161981218, 40.7516612213197], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[111.53543843243, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[110.1863843345, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[112.2453, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[121.5354231668, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[111.6573416186, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[123.18343483315545, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[121.15613843548, 30], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[80, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }, {
            "fromName": "合肥",
            "toName": "宁夏",
            "count": "1",
            "amount": "89999",
            "coords": [[80, 37.879372079826645], [106.06465794629244, 37.879372079826645]]
          }],
          "api": {
            "sourcesId": -1,
            "requestType": "GET",
            "requestHeader": {"token": null},
            "getParam": "",
            "postParam": {},
            "requestUrl": "",
            "cookie": false,
            "postMethods": "raw"
          },
          "mysql": {"sourcesId": -1, "database": -1, "sql": ""},
          "elasticsearch": {"sourcesId": -1, "query": {"index": "_all"}},
          "mongodb": {"sourcesId": -1, "query": {}, "collection": -1},
          "csv": {}
        }
      }, {
        "name": "1", "source": {
          "type": "static",
          "isAutoUpdate": false,
          "autoUpdateTime": 60,
          "filter": {"isFilter": false, "filterId": -1},
          "mapping": [{
            "name": "name",
            "required": true,
            "description": "名称",
            "type": "string",
            "mapping": "name"
          }, {"name": "value", "required": true, "description": "值", "type": "array", "mapping": "value"}],
          "static": [{"name": "海门", "value": [111.47704161981218, 40.7516612213197, 9]}, {
            "name": "鄂尔多斯",
            "value": [109.781327, 39.608266, 12]
          }, {"name": "招远", "value": [120.38, 37.35, 12]}, {
            "name": "舟山",
            "value": [122.207216, 29.985295, 12]
          }, {"name": "烟台", "value": [121.39, 37.52, 28]}, {
            "name": "福州",
            "value": [119.3, 26.08, 9]
          }, {"name": "瓦房店", "value": [121.979603, 39.627114, 9]}, {
            "name": "即墨",
            "value": [120.45, 36.38, 9]
          }, {"name": "抚顺", "value": [123.97, 41.97, 9]}, {
            "name": "玉溪",
            "value": [102.52, 24.35, 9]
          }, {"name": "张家口", "value": [114.87, 40.82, 9]}, {
            "name": "阳泉",
            "value": [113.57, 37.85, 9]
          }, {"name": "莱州", "value": [119.942327, 37.177017, 9]}, {
            "name": "湖州",
            "value": [120.1, 30.86, 9]
          }, {"name": "寿光", "value": [118.73, 36.86, 9]}, {
            "name": "盘锦",
            "value": [122.070714, 41.119997, 9]
          }, {"name": "长治", "value": [113.08, 36.18, 9]}, {
            "name": "深圳",
            "value": [114.07, 22.62, 9]
          }, {"name": "珠海", "value": [113.52, 22.3, 9]}, {
            "name": "宿迁",
            "value": [118.3, 33.96, 9]
          }, {"name": "咸阳", "value": [108.72, 34.36, 9]}, {
            "name": "铜川",
            "value": [109.11, 35.09, 9]
          }, {"name": "平度", "value": [119.97, 36.77, 9]}, {
            "name": "佛山",
            "value": [113.11, 23.05, 44]
          }, {"name": "泸州", "value": [105.39, 28.91, 9]}, {
            "name": "西宁",
            "value": [101.74, 36.56, 57]
          }, {"name": "宜宾", "value": [104.56, 29.77, 9]}, {
            "name": "呼和浩特",
            "value": [111.65, 40.82, 9]
          }, {"name": "成都", "value": [104.06, 30.67, 9]}, {
            "name": "大同",
            "value": [113.3, 40.12, 9]
          }, {"name": "镇江", "value": [119.44, 32.2, 9]}, {
            "name": "桂林",
            "value": [110.28, 25.29, 59]
          }, {"name": "张家界", "value": [110.479191, 29.117096, 9]}, {
            "name": "宜兴",
            "value": [119.82, 31.36, 9]
          }, {"name": "北海", "value": [109.12, 21.49, 9]}, {
            "name": "西安",
            "value": [108.95, 34.27, 9]
          }, {"name": "金坛", "value": [119.56, 31.74, 9]}, {
            "name": "东营",
            "value": [118.49, 37.46, 9]
          }, {"name": "牡丹江", "value": [129.58, 44.6, 9]}, {
            "name": "遵义",
            "value": [106.9, 27.7, 63]
          }, {"name": "绍兴", "value": [120.58, 30.01, 9]}, {"name": "扬州", "value": [119.42, 32.39, 9]}],
          "api": {
            "sourcesId": -1,
            "requestType": "GET",
            "requestHeader": {"token": null},
            "getParam": "",
            "postParam": {},
            "requestUrl": "",
            "cookie": false,
            "postMethods": "raw"
          },
          "mysql": {"sourcesId": -1, "database": -1, "sql": ""},
          "elasticsearch": {"sourcesId": -1, "query": {"index": "_all"}},
          "mongodb": {"sourcesId": -1, "query": {}, "collection": -1},
          "csv": {}
        }
      }]

// 获取地图geo 数据
      const gismap = require("../assets/gismap/full/" + option.geo.map + ".json");
      echarts.registerMap(option.geo.map, gismap);

      const gismapBorder = require("../assets/gismap/border/" + option.geo.map + ".json");

// 获取不同数据源的数据
      const handleData = (source) => {
        if (source.length > 0) {
          source.forEach(item => {
            if (item.source.type == 'static') {
              handleFilterMapping(item, item.source.static)
            } else if (item.source.type == 'api') {
              const {requestType, requestHeader, getParam, postParam, requestUrl, cookie, sources} = item.source.api
              axios({
                url: sources.baseURL + requestUrl + (getParam ? '?' + getParam : getParam),
                type: requestType,
                data: postParam,
                headers: requestHeader,
                dataType: "json",
                xhrFields: {withCredentials: cookie},
              }).then(({data}) => {
                handleFilterMapping(item, data)
              })
            }
          })
          setOption()
        } else {
          setOption()
        }
      }

// 数据处理 -- 过滤器与映射
      const handleFilterMapping = (i1, source) => {
        const mp = i1.source.mapping;
        const fs = option.series.find(i => i.name == i1.name)
        const fsI = option.series.findIndex(i => i.name == i1.name)
        if (i1.source.filter.isFilter) {
          const filterFn = (data, callbackArgs) => {
            const filterFunction = {
              init: eval(`(function filterFn(data, callbackArgs) {
                ${i1.source.filter.data.code}
              })`)
            }
            return filterFunction.init()
          }
          source = filterFn(source)
        }
        if (fs.type == "lines") {
          const mapping1 = mp.find(i => i.name == "fromName").mapping;
          const mapping2 = mp.find(i => i.name == "toName").mapping;
          const mapping3 = mp.find(i => i.name == "coords").mapping;
          fs.data = source.map((i2) => {
            return {fromName: i2[mapping1], toName: i2[mapping2], coords: i2[mapping3]};
          })
        } else if (fs.type == "effectScatter") {
          const mapping1 = mp.find(i => i.name == "name").mapping;
          const mapping2 = mp.find(i => i.name == "value").mapping;
          fs.data = source.map((i2) => {
            return {name: i2[mapping1], value: i2[mapping2]};
          })
          fs.symbolSize = (data) => {
            return data[2] / fs.scalRatio;
          };
        } else if (fs.type == 'map' && fs.map.indexOf("-border") == -1) {
          const mapping1 = mp.find(i => i.name == "name").mapping;
          const mapping2 = mp.find(i => i.name == "value").mapping;
          fs.data = source.map((i2) => {
            return {name: i2[mapping1], value: i2[mapping2]};
          })
        }
        setOption()
      }

// 初始化地图
      const setOption = () => {
        echarts.registerMap(option.geo.map, gismap);
        option.series.find(item => item.type == "map" && item.map.indexOf("-border") != -1) !== undefined ? echarts.registerMap(option.geo.map + "-border", gismapBorder) : "";
        myChart.setOption(option);
      }

// 定时器
      const initAutoUpdateTimer = (source) => {
        source.forEach((i1) => {
          if (i1.source.isAutoUpdate) setInterval(() => handleData([i1]), i1.source.autoUpdateTime * 1000)
        })
      }
// 初始化
      const init = (source) => {
        handleData(source)
        initAutoUpdateTimer(source)
      }
// 入口
      init(source)
    },


    method51f604bb_52a8_4a5b_9eba_78758f281d09() {

    },


  },
};
</script>

<style></style>
