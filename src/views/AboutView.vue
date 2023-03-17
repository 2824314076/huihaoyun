<template>
  <div class="amap-example">
    <el-amap ref="map" :zoom="zoom" :center="center" :rotation="rotation" view-mode="3D" :pitch="pitch"
             @mouseup="amapup" @mousedown="amapdown">
      <el-amap-marker v-for="(item,index) in componentMarker" :position="item.position">
        <img src="../assets/trucks.png" style="width: 20px;" alt="">

      </el-amap-marker>
      <el-amap-layer-buildings></el-amap-layer-buildings>
      <el-amap-info-window
          :position="componentMarker.position"
          :visible.sync="visible">
        <div>
          <p>{{ 123 }}</p>
        </div>
      </el-amap-info-window>
      <!--      <el-amap-layer-satellite ></el-amap-layer-satellite>-->
    </el-amap>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      componentMarker: [
        {
          position: [106.7821, 38.1919]
        },
        {
          position: [106.567, 38.192]
        }
      ],
      zoom: 12,
      pitch: 0,
      rotation: 0,
      center:
          [106.7821, 38.1919]
      // []
      ,
      timer: null,
      visible: true
    }
  },
  mounted() {

  },
  methods: {
    amapup() {
      this.pitch = 100
      this.rotation = 50
    },
    amapdown() {
      this.pitch = 0
      this.rotation = 0
    }
  },
  // watch(){
  //
  // }
}
</script>
<style lang="scss" scoped>
.amap-example {
  width: 95vw;
  height: 95vh;
}
</style>