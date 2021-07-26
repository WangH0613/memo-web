import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message';

import { VueAxios } from './axios'
import { ACCESS_TOKEN, NSMM_CONTEXT_PATH, OPCC_TOKEN } from '@/store/mutation-types'
import qs from 'qs';

// let paramsStr = window.location.href.slice(
//   window.location.href.indexOf("?") + 1,
//   window.location.href.length
// );
// if (paramsStr.includes("=")) {
//   paramsStr = paramsStr.replace("&", "=");
// }
// const paramsArr = paramsStr.split("=");
// const indextoken = paramsArr.includes("ot")
//   ? paramsArr[paramsArr.indexOf("ot") + 1]
//   : null;

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // timeout: 15000 // 请求超时时间 正式部署时须去掉该配置
});

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      message.error(data.message)
      // notification.error({
      //   message: 'Forbidden',
      //   description: data.message
      // })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      message.error(data.message)
      // notification.error({
      //   message: 'Unauthorized',
      //   description: 'Authorization verification failed'
      // });
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
};

// request interceptor
request.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN);
    const opccToken = storage.get(OPCC_TOKEN);
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Nsmm-Access-Token'] = token
    }
    // 2020-12-24 增加opcctoken
    if (opccToken) {
      config.headers['Authorization'] = opccToken
    }
    // qs处理
    const paramsObject = config.data;
    if (paramsObject && paramsObject !== '') {
      // 处理get字符串序列化
      if (config.method === 'get') {
        config.params = paramsObject;
        config.paramsSerializer = (paramsObject) => {
          return qs.stringify(paramsObject, { arrayFormat: 'repeat' })
        }
      }
      // 处理post字符串序列化
      if (config.method === 'post') {
        // 设置提交头
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        config.data = qs.stringify(paramsObject, { arrayFormat: 'repeat' })
      }
    }
    if (config.method === 'download') {
      config.method = 'post';
      config.data = qs.stringify(paramsObject, { arrayFormat: 'repeat' })
      // 设置提交头
      config.responseType = 'blob';
    }
    return config;
  },
  errorHandler
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    if (response.data.invalidFlag) {
      // 标识符存在，即token失效
      window.open(response.data.redirectUrl, '_self');
    }
    // 在这里处理token刷新的问题
    // 当本地token与服务器端token不一致时
    // 则使用服务器端的token去重置本地的token
    const localToken = storage.get(ACCESS_TOKEN);
    const resToken = response.headers && response.headers['access-token'] ? response.headers['access-token'] : '';
    if (localToken && resToken && localToken !== resToken) {
      storage.set(ACCESS_TOKEN, resToken, 7 * 24 * 60 * 60 * 1000);
      store.state.user.token = resToken;
    }
    if (response.data && response.data.status === '00000') {
      const urlStr = response.config.url;
      if (urlStr && urlStr !== '' && urlStr.length > 0 && (
        urlStr.indexOf('insert') >= 0 ||
        urlStr.indexOf('update') >= 0 ||
        urlStr.indexOf('clear') >= 0 ||
        urlStr.indexOf('clone') >= 0 ||
        urlStr.indexOf('retrieve') >= 0 ||
        urlStr.indexOf('save') >= 0 ||
        urlStr.indexOf('delete') >= 0)
      ) {
        message.success(response.data.message)
        // notification.success({
        //   message: response.data.message
        // })
      }
      // 只在服务器无异常的情况下返回数据
      // 发生异常的情况下 虽然状态码 200 但不再返回数据
      return response.data;
    }
    if (response.data && response.status === 200 && response.config.responseType === 'blob') {
      return response;
    }
    // 验证未通过
    if (response.data && response.data.status === 'A0301') {
      message.error(
        response.data.message && response.data.message !== '' ? response.data.message : '操作失败，请检查后重试'
      );
      // notification.error({
      //   message: response.data.message && response.data.message !== '' ? response.data.message : '操作失败，请检查后重试'
      // });
      store.dispatch('Logout');
    } else {
      message.error(
        response.data.message && response.data.message !== '' ? response.data.message : '操作失败，请检查后重试'
      );
      // notification.error({
      //   message: response.data.message && response.data.message !== '' ? response.data.message : '操作失败，请检查后重试'
      // });
    }
  }, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
};

export default request

export {
  installer as VueAxios,
  request as axios
}