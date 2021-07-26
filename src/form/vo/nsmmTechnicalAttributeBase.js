class NsmmTechnicalAttributeBase {
  constructor() {
    this.technicalAttributeBaseId = '';
    this.technicalAttributeName = '';
    this.technicalAttributeDesc = '';
    this.technicalAttributeTemplate = '';
    this.technicalAttributeConfigPar = '';
    this.technicalAttributeVersion = '';
    this.technicalAttributeStatus = '';
    this.technicalAttributeExample = '';
    this.isUsed = '';
    this.createUserId = '';
    this.modifyUserId = '';
    this.createDate = '';
    this.modifyDate = '';
    this.modelBaseId = '';
    this.comboBaseId = '';
    this.comboNodeBaseId = '';
    this.modelBaseId = '';
    this.deleted = '';
  }
}

NsmmTechnicalAttributeBase.prototype.reset = () => {

};

NsmmTechnicalAttributeBase.prototype.clear = () => {
  Object.keys(this).map((item, index) => {
    this[item] = '';
  });
};

export { NsmmTechnicalAttributeBase };

