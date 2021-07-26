class Search {
  constructor() {
    // 通用查询属性
    this.keywords = '';
    this.startDate = '';
    this.endDate = '';
    // 用户类型查询属性
    this.createUserId = '';
    this.updateUserId = '';
    // 字典类型查询属性
    // 主键类查询属性
    this.modelBaseId = '';
    this.modelNodeBaseId = '';
    this.modelNodeRelevanceId = '';
    this.modelRoleBaseId = '';
    this.comBoBaseId = '';
    this.comboNodeBaseId = '';
    this.comboNodeRelevanceId = '';
    this.comboNodeRelevanceDetailId = '';
    // 方案套餐查询
    this.schemeBaseId = '';
    this.relevanceType = '';
    this.dimension = '';
    // 状态类型查询属性
    this.checkStatus = '';
    this.modelType = '';
    this.comboStatus = '';
    this.comboVersion = '';
    this.modelName = '';
    // 分页查询属性
    this.current = 1;
    this.pageSize = 10;
    this.total = 0;
  }
}

export { Search };