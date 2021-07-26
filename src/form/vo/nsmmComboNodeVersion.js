class NsmmComboNodeVersion {
  constructor() {
    this.id = '';
    this.realitySpeed = '';
    this.realityNum = '';
    this.version = '';
    this.createDate = '';
    this.modifyDate = '';
    this.nodeRelevanceId = '';
    this.comboBaseVersionId = '';
  }
}

NsmmComboNodeVersion.prototype.reset = () => {

};

NsmmComboNodeVersion.prototype.clear = () => {
  Object.keys(this).map((item, index) => {
    this[item] = '';
  });
};

export { NsmmComboNodeVersion };
