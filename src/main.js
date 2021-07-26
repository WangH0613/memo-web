// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import * as Icons from '@ant-design/icons-vue'
import api from './api/index';
import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './layouts/global.less' // global style
import { FormModel, Timeline, Cascader } from 'ant-design-vue';
import { ObjectUtils } from '@/utils/common';
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

Vue.prototype.$object = ObjectUtils;
Vue.config.productionTip = false;

// mount axios to `Vue.$http` and `this.$http`
// Vue.use(VueAxios);
// 带双向绑定的 支持校验的表单控件
Vue.use(FormModel);
Vue.use(Timeline);
Vue.use(Cascader);
Vue.prototype.$api = api;
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme
const icons = Icons
for (const i in icons) {
  Vue.component(i, icons[i])
}
Vue.directive('hasAuth', {
  // 当被绑定的元素插入到 DOM 中时...
  inserted: function (el) {
    if (store.state.user && store.state.user.roles.length > 0) {
      const rulesName = []
      store.state.user.roles.forEach(function (item, index) {
        rulesName.push(item.roleName)
      })
      // 定义一个字符串区分管理员和普通用户权限，由于基础服务可控制模块权限，默认可以进入的至少拥有普通用户权限
      let roleGroup = 'user';
      // 如果包含更高权限的角色 就赋值管理员
      if (rulesName.indexOf('智能网管方案管理员') >= 0 || rulesName.indexOf('智能网管架构组群组经理') >= 0
          || rulesName.indexOf('智能网管网络处处长') >= 0) {
        roleGroup = 'admin';
      }
      // 判断权限
      if (roleGroup && roleGroup === 'user') {
        el.style.display = 'none'
      }
    }
  }
})
new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
