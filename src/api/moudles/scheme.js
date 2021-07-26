import request from '@/utils/request'

const url = {
  // 查询方案基本信息
  getNsmmSchemeBase: '/scheme/getNsmmSchemeBase',
  // 查询方案详细互联
  getSchemeRelevanceList: '/scheme/getSchemeRelevanceList',
  // 查询拓扑数据
  getSchemeComboRealNodeRelevanceChart: '/scheme/getSchemeComboRealNodeRelevanceChart',
  // 查询方案列表
  listNsmmSchemeBasePage: '/scheme/listNsmmSchemeBasePage',
  // 查询套餐信息
  listNsmmSchemeComboBaseAll: '/scheme/listNsmmSchemeComboBaseAll',
  // 查询套餐信息
  listNsmmSchemeComboRealRelevanceAll: '/scheme/listNsmmSchemeComboRealRelevanceAll',
  // 查询方案节点互联
  listNsmmSchemeComboRealNodeRelevanceAll: '/scheme/listNsmmSchemeComboRealNodeRelevanceAll',
  // 查询方案套餐节点互联
  listNsmmSchemeComboRealNodeRelevanceAllForGroup: 'scheme/listNsmmSchemeComboRealNodeRelevanceAllForGroup',
  // 查询方案边界互联
  listNsmmSchemeComboOutRelevanceAll: 'scheme/listNsmmSchemeComboOutRelevanceAll',
  // 新增方案数据
  insertNsmmSchemeBase: '/scheme/insertNsmmSchemeBase',
  // 新增方案套餐互联
  insertNsmmSchemeComboRealRelevance: 'scheme/insertNsmmSchemeComboRealRelevance',
  // 新增方案节点互联
  insertNsmmSchemeComboRealNodeRelevance: 'scheme/insertNsmmSchemeComboRealNodeRelevance',
  // 新增方案外联信息
  insertNsmmSchemeComboOutRelevance: 'scheme/insertNsmmSchemeComboOutRelevance',
  // 修改方案信息
  updateNsmmSchemeBase: '/scheme/updateNsmmSchemeBase',
  // 更新套餐数量
  updateNsmmSchemeComboBase: '/scheme/updateNsmmSchemeComboBase',
  // 更新方案套餐互联
  updateNsmmSchemeComboRealRelevance: 'scheme/updateNsmmSchemeComboRealRelevance',
  // 更新方案节点互联
  updateNsmmSchemeComboRealNodeRelevance: 'scheme/updateNsmmSchemeComboRealNodeRelevance',
  // 更新方案边界互联
  updateNsmmSchemeComboOutRelevance: 'scheme/updateNsmmSchemeComboOutRelevance',
  // 删除方案信息
  deleteNsmmSchemeBase: 'scheme/deleteNsmmSchemeBase',
  // 删除方案套餐互联
  deleteNsmmSchemeComboRealRelevance: 'scheme/deleteNsmmSchemeComboRealRelevance',
  // 删除方案节点互联
  deleteNsmmSchemeComboRealNodeRelevance: 'scheme/deleteNsmmSchemeComboRealNodeRelevance',
  // 删除方案边界互联
  deleteNsmmSchemeComboOutRelevance: 'scheme/deleteNsmmSchemeComboOutRelevance',
  // 提交审核
  submitSchemeBase: 'scheme/submitSchemeBase',
  // 保存方案拓扑图坐标
  saveNsmmSchemeChart: 'scheme/saveNsmmSchemeChart',
};

const scheme = {
  getNsmmSchemeBase: function (parameter) {
    return request({ url: url.getNsmmSchemeBase, method: 'get', data: parameter });
  },
  getSchemeRelevanceList: function (parameter) {
    return request({ url: url.getSchemeRelevanceList, method: 'get', data: parameter });
  },
  getSchemeComboRealNodeRelevanceChart: function (parameter) {
    return request({ url: url.getSchemeComboRealNodeRelevanceChart, method: 'get', data: parameter });
  },
  listNsmmSchemeBasePage: function (parameter) {
    return request({ url: url.listNsmmSchemeBasePage, method: 'get', data: parameter });
  },
  listNsmmSchemeComboBaseAll: function (parameter) {
    return request({ url: url.listNsmmSchemeComboBaseAll, method: 'get', data: parameter });
  },
  listNsmmSchemeComboRealRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmSchemeComboRealRelevanceAll, method: 'get', data: parameter });
  },
  listNsmmSchemeComboRealNodeRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmSchemeComboRealNodeRelevanceAll, method: 'get', data: parameter });
  },
  listNsmmSchemeComboRealNodeRelevanceAllForGroup: function (parameter) {
    return request({ url: url.listNsmmSchemeComboRealNodeRelevanceAllForGroup, method: 'get', data: parameter });
  },
  listNsmmSchemeComboOutRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmSchemeComboOutRelevanceAll, method: 'get', data: parameter });
  },
  insertNsmmSchemeBase: function (parameter) {
    return request({ url: url.insertNsmmSchemeBase, method: 'post', data: parameter });
  },
  insertNsmmSchemeComboRealRelevance: function (parameter) {
    return request({ url: url.insertNsmmSchemeComboRealRelevance, method: 'post', data: parameter });
  },
  insertNsmmSchemeComboRealNodeRelevance: function (parameter) {
    return request({ url: url.insertNsmmSchemeComboRealNodeRelevance, method: 'post', data: parameter });
  },
  insertNsmmSchemeComboOutRelevance: function (parameter) {
    return request({ url: url.insertNsmmSchemeComboOutRelevance, method: 'post', data: parameter });
  },
  updateNsmmSchemeBase: function (parameter) {
    return request({ url: url.updateNsmmSchemeBase, method: 'post', data: parameter });
  },
  updateNsmmSchemeComboBase: function (parameter) {
    return request({ url: url.updateNsmmSchemeComboBase, method: 'post', data: parameter });
  },
  updateNsmmSchemeComboRealRelevance: function (parameter) {
    return request({ url: url.updateNsmmSchemeComboRealRelevance, method: 'post', data: parameter });
  },
  updateNsmmSchemeComboRealNodeRelevance: function (parameter) {
    return request({ url: url.updateNsmmSchemeComboRealNodeRelevance, method: 'post', data: parameter });
  },
  updateNsmmSchemeComboOutRelevance: function (parameter) {
    return request({ url: url.updateNsmmSchemeComboOutRelevance, method: 'post', data: parameter });
  },
  deleteNsmmSchemeBase: function (parameter) {
    return request({ url: url.deleteNsmmSchemeBase, method: 'post', data: parameter });
  },
  deleteNsmmSchemeComboRealRelevance: function (parameter) {
    return request({ url: url.deleteNsmmSchemeComboRealRelevance, method: 'post', data: parameter });
  },
  deleteNsmmSchemeComboRealNodeRelevance: function (parameter) {
    return request({ url: url.deleteNsmmSchemeComboRealNodeRelevance, method: 'post', data: parameter });
  },
  deleteNsmmSchemeComboOutRelevance: function (parameter) {
    return request({ url: url.deleteNsmmSchemeComboOutRelevance, method: 'post', data: parameter });
  },
  submitSchemeBase: function (parameter) {
    return request({ url: url.submitSchemeBase, method: 'post', data: parameter });
  },
  saveNsmmSchemeChart: function (parameter) {
    return request({ url: url.saveNsmmSchemeChart, method: 'post', data: parameter });
  },
};

export default scheme;
