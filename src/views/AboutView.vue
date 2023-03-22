<template>
  <div className="content">
    <div
        ref="charts"
        style="width: 60vw; height: 70vh;margin:0 auto"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import china from '@/assets/china.json'
import '@/js/china'
import "@/js/echarts-gl.min"

export default {
  data() {
    return {
      points: [ // 散点图数据
        {name: '新疆', value: [87.628579, 43.793301], itemStyle: {color: '#00EEFF'}}, // 新疆
        {name: '四川', value: [104.076452, 30.651696], itemStyle: {color: '#00EEFF'}}, // 四川
        {name: '甘肃', value: [103.826777, 36.060634], itemStyle: {color: '#00EEFF'}}, // 甘肃
        {name: '云南', value: [102.709372, 25.046432], itemStyle: {color: '#00EEFF'}}, // 云南
        {name: '广西', value: [108.327537, 22.816659], itemStyle: {color: '#00EEFF'}}, // 广西
        {name: '湖南', value: [112.982951, 28.116007], itemStyle: {color: '#00EEFF'}}, // 湖南
        {name: '山东', value: [117.020725, 36.670201], itemStyle: {color: '#00EEFF'}}, // 山东
        {name: '河南', value: [113.753094, 34.767052], itemStyle: {color: '#00EEFF'}}, // 河南
        {name: '山西', value: [112.578781, 37.813948], itemStyle: {color: '#00EEFF'}}, // 山西
        {name: '福建', value: [119.296194, 26.101082], itemStyle: {color: '#00EEFF'}}, // 福建
        {name: '浙江', value: [120.152575, 30.266619], itemStyle: {color: '#00EEFF'}}, // 浙江
        {name: '江苏', value: [118.763563, 32.061377], itemStyle: {color: '#00EEFF'}}, // 江苏
        {name: '北京', value: [116.407387, 39.904179], itemStyle: {color: '#A6283F'}}, // 北京
        {name: '陕西', value: [108.953939, 34.266611], itemStyle: {color: '#00EEFF'}}, // 陕西
        {name: '广东', value: [113.266887, 23.133306], itemStyle: {color: '#00EEFF'}} // 广东
      ],
      linesData: [// 线条数据
        {coords: [[116.407387, 39.904179], [87.628579, 43.793301]]},// 北京->新疆
        {coords: [[116.407387, 39.904179], [104.076452, 30.651696]]},// 北京->四川
        {coords: [[116.407387, 39.904179], [103.826777, 36.060634]]},// 北京->甘肃
        {coords: [[116.407387, 39.904179], [102.709372, 25.046432]]},// 北京->云南
        {coords: [[116.407387, 39.904179], [108.327537, 22.816659]]},// 北京->广西
        {coords: [[116.407387, 39.904179], [112.982951, 28.116007]]},// 北京->湖南
        {coords: [[116.407387, 39.904179], [117.020725, 36.670201]]},// 北京->山东
        {coords: [[116.407387, 39.904179], [113.753094, 34.767052]]},// 北京->河南
        {coords: [[116.407387, 39.904179], [112.578781, 37.813948]]},// 北京->山西
        {coords: [[116.407387, 39.904179], [119.296194, 26.101082]]},// 北京->福建
        {coords: [[116.407387, 39.904179], [120.152575, 30.266619]]},// 北京->浙江
        {coords: [[116.407387, 39.904179], [118.763563, 32.061377]]},// 北京->安徽
        {coords: [[116.407387, 39.904179], [113.266887, 23.133306]]},// 北京->广东
        {coords: [[116.407387, 39.904179], [108.953939, 34.266611]]}// 北京->陕西
      ],
      planePath: // 飞机svg
          'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      const charts = echarts.init(this.$refs['charts'])
      const option = {
        // backgroundColor: '#0E2152',// 背景颜色
        geo: {// 地图配置
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。开启缩放'scale'，开启平移'move'。设置成 true 为都开启
          zoom: 1.23, // 当前视角的缩放比例
          scaleLimit: { // 滚轮缩放的极限控制，默认的缩放为1
            min: 1,  // 最小的缩放值
            max: 10,  // 最大的缩放值
          },
          map: 'china',
          label: { // 图形上的文本标签
            normal: {// 通常状态下的样式
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {// 鼠标放上去高亮的样式
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {// 地图区域的样式设置
            normal: { // 通常状态下的样式
              borderColor: '#5089EC',
              borderWidth: 1,
              areaColor: { //地图区域的颜色
                type: 'radial', // 径向渐变
                x: 0.5, // 圆心
                y: 0.5,// 圆心
                r: 0.8,// 半径
                colorStops: [
                  { // 0% 处的颜色
                    offset: 0,
                    color: 'rgba(0, 102, 154, 0)'
                  },
                  { // 100% 处的颜色
                    offset: 1,
                    color: 'rgba(0, 102, 154, .4)'
                  }
                ]
              }
            },
            // 鼠标放上去高亮的样式
            emphasis: {
              areaColor: '#2386AD',
              borderWidth: 0
            }
          }
        },
        series: [
          { // 散点系列数据
            type: 'effectScatter',// 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo', //该系列使用的坐标系:地理坐标系
            // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
            effectType: 'ripple',
            // 配置何时显示特效。可选'render'和'emphasis' 。
            showEffectOn: 'render',
            rippleEffect: { // 涟漪特效相关配置。
              period: 100, // 动画的周期，秒数。
              scale: 4,// 动画中波纹的最大缩放比例。
              // 波纹的绘制方式，可选 'stroke' 和 'fill'。
              brushType: 'fill'
            },
            zlevel: 1, // 所有图形的 zlevel 值。
            data: this.points
          },
          { // 线条系列数据
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'], // 标记的图形: 箭头
            symbolSize: 10, // 标记的大小
            effect: { // 线条特效的配置
              show: true,
              period: 6, // 特效动画的时间，单位s
              trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
              symbol: this.planePath, // 特效图形的标记 可选'circle'等
              symbolSize: 15// 特效标记的大小
            },
            lineStyle: { // 线条样式
              normal: {
                color: '#93EBF8',
                width: 2.5, // 线条宽度
                opacity: 0.6, // 尾迹线条透明度
                curveness: 0.2// 尾迹线条曲直度
              }
            },
            data: this.linesData
          }
        ]
      }
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      echarts.registerMap('china', china)
      charts.setOption(option)
    },
    // int(){
    //   const charts = echarts.init(this.$refs['charts'])
    //   var option = {
    //     series: [{
    //       type: 'map3D',
    //       map: 'china',
    //       name: 'china',
    //       // zlevel: -10,
    //       boxWidth: 180,
    //       boxHeight:30,
    //       boxDepth: 180,//地图倾斜度
    //       regionHeight: 3,//地图厚度
    //       // environment: 'imgs/19.jpeg',
    //       //环境贴图，这里用的是渐变色
    //       // environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //       // 			  offset: 0, color: '#00aaff' // 天空颜色
    //       // 			}, {
    //       // 			  offset: 0.7, color: '#FFF' // 地面颜色
    //       // 			}, {
    //       // 			  offset: 1, color: '#A2875E' // 地面颜色
    //       // 			}], false),
    //       // 标签设置
    //       /*groundPlane:{
    //         show:true,
    //         color:'#aaa'
    //       },*/
    //       label: {
    //         show: true,//是否显示市
    //         // formatter: '{b} : test{c}',
    //         textStyle: {
    //           color: "#fff",//文字颜色
    //           fontSize: 16,//文字大小
    //           fontFamily: '微软雅黑',
    //           // opacity: 1,
    //           backgroundColor: "rgba(0,0,0,0)",//透明度0清空文字背景
    //         },
    //       },
    //       //三维视觉属性
    //       itemStyle: {
    //         //opacity: 1, // 透明度
    //         //color: '#4575b4',//地图颜色
    //         //borderWidth: 1.5,//分界线宽度
    //         //borderColor: "#459bca",//分界线颜色
    //         areaColor: 'rgba(255,255,255,0)',
    //         // color: '#ffffff',
    //         opacity: 1,
    //         borderWidth: 1,
    //         borderColor: '#A299DA'
    //       },
    //       // 鼠标hover高亮
    //       emphasis: {
    //         label: {
    //           show: true,//是否显示标签
    //           /*textStyle: {
    //             color: 'yellow',//高亮文字颜色
    //             fontSize: 32,
    //             fontFamily: '微软雅黑'
    //           },
    //           formatter: '{b}: {c}'*/
    //         },
    //         //高亮区块颜色
    //         // itemStyle: {
    //         //     color: '#000'
    //         // }
    //         itemStyle: {
    //           areaColor: '#61A4E4',
    //           //color: '#61A4E4',
    //           borderColor:'#88BAEA',
    //           // borderWidth:2,
    //         }
    //       },
    //       light: {
    //         main: {
    //           intensity:1,
    //           shadow: true,
    //           shadowQuality: 'ultra',
    //         },
    //
    //       },
    //       groundplane: {
    //         show: false
    //       },
    //       //data: data,
    //
    //       //用了没有效果，还没找到原因，求指点
    //       /*regions: [
    //         {   // 可对单个地图区域进行设置
    //           name: '昌平区',    // 所对应的地图区域的名称
    //           //regionHeight: '', // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
    //           itemStyle: {    // 单个区域的样式设置
    //             color: '#00FF00',
    //             opacity: 1,
    //             borderWidth: 0.4,
    //             borderColor: '#5F9EA0'
    //           },
    //         }, {
    //           name: '海淀区',
    //           itemStyle: {
    //             color: '#EEEE00',
    //             opacity: 1,
    //             borderWidth: 0.4,
    //             borderColor: '#5F9EA0'
    //           }
    //         }
    //       ],*/
    //       /*
    //         shading三维图形的着色效果,值：
    //           'color'只显示颜色，不受光照等因素影响。
    //           'lambert'通过景点的lambert着色表现光照的明暗
    //           'realistic'真是感渲染
    //       */
    //       shading: 'realistic',
    //       // 真实感材质相关配置 shading: 'realistic'时有效
    //       realisticMaterial: {
    //         detailTexture: '#fff', // 纹理贴图
    //         textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
    //         roughness: 0.8, // 材质粗糙度，0完全光滑，1完全粗糙
    //         metalness: 0, // 0材质是非金属 ，1金属
    //         roughnessAdjust: 0
    //       },
    //       viewControl: {
    //         //distance: 150,// 地图视角 控制初始大小
    //         //rotateSensitivity: 1,// 旋转
    //         //zoomSensitivity: 1,// 缩放
    //         projection: 'perspective',
    //         autoRotate: false,
    //         damping: 0,
    //         rotateSensitivity: 2,//旋转操作的灵敏度
    //         rotateMouseButton: 'left', //旋转操作使用的鼠标按键
    //         zoomSensitivity:2, //缩放操作的灵敏度
    //         panSensitivity:2, //平移操作的灵敏度
    //         panMouseButton: 'right', //平移操作使用的鼠标按键
    //
    //         distance: 160, //默认视角距离主体的距离
    //         minDistance: 100,
    //         maxDistance: 170,
    //         //orthographicSize:150,
    //         //maxOrthographicSize:150,
    //         //minOrthographicSize:150,
    //         minAlpha:30,
    //         maxAlpha:80,
    //         minBeta:-25,
    //         maxBeta:45,
    //
    //         center:[0,0,10],
    //
    //         animation: true,
    //         animationDurationUpdate: 1000,
    //         animationEasingUpdate: 'cubicInOut'
    //       },
    //       // postEffect: {
    //       //     enable: true
    //       // }
    //     }],
    //     /*dataRange: {
    //          splitList: splitList
    //        },*/
    //     // ECharts 视觉映射「visualMap」组件 注释掉 dataRange 后可查看效果
    //     // visualMap: {
    //     //     show: false,
    //     //     min: 0,
    //     //     max: 15,
    //     //     inRange: {
    //     //         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    //     //     }
    //     // }
    //   }
    //   echarts.registerMap('china', china)
    //   charts.setOption(option)
    // }
  }
}
</script>
<style scoped>
.content {
  background-color: #0e2152;
  height: 100%;
}
</style>
