class NsmmComboNodeRelevanceDetail {
  constructor() {
    this.id = '';
  }
}

NsmmComboNodeRelevanceDetail.prototype.reset = () => {

};

NsmmComboNodeRelevanceDetail.prototype.clear = () => {
  Object.keys(this).map((item, index) => {
    this[item] = '';
  });
};

export { NsmmComboNodeRelevanceDetail };
