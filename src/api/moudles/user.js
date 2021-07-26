import request from '@/utils/request'

const url = {
  // 初始化用户信息 opcc调用
  loginOpcc: '/pub/loginOpcc',
  // 初始化用户信息 itsm调用
  loginItsm: '/pub/loginItsm',
};

const user = {
  loginOpcc: function (parameter) {
    return request({ url: url.loginOpcc, method: 'get', data: parameter });
  },
  loginItsm: function (parameter) {
    return request({ url: url.loginItsm, method: 'get', data: parameter });
  },
};

export default user;
