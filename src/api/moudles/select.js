import request from '@/utils/request'

const url = {
  // 获取模型数据
  getModelSelect: '/select/getModelSelect',
  // 获取套餐数据
  getComboSelect: '/select/getComboSelect',
  // 获取套餐节点（角色）数据
  getComboNodeSelect: '/select/getComboNodeSelect',
  // 获取技术属性
  getTechnicalSelect: '/select/getTechnicalSelect',
  // 获取最新模型信息
  getModelSelectByMaxVersion: '/select/getModelSelectByMaxVersion',
  // 获取方案套餐
  getSchemeComboRealSelect: 'select/getSchemeComboRealSelect',
  // 获取 本端 - 对端 节点
  getSchemeComboRealNodeSelect: 'select/getSchemeComboRealNodeSelect',
  // 获取 本端 - 对端 端口
  getComboPortDistSelectCheckUsed: 'select/getComboPortDistSelectCheckUsed',
  getComboPortDistSelectNotCheckUsed: 'select/getComboPortDistSelectNotCheckUsed',
  // 获取 边界互联 - 角色 - 节点
  getComboPortDistRoleNodeNameSelect: 'select/getComboPortDistRoleNodeNameSelect',
  // 获取 边界互联 - 端口
  getComboPortDistSelect: 'select/getComboPortDistSelect',
  // 获取 模型角色设备类型
  getDeviceTypeDictSelect: 'select/getDeviceTypeDictSelect',
  // 获取 数据中心
  getDataCenterSelect: 'select/getDataCenterSelect',
  // 获取基础服务字典
  getSysDictSelect: 'select/getSysDictSelect'
};

const select = {
  getModelSelect: function (parameter) {
    return request({ url: url.getModelSelect, method: 'get', data: parameter });
  },
  getComboSelect: function (parameter) {
    return request({ url: url.getComboSelect, method: 'get', data: parameter });
  },
  getComboNodeSelect: function (parameter) {
    return request({ url: url.getComboNodeSelect, method: 'get', data: parameter });
  },
  getTechnicalSelect: function (parameter) {
    return request({ url: url.getTechnicalSelect, method: 'get', data: parameter });
  },
  getModelSelectByMaxVersion: function (parameter) {
    return request({ url: url.getModelSelectByMaxVersion, method: 'get', data: parameter });
  },
  getSchemeComboRealSelect: function (parameter) {
    return request({ url: url.getSchemeComboRealSelect, method: 'get', data: parameter });
  },
  getSchemeComboRealNodeSelect: function (parameter) {
    return request({ url: url.getSchemeComboRealNodeSelect, method: 'get', data: parameter });
  },
  getComboPortDistSelect: function (parameter) {
    return request({ url: url.getComboPortDistSelect, method: 'post', data: parameter });
  },
  getComboPortDistSelectCheckUsed: function (parameter) {
    return request({ url: url.getComboPortDistSelectCheckUsed, method: 'get', data: parameter });
  },
  getComboPortDistSelectNotCheckUsed: function (parameter) {
    return request({ url: url.getComboPortDistSelectNotCheckUsed, method: 'get', data: parameter });
  },
  getComboPortDistRoleNodeNameSelect: function (parameter) {
    return request({ url: url.getComboPortDistRoleNodeNameSelect, method: 'get', data: parameter });
  },
  getHardwareTypeNameSelect: function (parameter) {
    return request({ url: url.getHardwareTypeNameSelect, method: 'get', data: parameter });
  },
  getDeviceTypeDictSelect: function (parameter) {
    return request({ url: url.getDeviceTypeDictSelect, method: 'get', data: parameter });
  },
  getDataCenterSelect: function (parameter) {
    return request({ url: url.getDataCenterSelect, method: 'get', data: parameter });
  },
  getSysDictSelect: function (parameter) {
    return request({ url: url.getSysDictSelect, method: 'get', data: parameter });
  }
};

export default select;
