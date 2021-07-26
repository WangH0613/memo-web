import request from '@/utils/request'

const url = {
  // 添加技术属性基本信息
  insertNsmmTechnicalAttributeBase: '/technical/insertNsmmTechnicalAttributeBase',
  // 编辑技术属性基本信息
  updateNsmmTechnicalAttributeBase: '/technical/updateNsmmTechnicalAttributeBase',
  // 删除技术属性基本信息
  deleteLogical: '/technical/deleteLogical',
  // 获取单个技术属性
  getNsmmTechnicalAttributeBase: '/technical/getNsmmTechnicalAttributeBase',
  // 技术属性列表 一级列表页 --- 模型-套餐-厂商-技术属性数量
  listComboModelTechnicalPage: '/technical/listComboModelTechnicalPage',
  // 技术属性列表 二级列表页
  listNsmmTechnicalAttributeBasePage: '/technical/listNsmmTechnicalAttributeBasePage',
  // 清空技术属性
  clearNsmmTechnicalAttributeBase: '/technical/clearNsmmTechnicalAttributeBase',
  // 克隆技术属性 -- 单条
  cloneNsmmTechnicalAttributeBase: '/technical/cloneNsmmTechnicalAttributeBase',
  // 克隆技术属性 -- 批量
  checkModelCloneNsmmTechnicalAttributeBase: '/technical/checkModelCloneNsmmTechnicalAttributeBase'
};

const technical = {
  insertNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.insertNsmmTechnicalAttributeBase, method: 'post', data: parameter });
  },
  updateNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.updateNsmmTechnicalAttributeBase, method: 'post', data: parameter });
  },
  deleteNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.deleteLogical, method: 'post', data: parameter });
  },
  getNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.getNsmmTechnicalAttributeBase, method: 'get', data: parameter });
  },
  listComboModelTechnicalPage: function (parameter) {
    return request({ url: url.listComboModelTechnicalPage, method: 'get', data: parameter });
  },
  listNsmmTechnicalAttributeBasePage: function (parameter) {
    return request({ url: url.listNsmmTechnicalAttributeBasePage, method: 'get', data: parameter });
  },
  clearNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.clearNsmmTechnicalAttributeBase, method: 'post', data: parameter });
  },
  cloneNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.cloneNsmmTechnicalAttributeBase, method: 'post', data: parameter });
  },
  checkModelCloneNsmmTechnicalAttributeBase: function (parameter) {
    return request({ url: url.checkModelCloneNsmmTechnicalAttributeBase, method: 'post', data: parameter });
  },
};

export default technical;
