// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import global_ from './globalVariable';
import http from './http';
import store from './store';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 阻止启动生产消息，常用作指令。
Vue.config.productionTip = false;

// 使用ElementUI
Vue.use(ElementUI);

// 使用MuseUI
Vue.use(MuseUI);

// 设置并挂载全局变量
Vue.prototype.GlobalVar = global_;

// 设置http
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
