class Pagination {
  constructor() {
    this.current = 1;
    this.total = 0;
    this.defaultCurrent = 1;
    this.defaultPageSize = 10;
    this.hideOnSinglePage = false;
    this.showTotal = total => `共 ${total} 条数据`;
    this.showSizeChanger = true;
    this.showQuickJumper = true;
    this.pageSizeOptions = ['10', '20', '30', '40'];
    this.onShowSizeChange = (current, pageSize) => this.pageSize = pageSize;
  }
};

export { Pagination };