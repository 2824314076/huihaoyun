<template>
  <div class="maps">
    <div class="map-container">
      <div id="mapEchart" class="map-chart"></div>
    </div>
  </div>
</template>

<script>
import china from "@/json/china.json"
import * as echarts from "echarts"
import "echarts-gl"

export default {
  name: "idnex.vue",
  data() {
    return {
      path: "path://M727.5,923.582V342.756c0-5.295,2.637-10.256-5.043-10.256h-52.139c8.865,0,6.182-5.204,6.182-11.831V206.928L517.985,71.5H397.447c-8.864,0-20.947,5.541-20.947,12.169v158.685c0,0-0.418-0.01-0.551-0.01c-44.088,0-79.904,35.739-79.904,79.825s35.856,79.824,79.943,79.824c0.133,0,0.512-0.009,0.512-0.01v230.371c0,0-0.418-0.01-0.551-0.01c-44.088,0-79.904,35.738-79.904,79.824s35.856,79.824,79.943,79.824c0.133,0,0.512-0.01,0.512-0.01v131.599c0,5.294,10.312,8.918,17.994,8.918h327.963C730.137,932.5,727.5,928.876,727.5,923.582z",
      formdata: [{
        fromName: "宁夏",
        toName: "北京",
        coords: [
          [106.16835930675644, 36.275499819866724],
          [116.24, 39.55, 3],
        ]
      },
        {
          fromName: "宁夏",
          toName: "南京",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [118.78, 32.04, 3],
          ]
        }, {
          fromName: "宁夏",
          toName: "新疆",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [75.96513, 39.5508, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "新疆",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [82.86702, 37.122936, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "拉萨",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [91.87708, 32.707066, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "昆明",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [103.33712, 25.766817, 3],
          ]
        }, {
          fromName: "宁夏",
          toName: "广西",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [110.06905, 23.330242, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "内蒙",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [119.588264, 42.435814, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "天津",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [117.34314, 38.917088, 3]
          ]
        }, {
          fromName: "宁夏",
          toName: "山西",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [112.002045, 37.356205, 3]
          ]
        },
        {
          fromName: "宁夏",
          toName: "西安",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [108.11138, 34.712715, 3]
          ]
        },
        {
          fromName: "宁夏",
          toName: "重庆",
          coords: [
            [106.16835930675644, 36.275499819866724],
            [106.54, 29.59, 3],
          ]
        }
      ],
      data: [{
        value: [116.24, 39.55, 3],

      },
        {
          name: "宁夏",
          value: [106.16835930675644, 36.275499819866724]
        },

        {
          name: "重庆",
          value: [106.54, 29.59, 3]
        },
        {
          name: "南京",
          value: [118.78, 32.04, 3]
        }, {
          name: "新疆",
          value: [75.96513, 39.5508, 3]
        }, {
          name: "新疆",
          value: [82.86702, 37.122936, 3]
        },
        {
          name: "广西",
          value: [110.06905, 23.330242, 3]
        }, {
          name: "拉萨",
          value: [91.87708, 32.707066, 3]
        }, {
          name: "兰州",
          value: [104.03547, 35.956074, 3]
        }, {
          name: "西安",
          value: [108.11138, 34.712715, 3]
        }, {
          name: "山西",
          value: [112.002045, 37.356205, 3]
        }, {
          name: "天津",
          value: [117.34314, 38.917088, 3]
        }, {
          name: "北京",
          value: [116.00901, 39.703346, 3]
        }, {
          name: "内蒙",
          value: [119.588264, 42.435814, 3]
        },
        {
          name: "昆明",
          value: [103.33712, 25.766817, 3],
        }

      ]
    }
  },
  mounted() {
    this.chartMap();
  },
  beforeDestroy() {
    // 防止内存泄露
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    chartMap() {
      var myChart = echarts.init(document.getElementById("mapEchart"));
      echarts.registerMap("china", china);
      myChart.hideLoading();
      // 图表配置项
      let option = {
        geo3D: {
          map: "china",
          zoomEnable: true,
          zlevel: 20,
          regionHeight: 5,
          boxWidth: 200,
          boxHeight: 0,
          // realisticMaterial:{
          //   detailTexture:""
          // },
          itemStyle: {
            color: "#7a94fe",
            opacity: 1,
            borderWidth: 0.4,
            borderColor: "#000",
            areaColor: '#fff'
          },
          viewControl: {
            beta: 0, //x轴旋转
            alpha: 50, //Y轴旋转
            rotateSensitivity: 0,
            projection: 'orthographic',
            orthographicSize: 150,
            maxOrthographicSize: 140,
            minOrthographicSize: 140,

          },
          light: { // 光照相关的设置。在 shading 为 'color' 的时候无效。
            // 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
            main: { // 场景主光源的设置，在 globe 组件中就是太阳光。
              color: '#d5dff6', // 主光源的颜色。[ default: #fff ]
              intensity: 1.1, // 主光源的强度。[ default: 1 ]
              shadow: true, // 主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
              alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
              beta: 30, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
            },
            ambient: { // 全局的环境光设置。
              color: '#fff', // 环境光的颜色。[ default: #fff ]
              intensity: 0.1, // 环境光的强度。[ default: 0.2 ]
            },
          },
          emphasis: {
            disabled: true, //是否可以被选中
            label: {
              //移入时的高亮文本
              show: true,
              color: "#fff", //显示字体颜色变淡
              fontSize: 14, //显示字体变大
              fontWeight: 900
            },
            itemStyle: {
              color: "#90cb75" //显示移入的区块变粉色
            }
          },
          label: {
            show: true,
            position: "top",
            color: "#fff", //地图初始化区域字体颜色
            fontSize: 14,
            lineHeight: 0,
            fontWeight: 900
          },
          regions: [
            {
              name: "宁夏",
              itemStyle: {
                color: "#90cb75",
                opacity: 1,
              },
              label: {
                show: true
              }
            }
          ]
          // shading: "lambert",
        },
        series: [
          //坐标点
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            zlevel: 5,
            symbolSize: 8,
            rippleEffect: { //坐标点动画
              period: 3,
              scale: 5,
              brushType: 'fill'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                // backgroundColor: '#fff',
                textStyle: {
                  color: '#c0e6f2',
                  borderWidth: 1,
                  // borderColor: 'red',
                  fontWeight: "bold",
                  fontSize: 12
                },

              }
            },

            data: this.data,
            itemStyle: { //坐标点颜色
              normal: {
                show: true,
                color: '#7afaf9',
                shadowBlur: 50,
                // shadowColor: '#fff'
              },
            },
          },
          // 线 和 点
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            zlevel: 1, //设置这个才会有轨迹线的小尾巴
            polyline: false,
            effect: {
              show: true,
              period: 2,
              trailLength: 1,
              trailColor: 'green',
              color: '#ffffff', //流动点颜色
              symbol: this.path,
              symbolSize: 15
            },
            lineStyle: {
              normal: {
                color: 'rgba(255,255,255,0)', //线条颜色
                width: 1.5,
                curveness: 0.2,
                shadowColor: '#ffffff',
              }
            },
            blendMode: 'lighter',
            data: this.formdata

          },
        ]
      }
      myChart.setOption(option);
      window.onresize = function () {
        myChart.resize();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.maps {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

  .map-container {
    width: 100%;
    height: 100%;
    position: relative;

    .map-container-title {
      margin: 56px 0 16px;
      font-size: 24px;
      font-weight: 700;
      color: #333;
      line-height: 30px;
      display: flex;
      justify-content: center;
    }

    .map-chart {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      height: 70vh;
      width: 100%;
      margin-left: -1.5%;
      margin-top: -1.5%;
    }
  }
}
</style>
