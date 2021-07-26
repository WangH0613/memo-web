const ObjectUtils = {
  genSearch(search, page) {
    const tempObj = { ...search };
    if (!page) {
      delete tempObj['current'];
      delete tempObj['pageSize'];
      delete tempObj['total'];
    }
    Object.keys(tempObj).map((item, index) => {
      if (tempObj[item] === '' || !tempObj) {
        delete tempObj[item];
      }
    });
    return tempObj;
  }
};

export { ObjectUtils }