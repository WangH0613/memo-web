import request from '@/utils/request'

const dictType = {
  modelType: 'model_type',
  checkStatus: 'check_status',
  mediaType: 'media_type',
  lineRelevanceType: 'line_relevance_type',
  relationshipType: 'relationship_type',
  comboStatus: 'combo_status',
  speedUnit: 'speed_unit',
  relevanceType: 'relevance_type',
  hardwareDeviceTp: 'hardware_device_tp',
  hardwareType: 'hardware_type',

};

const pubApi = {
  login: '/pub/login',
  logout: '/pub/logout',
  // 按条件获取字典表数据
  listNsmmDictAll: '/pub/listNsmmDictAll',
  // 下载excel模版
  exportExcel: '/pub/exportExcel',
};

const pub = {
  // 用户登录方法
  login: function (parameter) {
    return request({ url: pubApi.login, method: 'get', data: parameter });
  },
  // 用户登出方法
  logout: function (parameter) {
    return request({ url: pubApi.logout, method: 'get', data: parameter });
  },
  // 返回检查状态的字典表
  listNsmmDictCheckStatus: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.checkStatus } });
  },
  // 返回模型类型的字典表
  listNsmmDictModelType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.modelType } });
  },
  // 返回连线关系的字典表
  listNsmmDictLineRelevanceType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.lineRelevanceType } });
  },
  // 返回互联关系的字典表
  listNsmmDictRelationshipType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.relationshipType } });
  },
  // 返回介质类型的字典表
  listNsmmDictMediaType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.mediaType } });
  },
  // 返回套餐状态的字典表
  listNsmmDictComboVersion: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.comboStatus } });
  },
  // 返回模型连线速率的字典表
  listNsmmDictSpeedUnit: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.speedUnit } });
  },
  // 返回方案套餐互联方式字典表
  listNsmmDictRelevanceType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.relevanceType } });
  },
  // 返回标配硬件类型
  listNsmmDictHardwareDeviceTp: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.hardwareDeviceTp } });
  },
  // 返回标配类型
  listNsmmDictHardwareType: function () {
    return request({ url: pubApi.listNsmmDictAll, method: 'get', data: { dataType: dictType.hardwareType } });
  },
  exportExcel: function (parameter) {
    return request({ url: pubApi.exportExcel, method: 'download', data: parameter });
  },
};

export default pub;
