import request from '@/utils/request'

const url = {
  // 模型数据统计
  countNsmmDataTotal: '/total/countNsmmDataTotal',
  // 模型数据 - 分页
  listNsmmModelBasePage: '/model/listNsmmModelBasePage',
  // 套餐数据 - 分页
  listNsmmComboBasePage: '/combo/listNsmmComboBasePage',
  // 设备数据 - 分页
  listNsmmDeviceBasePage: '/total/listNsmmDeviceBasePage',
};

const total = {
  countNsmmDataTotal: function (parameter) {
    return request({ url: url.countNsmmDataTotal, method: 'get', data: parameter });
  },
  listNsmmModelBasePage: function (parameter) {
    return request({ url: url.listNsmmModelBasePage, method: 'get', data: parameter });
  },
  listNsmmComboBasePage: function (parameter) {
    return request({ url: url.listNsmmComboBasePage, method: 'get', data: parameter });
  },
  listNsmmDeviceBasePage: function (parameter) {
    return request({ url: url.listNsmmDeviceBasePage, method: 'get', data: parameter });
  },
};

export default total;
