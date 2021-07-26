import request from '@/utils/request';

const url = {
  // 新增设备
  insertNsmmDeviceBase: '/device/insertNsmmDeviceBase',
  // 删除设备
  deleteNsmmDeviceBase: '/device/deleteNsmmDeviceBase',
  // 查询设备 - 单个
  getNsmmDeviceBase: '/device/getNsmmDeviceBase',
  // 列表设备 - 不分页
  listNsmmDeviceBaseAll: '/device/listNsmmDeviceBaseAll',
  // 列表设备 - 分页
  listNsmmDeviceBasePage: '/device/listNsmmDeviceBasePage',
  // 修改设备
  updateNsmmDeviceBase: '/device/updateNsmmDeviceBase',
  // 更新设备API状态
  changeApiStatus: '/device/changeApiStatus',
  // 添加设备组
  insertNsmmDeviceGroup: '/device/insertNsmmDeviceGroup',
  // 获取设备组-单个
  getNsmmDeviceGroup: '/device/getNsmmDeviceGroup',
  // 获取设备组 - 全部
  listNsmmDeviceGroupAll: '/device/listNsmmDeviceGroupAll',
  // 下载
  downloadDeviceModel: '/device/downloadDeviceModel',
};

const device = {
  insertNsmmDeviceBase: function (parameter) {
    return request({ url: url.insertNsmmDeviceBase, method: 'post', data: parameter });
  },
  deleteNsmmDeviceBase: function (parameter) {
    return request({ url: url.deleteNsmmDeviceBase, method: 'post', data: parameter });
  },
  getNsmmDeviceBase: function (parameter) {
    return request({ url: url.getNsmmDeviceBase, method: 'get', data: parameter });
  },
  listNsmmDeviceBaseAll: function (parameter) {
    return request({ url: url.listNsmmDeviceBaseAll, method: 'get', data: parameter });
  },
  listNsmmDeviceBasePage: function (parameter) {
    return request({ url: url.listNsmmDeviceBasePage, method: 'get', data: parameter });
  },
  updateNsmmDeviceBase: function (parameter) {
    return request({ url: url.updateNsmmDeviceBase, method: 'post', data: parameter });
  },
  changeApiStatus: function (parameter) {
    return request({ url: url.changeApiStatus, method: 'post', data: parameter });
  },
  insertNsmmDeviceGroup: function (parameter) {
    return request({ url: url.insertNsmmDeviceGroup, method: 'post', data: parameter });
  },
  getNsmmDeviceGroup: function (parameter) {
    return request({ url: url.getNsmmDeviceGroup, method: 'get', data: parameter });
  },
  listNsmmDeviceGroupAll: function (parameter) {
    return request({ url: url.listNsmmDeviceGroupAll, method: 'get', data: parameter });
  },
  downloadDeviceModel: function (parameter) {
    return request({ url: url.downloadDeviceModel, method: 'download', data: parameter });
  }
};

export default device;
