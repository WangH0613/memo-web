import request from '@/utils/request';

const url = {
  // 标配列表 - 分页
  listNsmmHardwareBasePage: '/hardware/listNsmmHardwareBasePage',
  // 获取设备板卡单条记录
  getNsmmHardwareBase: '/hardware/getNsmmHardwareBase',
  // 获取标配硬件单条记录
  getNsmmHardwareDevice: '/hardware/getNsmmHardwareDevice',
  // 添加标配信息
  insertNsmmHardwareBase: '/hardware/insertNsmmHardwareBase',
  // 下载
  downloadDeviceModel: '/device/downloadDeviceModel',
  // 修改
  updateNsmmHardwareBase: '/hardware/updateNsmmHardwareBase',
  // 下载标配库模板
  downloadHardwareModel: '/hardware/downloadHardwareModel',
  // 删除
  deleteNsmmHardwareBase: '/hardware/deleteNsmmHardwareBase',
  // 删除硬件
  deleteNsmmHardwareDevice: '/hardware/deleteNsmmHardwareDevice',
  // 标配硬件列表 - 分页
  listNsmmHardwareDevicePage: '/hardware/listNsmmHardwareDevicePage',
  // 更新标配硬件信息
  updateNsmmHardwareDevice: '/hardware/updateNsmmHardwareDevice',
  // 新增标配硬件信息
  insertNsmmHardwareDevice: '/hardware/insertNsmmHardwareDevice'
};

const hardware = {
  listNsmmHardwareBasePage: function (parameter) {
    return request({ url: url.listNsmmHardwareBasePage, method: 'get', data: parameter });
  },
  insertNsmmHardwareBase: function (parameter) {
    return request({ url: url.insertNsmmHardwareBase, method: 'post', data: parameter });
  },
  getNsmmHardwareBase: function (parameter) {
    return request({ url: url.getNsmmHardwareBase, method: 'get', data: parameter });
  },
  downloadDeviceModel: function (parameter) {
    return request({ url: url.downloadDeviceModel, method: 'download', data: parameter });
  },
  updateNsmmHardwareBase: function (parameter) {
    return request({ url: url.updateNsmmHardwareBase, method: 'post', data: parameter });
  },
  downloadHardwareModel: function (parameter) {
    return request({ url: url.downloadHardwareModel, method: 'post', data: parameter });
  },
  deleteNsmmHardwareBase: function (parameter) {
    return request({ url: url.deleteNsmmHardwareBase, method: 'post', data: parameter });
  },
  deleteNsmmHardwareDevice: function (parameter) {
    return request({ url: url.deleteNsmmHardwareDevice, method: 'post', data: parameter });
  },
  listNsmmHardwareDevicePage: function (parameter) {
    return request({ url: url.listNsmmHardwareDevicePage, method: 'get', data: parameter });
  },
  getNsmmHardwareDevice: function (parameter) {
    return request({ url: url.getNsmmHardwareDevice, method: 'get', data: parameter });
  },
  updateNsmmHardwareDevice: function (parameter) {
    return request({ url: url.updateNsmmHardwareDevice, method: 'post', data: parameter });
  },
  insertNsmmHardwareDevice: function (parameter) {
    return request({ url: url.insertNsmmHardwareDevice, method: 'post', data: parameter });
  }

};

export default hardware;
