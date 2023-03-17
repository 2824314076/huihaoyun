import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import VueParticles from 'vue-particles'

Vue.prototype.$echarts = echarts
import AmapVue from '@amap/amap-vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import router from './router'
import store from './store'
import "./request/interceptor.js";

import XLSX from "xlsx"


Vue.prototype.axios = axios
Vue.config.productionTip = false
//key: 'e77be896bb10485cec902ffd87ddb9b2',

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = 'e77be896bb10485cec902ffd87ddb9b2';
AmapVue.config.plugins = [
    'AMap.ToolBar',
    'AMap.MoveAnimation',
    // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];


Vue.use(VueParticles)
Vue.use(echarts)
Vue.use(axios)
Vue.use(ElementUI)
Vue.use(AmapVue);
Vue.use(VXETable)
Vue.use(XLSX)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
