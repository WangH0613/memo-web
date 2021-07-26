class NsmmComboBase {
  constructor() {
    this.comboBaseId = '';
    this.comboName = '';
    this.manufacturerBaseId = '';
    this.comboStatus = '';
    this.comboVersion = '';
    this.comboDesc = '';
    this.isUsed = '';
    this.createUserId = '';
    this.modifyUserId = '';
    this.createDate = '';
    this.modifyDate = '';
    this.modelBaseId = '';
  }
}

NsmmComboBase.prototype.reset = () => {

};

NsmmComboBase.prototype.clear = () => {
  Object.keys(this).map((item, index) => {
    this[item] = '';
  });
};

export { NsmmComboBase };
