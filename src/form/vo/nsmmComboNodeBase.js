class NsmmComboNodeBase {
  constructor() {
    this.comboBaseId = '';
    this.comboNodeBaseId = '';
    this.modelRoleBaseId = '';
    this.typicalConfig = '';
    this.hardwareModel = '';
    this.boardCard = '';
    this.slot = '';
    this.subSlot = '';
    this.portDistribute = '';
    this.portButtonLoading = '';
    this.version = '';
    this.createDate = '';
    this.modifyDate = '';
  }
}

NsmmComboNodeBase.prototype.reset = () => {

};

NsmmComboNodeBase.prototype.clear = () => {
  Object.keys(this).map((item, index) => {
    this[item] = '';
  });
};

export { NsmmComboNodeBase };
