import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, OPCC_TOKEN, OT_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'
import message from 'ant-design-vue/es/message'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = [ 'login', 'register', 'registerResult' ]
const loginRoutePath = '/user/login'
const defaultRoutePath = '/workspace';

router.beforeEach((to, from, next) => {
  // 进度条开始
  NProgress.start();
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${ i18nRender(to.meta.title) } - ${ domTitle }`))
  const fullPath = window.location.hash;
  const otToken = getHashArgs(fullPath, 'ot');
  const localOtToken = storage.get(OPCC_TOKEN);
  const itsmTicketId = getHashArgs(fullPath, 'ticketId');

  // 获取本地 Nsmm-Access-Token 信息
  let storageToken = storage.get(ACCESS_TOKEN);

  // console.group('访问目标路由信息：');
  // console.log(to);
  // console.groupEnd();
  // 当ot参数存在时 则为opcc首次进入的跳转访问
  if ((otToken || localOtToken) && !itsmTicketId) {
    if (otToken) {
      storage.set(ACCESS_TOKEN, '');
      storage.set(OT_TOKEN, otToken);
      storage.set(OPCC_TOKEN, 'Bearer ' + otToken);
      const opccParams = { Authorization: otToken };
      store.dispatch('LoginOpcc', opccParams).then(res => {
        if (store.getters.addRouters.length > 0) {
          if (to.fullPath === '') {
            next({ path: '/' });
          } else {
            next();
          }
        } else {
          const mode = process.env.NODE_ENV;
          if (mode && (mode === 'production' || mode === 'testccb' || mode === 'testccbvt')) {
            if (res.menu.length > 0) {
              store.dispatch('GenerateRoutesOpcc', res.menu).then(() => {
                router.addRoutes(store.getters.addRouters);
                next({ ...to, replace: true })
              })
            } else {
              message.error('暂无权限，请确认系统设置中是否正确授权')
              NProgress.done();
            }
          }
          if (mode && mode === 'development' || mode === 'testhx') {
            store.dispatch('GenerateRoutesOpcc', res.menu).then(() => {
              router.addRoutes(store.getters.addRouters);
              next({ ...to, replace: true })
            })
          }
        }
      });
    } else {
      next();
    }
  } else {
    // 放行 加载itsm审核页面
    store.state.itsm.itsmTicketId = itsmTicketId
    store.state.itsm.itsmType = ''
    // 首先判断 vuex 中的路由数据是否存在
    if (store.getters.addRouters.length > 0) {
      // vuex 中存在路由 则说明已经addRoutes到router中了
      next();
    } else {
      // 当vuex 中的路由数据不存在时 需要手动初始化路由
      store.dispatch('GenerateRoutesItsm').then(() => {
        router.addRoutes(store.getters.addRouters);
        // console.log(store.getters.addRouters);
        next({ ...to, replace: true });
      })
    }
  }
});

/*
  方法：在指定的url地址中 提取特定的参数值
  参数：fullPath 传入的url地址
  参数：paramName 指定的参数名
*/
const getUrlArgs = (fullPath, paramName) => {
  let reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
  let r = fullPath.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

const getHashArgs = function (fullPath, name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(fullPath) || [ "", "" ])[1].replace(/\+/g, '%20')) || null
}

/*
  方法：在每个路由完成后 结束进度条
*/
router.afterEach(() => {
  NProgress.done();
});
