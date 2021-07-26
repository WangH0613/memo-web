import request from '@/utils/request'

const url = {
  // 新增模型
  insertNsmmModelBase: '/model/insertNsmmModelBase',
  // 新增模型角色
  insertNsmmModelRoleBase: '/model/insertNsmmModelRoleBase',
  // 新增模型节点
  insertNsmmModelNodeBase: '/model/insertNsmmModelNodeBase',
  // 新增模型节点关联关系
  insertNsmmModelNodeRelevance: '/model/insertNsmmModelNodeRelevance',
  // 新增模型版本号
  insertNsmmModelBaseVersion: '/model/insertNsmmModelBaseVersion',
  // 克隆模型全部信息
  cloneNsmmModelBase: '/model/cloneNsmmModelBase',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 删除模型
  deleteNsmmModelBase: '/model/deleteNsmmModelBase',
  // 删除模型角色
  deleteNsmmModelRoleBase: '/model/deleteNsmmModelRoleBase',
  // 删除模型节点
  deleteNsmmModelNodeBase: '/model/deleteNsmmModelNodeBase',
  // 删除模型节点关联关系
  deleteNsmmModelNodeRelevance: '/model/deleteNsmmModelNodeRelevance',
  // 删除模型版本号
  deleteNsmmModelBaseVersion: '/model/deleteNsmmModelBaseVersion',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 修改模型
  updateNsmmModelBase: '/model/updateNsmmModelBase',
  // 修改模型角色
  updateNsmmModelRoleBase: '/model/updateNsmmModelRoleBase',
  // 修改模型节点
  updateNsmmModelNodeBase: '/model/updateNsmmModelNodeBase',
  // 修改模型节点关联关系
  updateNsmmModelNodeRelevance: '/model/updateNsmmModelNodeRelevance',
  // 修改模型版本号
  updateNsmmModelBaseVersion: '/model/updateNsmmModelBaseVersion',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 模型数据 - 分页
  listNsmmModelBasePage: '/model/listNsmmModelBasePage',
  // 模型数据 - 全部
  listNsmmModelBaseAll: '/model/listNsmmModelBaseAll',
  // 模型数据 - 单个
  getNsmmModelBase: '/model/getNsmmModelBase',
  // 模型角色数据 - 分页
  listNsmmModelRoleBasePage: '/model/listNsmmModelRoleBasePage',
  // 模型角色数据 - 全部
  listNsmmModelRoleBaseAll: '/model/listNsmmModelRoleBaseAll',
  // 模型角色数据 - 单个
  getNsmmModelRoleBase: '/model/getNsmmModelRoleBase',
  // 模型节点数据 - 分页
  listNsmmModelNodeBasePage: '/model/listNsmmModelNodeBasePage',
  // 模型节点数据 - 全部
  listNsmmModelNodeBaseAll: '/model/listNsmmModelNodeBaseAll',
  // 模型节点数据 - 单个
  getNsmmModelNodeBase: '/model/getNsmmModelNodeBase',
  // 模型节点关联关系数据 - 分页
  listNsmmModelNodeRelevancePage: '/model/listNsmmModelNodeRelevancePage',
  // 模型节点关联关系数据 - 全部
  listNsmmModelNodeRelevanceAll: '/model/listNsmmModelNodeRelevanceAll',
  // 模型节点关联关系数据 - 单个
  getNsmmModelNodeRelevance: '/model/getNsmmModelNodeRelevance',
  // 模型版本号 - 单个
  getNsmmModelBaseVersion: '/model/getNsmmModelBaseVersion',
  // 互联关系 - 拓扑图
  getModelNodeChart: '/model/getModelNodeChart',
  // 模型版本号 - 单个
  listNsmmModelBaseVersionPage: '/model/listNsmmModelBaseVersionPage',
  // 模型版本号 - 单个
  listNsmmModelBaseVersionAll: '/model/listNsmmModelBaseVersionAll',
  // 提交审核
  submitModel: 'model/submitModel',
  // 获取模型编号
  getMaxModelNumByModelType: '/model/getMaxModelNumByModelType',
  // 保存模型拓扑图坐标
  saveNsmmModelChart: '/model/saveNsmmModelChart'
};

const model = {
  submitModel: function (parameter) {
    return request({ url: url.submitModel, method: 'post', data: parameter });
  },
  insertNsmmModelBase: function (parameter) {
    return request({ url: url.insertNsmmModelBase, method: 'post', data: parameter });
  },
  insertNsmmModelRoleBase: function (parameter) {
    return request({ url: url.insertNsmmModelRoleBase, method: 'post', data: parameter });
  },
  insertNsmmModelNodeBase: function (parameter) {
    return request({ url: url.insertNsmmModelNodeBase, method: 'post', data: parameter });
  },
  insertNsmmModelNodeRelevance: function (parameter) {
    return request({ url: url.insertNsmmModelNodeRelevance, method: 'post', data: parameter });
  },
  insertNsmmModelBaseVersion: function (parameter) {
    return request({ url: url.insertNsmmModelBaseVersion, method: 'post', data: parameter });
  },
  cloneNsmmModelBase: function (parameter) {
    return request({ url: url.cloneNsmmModelBase, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  deleteNsmmModelBase: function (parameter) {
    return request({ url: url.deleteNsmmModelBase, method: 'post', data: parameter });
  },
  deleteNsmmModelRoleBase: function (parameter) {
    return request({ url: url.deleteNsmmModelRoleBase, method: 'post', data: parameter });
  },
  deleteNsmmModelNodeBase: function (parameter) {
    return request({ url: url.deleteNsmmModelNodeBase, method: 'post', data: parameter });
  },
  deleteNsmmModelNodeRelevance: function (parameter) {
    return request({ url: url.deleteNsmmModelNodeRelevance, method: 'post', data: parameter });
  },
  deleteNsmmModelBaseVersion: function (parameter) {
    return request({ url: url.deleteNsmmModelBaseVersion, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  updateNsmmModelBase: function (parameter) {
    return request({ url: url.updateNsmmModelBase, method: 'post', data: parameter });
  },
  updateNsmmModelRoleBase: function (parameter) {
    return request({ url: url.updateNsmmModelRoleBase, method: 'post', data: parameter });
  },
  updateNsmmModelNodeBase: function (parameter) {
    return request({ url: url.updateNsmmModelNodeBase, method: 'post', data: parameter });
  },
  updateNsmmModelNodeRelevance: function (parameter) {
    return request({ url: url.updateNsmmModelNodeRelevance, method: 'post', data: parameter });
  },
  updateNsmmModelBaseVersion: function (parameter) {
    return request({ url: url.updateNsmmModelBaseVersion, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  listNsmmModelBasePage: function (parameter) {
    return request({ url: url.listNsmmModelBasePage, method: 'get', data: parameter });
  },
  listNsmmModelBaseAll: function (parameter) {
    return request({ url: url.listNsmmModelBaseAll, method: 'get', data: parameter });
  },
  getNsmmModelBase: function (parameter) {
    return request({ url: url.getNsmmModelBase, method: 'get', data: parameter });
  },
  listNsmmModelRoleBasePage: function (parameter) {
    return request({ url: url.listNsmmModelRoleBasePage, method: 'get', data: parameter });
  },
  listNsmmModelRoleBaseAll: function (parameter) {
    return request({ url: url.listNsmmModelRoleBaseAll, method: 'get', data: parameter });
  },
  getNsmmModelRoleBase: function (parameter) {
    return request({ url: url.getNsmmModelRoleBase, method: 'get', data: parameter });
  },
  listNsmmModelNodeBasePage: function (parameter) {
    return request({ url: url.listNsmmModelNodeBasePage, method: 'get', data: parameter });
  },
  listNsmmModelNodeBaseAll: function (parameter) {
    return request({ url: url.listNsmmModelNodeBaseAll, method: 'get', data: parameter });
  },
  getNsmmModelNodeBase: function (parameter) {
    return request({ url: url.getNsmmModelNodeBase, method: 'get', data: parameter });
  },
  listNsmmModelNodeRelevancePage: function (parameter) {
    return request({ url: url.listNsmmModelNodeRelevancePage, method: 'get', data: parameter });
  },
  listNsmmModelNodeRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmModelNodeRelevanceAll, method: 'get', data: parameter });
  },
  getNsmmModelNodeRelevance: function (parameter) {
    return request({ url: url.getNsmmModelNodeRelevance, method: 'get', data: parameter });
  },
  listNsmmModelBaseVersionAll: function (parameter) {
    return request({ url: url.listNsmmModelBaseVersionAll, method: 'get', data: parameter });
  },
  listNsmmModelBaseVersionPage: function (parameter) {
    return request({ url: url.listNsmmModelBaseVersionPage, method: 'get', data: parameter });
  },
  getNsmmModelBaseVersion: function (parameter) {
    return request({ url: url.getNsmmModelBaseVersion, method: 'get', data: parameter });
  },
  getModelNodeChart: function (parameter) {
    return request({ url: url.getModelNodeChart, method: 'get', data: parameter });
  },
  getMaxModelNumByModelType: function (parameter) {
    return request({ url: url.getMaxModelNumByModelType, method: 'get', data: parameter });
  },
  saveNsmmModelChart: function (parameter) {
    return request({ url: url.saveNsmmModelChart, method: 'post', data: parameter });
  }
};

export default model;
