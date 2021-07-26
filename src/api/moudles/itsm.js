import request from '@/utils/request'

const dictType = {
  modelType: 'model_type',
  checkStatus: 'check_status',
  mediaType: 'media_type',
  lineRelevanceType: 'line_relevance_type',
  relationshipType: 'relationship_type',
  comboStatus: 'combo_status',
  speedUnit: 'speed_unit'
};

const url = {
  // 提交审核 创建工单
  commonCreateTicket: '/itsmBiz/commonCreateTicket',
  // 查询工单处理流程记录
  getProcessRecords: '/itsmBiz/getProcessRecords',
  // 根据主键itsmTicketBaseId 获取 工单信息
  getNsmmItsmTicketBase: '/itsmBiz/getNsmmItsmTicketBase',
  // 根据工单id { itsmTicketId }
  // getTicketByTicketId: '/itsmBiz/getTicketByTicketId',
  getTicketByTicketId: 'itsm/anon/getTicketByTicketId',
  // 审核撤回
  retrieveTicket: '/itsmBiz/retrieveTicket',
  // 需要放行的接口
  listNsmmDictAll: 'itsm/anon/listNsmmDictAll',
  // 模型
  getNsmmModelBase: 'itsm/anon/getNsmmModelBase',
  listNsmmModelRoleBaseAll: 'itsm/anon/listNsmmModelRoleBaseAll',
  listNsmmModelNodeBaseAll: 'itsm/anon/listNsmmModelNodeBaseAll',
  listNsmmModelNodeRelevanceAll: 'itsm/anon/listNsmmModelNodeRelevanceAll',
  listNsmmComboBaseAll: 'itsm/anon/listNsmmComboBaseAll',
  // 套餐
  getNsmmComboBase: 'itsm/anon/getNsmmComboBase',
  listNsmmComboNodeBaseAll: 'itsm/anon/listNsmmComboNodeBaseAll',
  listComboNodePortDistributes: 'itsm/anon/listComboNodePortDistributes',

  listNsmmComboNodeRelevanceDetailAll: 'itsm/anon/listNsmmComboNodeRelevanceDetailAll',
  getModelNodeChart: 'itsm/anon/getModelNodeChart'
};

const itsm = {
  // 创建工单
  commonCreateTicket: function (parameter) {
    return request({ url: url.commonCreateTicket, method: 'post', data: parameter });
  },
  // 返回检查状态的字典表
  getProcessRecords: function (parameter) {
    return request({ url: url.getProcessRecords, method: 'get', data: parameter });
  },
  // 返回检查状态的字典表
  listNsmmDictCheckStatus: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.checkStatus } });
  },
  // 返回模型类型的字典表
  listNsmmDictModelType: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.modelType } });
  },
  // 返回连线关系的字典表
  listNsmmDictLineRelevanceType: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.lineRelevanceType } });
  },
  // 返回互联关系的字典表
  listNsmmDictRelationshipType: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.relationshipType } });
  },
  // 返回介质类型的字典表
  listNsmmDictMediaType: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.mediaType } });
  },
  // 返回套餐状态的字典表
  listNsmmDictComboVersion: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.comboStatus } });
  },
  // 返回模型连线速率的字典表
  listNsmmDictSpeedUnit: function () {
    return request({ url: url.listNsmmDictAll, method: 'get', data: { dataType: dictType.speedUnit } });
  },
  getNsmmModelBase: function (parameter) {
    return request({ url: url.getNsmmModelBase, method: 'get', data: parameter });
  },
  listNsmmModelRoleBaseAll: function (parameter) {
    return request({ url: url.listNsmmModelRoleBaseAll, method: 'get', data: parameter });
  },
  listNsmmModelNodeBaseAll: function (parameter) {
    return request({ url: url.listNsmmModelNodeBaseAll, method: 'get', data: parameter });
  },
  listNsmmModelNodeRelevanceAll: function (parameter) {
    return request({ url: url.listNsmmModelNodeRelevanceAll, method: 'get', data: parameter });
  },
  getNsmmComboBase: function (parameter) {
    return request({ url: url.getNsmmComboBase, method: 'get', data: parameter });
  },
  listNsmmComboBaseAll: function (parameter) {
    return request({ url: url.listNsmmComboBaseAll, method: 'get', data: parameter });
  },
  listNsmmComboNodeBaseAll: function (parameter) {
    return request({ url: url.listNsmmComboNodeBaseAll, method: 'get', data: parameter });
  },
  listComboNodePortDistributes: function (parameter) {
    return request({ url: url.listComboNodePortDistributes, method: 'get', data: parameter });
  },
  listNsmmComboNodeRelevanceDetailAll: function (parameter) {
    return request({ url: url.listNsmmComboNodeRelevanceDetailAll, method: 'get', data: parameter });
  },
  getModelNodeChart: function (parameter) {
    return request({ url: url.getModelNodeChart, method: 'get', data: parameter });
  },
  getNsmmItsmTicketBase: function (parameter) {
    return request({ url: url.getNsmmItsmTicketBase, method: 'get', data: parameter });
  },
  getTicketByTicketId: function (parameter) {
    return request({ url: url.getTicketByTicketId, method: 'get', data: parameter });
  },
  retrieveTicket: function (parameter) {
    return request({ url: url.retrieveTicket, method: 'post', data: parameter });
  }
};

export default itsm;
