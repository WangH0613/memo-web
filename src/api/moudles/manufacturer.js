import request from '@/utils/request'

const url = {
  // 新增厂商
  insertNsmmManufacturerBase: '/manufacturer/insertNsmmManufacturerBase',
  // 删除厂商
  deleteNsmmManufacturerBase: '/manufacturer/deleteNsmmManufacturerBase',
  // 查询厂商 - 单个
  getNsmmManufacturerBase: '/manufacturer/getNsmmManufacturerBase',
  // 列表厂商 - 不分页
  listNsmmManufacturerBaseAll: '/manufacturer/listNsmmManufacturerBaseAll',
  // 列表厂商 - 分页
  listNsmmManufacturerBasePage: '/manufacturer/listNsmmManufacturerBasePage',
  // 修改厂商
  updateNsmmManufacturerBase: '/manufacturer/updateNsmmManufacturerBase',
};

const manufacturer = {
  insertNsmmManufacturerBase: function (parameter) {
    return request({ url: url.insertNsmmManufacturerBase, method: 'post', data: parameter });
  },
  deleteNsmmManufacturerBase: function (parameter) {
    return request({ url: url.deleteNsmmManufacturerBase, method: 'post', data: parameter });
  },
  getNsmmManufacturerBase: function (parameter) {
    return request({ url: url.getNsmmManufacturerBase, method: 'get', data: parameter });
  },
  listNsmmManufacturerBaseAll: function (parameter) {
    return request({ url: url.listNsmmManufacturerBaseAll, method: 'get', data: parameter });
  },
  listNsmmManufacturerBasePage: function (parameter) {
    return request({ url: url.listNsmmManufacturerBasePage, method: 'get', data: parameter });
  },
  updateNsmmManufacturerBase: function (parameter) {
    return request({ url: url.updateNsmmManufacturerBase, method: 'post', data: parameter });
  },
};

export default manufacturer;
