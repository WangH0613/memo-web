<template>
  <div>
    <a-row>
      <a-col class="left f16" :span="24">
        <div>方案名称: {{ nsmmSchemeBaseDataObject.form.schemeName }}</div>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col :span="8">
        <div class="left f16">选择套餐数量</div>
      </a-col>
    </a-row>
    <a-divider/>
    <!--    套餐数量-->
    <a-form-model
      ref="form"
      layout="vertical"
      :model="nsmmSchemeComboBaseData.form"
      :rules="nsmmSchemeComboBaseData.rules"
    >
      <a-table
        class="mt24"
        size="middle"
        :columns="nsmmSchemeComboBaseTable"
        :data-source.sync="nsmmSchemeBaseDataObject.comboData"
        :bordered="true"
        :rowKey='(record, index) => {return index}'
        :pagination="false"
      >
        <template slot="comboNum" slot-scope="text, record, index">
          <a-form-model-item :prop="'comboNum' + index">
            <a-input-number
              v-model="nsmmSchemeComboBaseData.form[Object.keys(nsmmSchemeComboBaseData.form)[index]]"
              style="width: 80%"
              :min="1"
            />
          </a-form-model-item>
        </template>
      </a-table>
    </a-form-model>
  </div>
</template>
<script>
  import { NsmmSchemeBase } from '@/form';

  export default {
    name: 'EditNsmmSchemeComboBase',
    props: [ 'mode', 'nsmmSchemeBaseId' ],
    created() {
      this.initPageData()
    },
    data() {
      return {
        // 定义方案信息数据对象
        nsmmSchemeBaseDataObject: {
          form: { ...new NsmmSchemeBase() },
          comboData: []
        },
        // 定义列头
        nsmmSchemeComboBaseTable: [
          { title: '套餐名称', dataIndex: 'nsmmComboBase.comboName', width: '150px' },
          { title: '套餐状态', dataIndex: 'nsmmComboBase.comboVersionName', width: '120px' },
          { title: '厂商', dataIndex: 'nsmmComboBase.manufacturerBaseName', width: '150px' },
          { title: '数量', dataIndex: 'comboNum', width: '150px', scopedSlots: { customRender: 'comboNum' } }
        ],
        nsmmSchemeComboBaseData: {
          form: {},
          rules: {},
          tmpForm: {}, // 临时存储，提交时比对是否修改了数量
          schemeComboBaseIds: [],
          comboNums: []
        }
      }
    },
    methods: {
      // 页面初始化方法封装在这里
      async initPageData() {
        if (this.nsmmSchemeBaseId !== '') {
          this.nsmmSchemeBaseDataObject.form.schemeBaseId = this.nsmmSchemeBaseId
          await this.$api.scheme.getNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
            .then(res => {
              this.nsmmSchemeBaseDataObject.form = { ...res.data };
            })
          await this.$api.scheme.listNsmmSchemeComboBaseAll({
            schemeBaseId: this.nsmmSchemeBaseId
          })
            .then(res => {
              let index = 0;
              this.nsmmSchemeComboBaseData.schemeComboBaseIds = [];
              this.nsmmSchemeComboBaseData.tmpData = res.data;
              this.nsmmSchemeBaseDataObject.comboData = (res.data || []).map(d => {
                // d.comboNum = d.comboNum ? d.comboNum : 1;
                this.nsmmSchemeComboBaseData.schemeComboBaseIds.push(d.schemeComboBaseId);
                this.$set(this.nsmmSchemeComboBaseData.tmpForm, 'comboNum' + index, d.comboNum)
                this.$set(this.nsmmSchemeComboBaseData.form, 'comboNum' + index, d.comboNum ? d.comboNum : '')
                this.$set(this.nsmmSchemeComboBaseData.rules, 'comboNum' + index, [
                  {
                    required: true,
                    message: '数量不能为空',
                    trigger: ['blur', 'change']
                  }
                ])
                index++;
                return d;
              })
            })
        }
      },
      doUpdateNsmmSchemeComboBase() {
        // 对比有没有操作数据
        let tmp = false;
        for (var i in this.nsmmSchemeComboBaseData.tmpForm) {
          if (this.nsmmSchemeComboBaseData.tmpForm[i] !== this.nsmmSchemeComboBaseData.form[i]) {
            tmp = true;
            break;
          }
        }
        if (tmp) {
          this.$refs.form.validate(this.updateNsmmSchemeComboBase);
        } else {
          this.$emit('commitResult', {
            mode: 'update',
            status: 'success',
            object: {
              schemeBaseId: this.nsmmSchemeBaseId
            }
          });
        }
      },
      updateNsmmSchemeComboBase(isCheck, formObjects) {
        if (isCheck) {
          let _this = this;
          this.nsmmSchemeComboBaseData.comboNums = [];
          for (var i in this.nsmmSchemeComboBaseData.form) {
            this.nsmmSchemeComboBaseData.comboNums.push(this.nsmmSchemeComboBaseData.form[i]);
          }
          this.$confirm({
            title: '确认更新当前套餐信息？',
            okText: '确认',
            cancelText: '暂不更新',
            onOk() {
              _this.$api.scheme.updateNsmmSchemeComboBase({
                schemeComboBaseIds: _this.nsmmSchemeComboBaseData.schemeComboBaseIds.join(','),
                comboNums: _this.nsmmSchemeComboBaseData.comboNums.join(',')
              })
                .then(res => {
                  // 新增成功的同时 需要将全局模式调整为update
                  _this.$emit('commitResult', {
                    mode: 'update',
                    status: 'success',
                    object: {
                      schemeBaseId: _this.nsmmSchemeBaseId
                    }
                  });
                })
            },
            onCancel() {
              _this.$emit('commitResult', {
                mode: 'update',
                status: 'success',
                object: {
                  schemeBaseId: _this.nsmmSchemeBaseId
                }
              });
            }
          });
        }
      }
    }
  }
</script>

<style></style>
