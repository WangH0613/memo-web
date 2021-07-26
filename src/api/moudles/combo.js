import request from '@/utils/request'

const url = {
  // 新增套餐
  insertNsmmComboBase: '/combo/insertNsmmComboBase',
  // 新增套餐角色
  insertNsmmComboRoleBase: '/combo/insertNsmmComboRoleBase',
  // 新增套餐节点
  insertNsmmComboNodeBase: '/combo/insertNsmmComboNodeBase',
  // 新增套餐节点关联关系
  insertNsmmComboNodeRelevance: '/combo/insertNsmmComboNodeRelevance',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 删除套餐
  deleteNsmmComboBase: '/combo/deleteNsmmComboBase',
  // 删除套餐角色
  deleteNsmmComboRoleBase: '/combo/deleteNsmmComboRoleBase',
  // 删除套餐节点
  deleteNsmmComboNodeBase: '/combo/deleteNsmmComboNodeBase',
  // 删除套餐节点关联关系
  deleteNsmmComboNodeRelevance: '/combo/deleteNsmmComboNodeRelevance',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 修改套餐
  updateNsmmComboBase: '/combo/updateNsmmComboBase',
  // 修改套餐角色
  updateNsmmComboRoleBase: '/combo/updateNsmmComboRoleBase',
  // 修改套餐节点
  updateNsmmComboNodeBase: '/combo/updateNsmmComboNodeBase',
  // 修改套餐节点关联关系
  updateNsmmComboNodeRelevance: '/combo/updateNsmmComboNodeRelevance',
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  /*********************************************************************/
  // 套餐数据 - 分页
  listNsmmComboBasePage: '/combo/listNsmmComboBasePage',
  // 套餐数据 - 全部
  listNsmmComboBaseAll: '/combo/listNsmmComboBaseAll',
  // 套餐数据 - 单个
  getNsmmComboBase: '/combo/getNsmmComboBase',
  // 套餐角色数据 - 分页
  listNsmmComboRoleBasePage: '/combo/listNsmmComboRoleBasePage',
  // 套餐角色数据 - 全部
  listNsmmComboRoleBaseAll: '/combo/listNsmmComboRoleBaseAll',
  // 套餐角色数据 - 单个
  getNsmmComboRoleBase: '/combo/getNsmmComboRoleBase',
  // 套餐节点数据 - 分页
  listNsmmComboNodeBasePage: '/combo/listNsmmComboNodeBasePage',
  // 套餐节点数据 - 全部
  listNsmmComboNodeBaseAll: '/combo/listNsmmComboNodeBaseAll',
  // 套餐节点数据 - 单个
  getNsmmComboNodeBase: '/combo/getNsmmComboNodeBase',
  // 套餐节点关联关系数据 - 分页
  listNsmmComboNodeRelevancePage: '/combo/listNsmmComboNodeRelvancePage',
  // 套餐节点关联关系数据 - 全部
  listNsmmComboNodeRelevanceAll: '/combo/listNsmmComboNodeRelevanceAll',
  // 套餐节点关联关系详情数据 - 全部
  listNsmmComboNodeRelevanceDetailAll: '/combo/listNsmmComboNodeRelevanceDetailAll',
  // 获取套餐版本 - 全部
  listNsmmComboBaseVersionAll: '/combo/listNsmmComboBaseVersionAll',
  // 套餐节点关联关系数据 - 单个
  getNsmmComboNodeRelevance: '/combo/getNsmmComboNodeRelvance',
  // 获取设备信息--模拟
  getDataByHttps: '/combo/getDataByHttps',
  // 获取端口信息
  listComboNodePortDistributes: '/combo/listComboNodePortDistributes',
  // 获取端口信息--带分页
  pageComboNodePortDistributes: '/combo/pageComboNodePortDistributes',
  // 上传端口文件
  uploadPortDistribute: '/combo/uploadPortDistribute',
  // 克隆套餐版本
  cloneNsmmComboBase: '/combo/cloneNsmmComboBase',
  // 提交审核
  submitCombo: 'combo/submitCombo',
  downloadPortDistributeModel: 'combo/downloadPortDistributeModel'
};

const combo = {
  submitCombo: function (parameter) {
    return request({ url: url.submitCombo, method: 'post', data: parameter });
  },
  insertNsmmComboBase: function (parameter) {
    return request({ url: url.insertNsmmComboBase, method: 'post', data: parameter });
  },
  insertNsmmComboRoleBase: function (parameter) {
    return request({ url: url.insertNsmmComboRoleBase, method: 'post', data: parameter });
  },
  insertNsmmComboNodeBase: function (parameter) {
    return request({ url: url.insertNsmmComboNodeBase, method: 'post', data: parameter });
  },
  insertNsmmComboNodeRelevance: function (parameter) {
    return request({ url: url.insertNsmmComboNodeRelevance, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  deleteNsmmComboBase: function (parameter) {
    return request({ url: url.deleteNsmmComboBase, method: 'post', data: parameter });
  },
  deleteNsmmComboRoleBase: function (parameter) {
    return request({ url: url.deleteNsmmComboRoleBase, method: 'post', data: parameter });
  },
  deleteNsmmComboNodeBase: function (parameter) {
    return request({ url: url.deleteNsmmComboNodeBase, method: 'post', data: parameter });
  },
  deleteNsmmComboNodeRelevance: function (parameter) {
    return request({ url: url.deleteNsmmComboNodeRelevance, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  updateNsmmComboBase: function (parameter) {
    return request({ url: url.updateNsmmComboBase, method: 'post', data: parameter });
  },
  updateNsmmComboRoleBase: function (parameter) {
    return request({ url: url.updateNsmmComboRoleBase, method: 'post', data: parameter });
  },
  updateNsmmComboNodeBase: function (parameter) {
    return request({ url: url.updateNsmmComboNodeBase, method: 'post', data: parameter });
  },
  updateNsmmComboNodeRelevance: function (parameter) {
    return request({ url: url.updateNsmmComboNodeRelevance, method: 'post', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  listNsmmComboBasePage: function (parameter) {
    return request({ url: url.listNsmmComboBasePage, method: 'get', data: parameter });
  },
  listNsmmComboBaseAll: function (parameter) {
    return request({ url: url.listNsmmComboBaseAll, method: 'get', data: parameter });
  },
  getNsmmComboBase: function (parameter) {
    return request({ url: url.getNsmmComboBase, method: 'get', data: parameter });
  },
  listNsmmComboRoleBasePage: function (parameter) {
    return request({ url: url.listNsmmComboRoleBasePage, method: 'get', data: parameter });
  },
  listNsmmComboRoleBaseAll: function (parameter) {
    return request({ url: url.listNsmmComboRoleBaseAll, method: 'get', data: parameter });
  },
  getNsmmComboRoleBase: function (parameter) {
    return request({ url: url.getNsmmComboRoleBase, method: 'get', data: parameter });
  },
  listNsmmComboNodeBasePage: function (parameter) {
    return request({ url: url.listNsmmComboNodeBasePage, method: 'get', data: parameter });
  },
  listNsmmComboNodeBaseAll: function (parameter) {
    return request({ url: url.listNsmmComboNodeBaseAll, method: 'get', data: parameter });
  },
  getNsmmComboNodeBase: function (parameter) {
    return request({ url: url.getNsmmComboNodeBase, method: 'get', data: parameter });
  },
  listNsmmComboNodeRelevancePage: function (parameter) {
    return request({ url: url.listNsmmComboNodeRelevancePage, method: 'get', data: parameter });
  },
  listNsmmComboNodeRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmComboNodeRelevanceAll, method: 'get', data: parameter });
  },
  listNsmmComboNodeRelevanceDetailAll: function (parameter) {
    return request({ url: url.listNsmmComboNodeRelevanceDetailAll, method: 'get', data: parameter });
  },
  listNsmmComboBaseVersionAll: function (parameter) {
    return request({ url: url.listNsmmComboBaseVersionAll, method: 'get', data: parameter });
  },
  getNsmmComboNodeRelevance: function (parameter) {
    return request({ url: url.getNsmmComboNodeRelvance, method: 'get', data: parameter });
  },
  getDataByHttps: function (parameter) {
    return request({ url: url.getDataByHttps, method: 'post', data: parameter });
  },
  listComboNodePortDistributes: function (parameter) {
    return request({ url: url.listComboNodePortDistributes, method: 'get', data: parameter });
  },
  pageComboNodePortDistributes: function (parameter) {
    return request({ url: url.pageComboNodePortDistributes, method: 'get', data: parameter });
  },
  uploadPortDistribute: function (parameter) {
    return request({ url: url.uploadPortDistribute, method: 'post', data: parameter });
  },
  downloadPortDistributeModel: function (parameter) {
    return request({ url: url.downloadPortDistributeModel, method: 'download', data: parameter });
  },
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  /*****************************************************************************************************/
  cloneNsmmComboBase: function (parameter) {
    return request({ url: url.cloneNsmmComboBase, method: 'post', data: parameter });
  }
};

export default combo;
