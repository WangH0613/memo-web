import request from '@/utils/request';

const url = {
  // 保存服务器接入模型信息
  insertNsmmServeAccessModel: '/serverAccessModel/insertNsmmServeAccessModel',
  // 删除
  deleteNsmmServeAccessModel: '/serverAccessModel/deleteNsmmServeAccessModel',
  // 修改
  updateNsmmServeAccessModel: '/serverAccessModel/updateNsmmServeAccessModel',
  // 查询服务器接入模型信息
  getNsmmServeAccessModel: '/serverAccessModel/getNsmmServeAccessModel',
  // 查询服务器接入模型信息
  listNsmmServeAccessModelAll: '/serverAccessModel/listNsmmServeAccessModelAll',
  // 查询服务器接入模型信息
  listNsmmServeAccessModelPage: '/serverAccessModel/listNsmmServeAccessModelPage',
  // 查询服务器接入模型子表信息
  listNsmmServeAccessModelDetailAll: '/serverAccessModel/listNsmmServeAccessModelDetailAll',
  // 查询服务器接入模型子表信息
  listNsmmServeAccessModelDetailPage: '/serverAccessModel/listNsmmServeAccessModelDetailPage',
};

const server = {
  insertNsmmServeAccessModel: function (parameter) {
    return request({ url: url.insertNsmmServeAccessModel, method: 'post', data: parameter });
  },
  deleteNsmmServeAccessModel: function (parameter) {
    return request({ url: url.deleteNsmmServeAccessModel, method: 'post', data: parameter });
  },
  updateNsmmServeAccessModel: function (parameter) {
    return request({ url: url.updateNsmmServeAccessModel, method: 'post', data: parameter });
  },
  getNsmmServeAccessModel: function (parameter) {
    return request({ url: url.getNsmmServeAccessModel, method: 'get', data: parameter });
  },
  listNsmmServeAccessModelAll: function (parameter) {
    return request({ url: url.listNsmmServeAccessModelAll, method: 'get', data: parameter });
  },
  listNsmmServeAccessModelPage: function (parameter) {
    return request({ url: url.listNsmmServeAccessModelPage, method: 'get', data: parameter });
  },
  listNsmmServeAccessModelDetailAll: function (parameter) {
    return request({ url: url.listNsmmServeAccessModelDetailAll, method: 'get', data: parameter });
  },
  listNsmmServeAccessModelDetailPage: function (parameter) {
    return request({ url: url.listNsmmServeAccessModelDetailPage, method: 'get', data: parameter });
  }
};

export default server;
