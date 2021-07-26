<template>
  <a-row>
    <a-col :span="8" :offset="8">
      <a-form-model
        ref="form"
        :rules="rules"
        layout="vertical"
        :model="nsmmSchemeBaseDataObject.form">

        <a-form-model-item label="方案名称" prop="schemeName">
          <a-input
            allow-clear
            v-model="nsmmSchemeBaseDataObject.form.schemeName"
            placeholder="请输入方案名称"
          />
        </a-form-model-item>
        <a-form-model-item label="所含套餐" prop="comboBaseIds">
          <a-select
            mode="multiple"
            size="default"
            placeholder="请选择套餐"
            :value="selectedItems"
            @change="handleChange"
          >
            <a-select-option
              v-for="(item, index) in nsmmSchemeBaseDataObject.comboData"
              :key="index"
            >
              {{ item.comboName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="所属数据中心" prop="dataCenterId">
          <a-select
            allow-clear
            v-model="nsmmSchemeBaseDataObject.form.dataCenterId"
            placeholder="请选择数据中心"
          >
            <a-select-option
              :value="item.datacenterId.toString()"
              v-for="(item, index) in nsmmDataCenterObject.data"
              :key="index">
              {{ item.datacenterName ?  item.datacenterName : '-'}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="备注信息" class="mb0" prop="schemeDesc">
          <a-textarea
            allow-clear
            v-model="nsmmSchemeBaseDataObject.form.schemeDesc"
            placeholder="请输入备注信息" :rows="4"/>
        </a-form-model-item>
      </a-form-model>
    </a-col>
  </a-row>
</template>

<script>
import { NsmmSchemeBase } from '@/form';

  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  export default {
    name: 'EditNsmmSchemeBase',
    props: [ 'mode', 'nsmmSchemeBaseId' ],
    created() {
      this.getSelectData();
      this.initPageData();
    },
    computed: {
      filteredOptions() {
        return OPTIONS.filter(o => !this.nsmmSchemeBaseDataObject.form.comboBaseId.includes(o));
      }
    },
    data() {
      return {
        selectedItems: [],
        // 定义数据对象
        nsmmSchemeBaseDataObject: {
          form: { ...new NsmmSchemeBase() },
          comboData: [],
          schemeComboBases: []
        },
        // 定义字典对象
        nsmmDataCenterObject: {
          data: []
        },
        // 定义校验规则
        rules: {
          schemeName: [
            { required: true, message: '请输入方案名称', trigger: 'blur' },
            { min: 1, max: 30, message: '方案名称长度为1-30个字符', trigger: 'blur' },
            { pattern: /^[^\s]*$/, message: '禁止输入空格', trigger: ['change', 'blur'] }
          ],
          dataCenterId: [
            { required: true, message: '请选择数据中心', trigger: ['change', 'blur'] }
          ],
          comboBaseIds: [
            { required: true, message: '请选择套餐', trigger: ['change', 'blur'] }
          ],
          schemeDesc: [
            { required: false, message: '请输入方案描述', trigger: 'blur' },
            { min: 1, max: 250, message: '方案描述信息长度为1-250个字符', trigger: 'blur' },
            { pattern: /^[^\s]*$/, message: '禁止输入空格', trigger: ['change', 'blur'] }
          ]
        }
      }
    },
    watch: {
      'nsmmSchemeBaseDataObject.comboData': function (newValue, oldValue) {
        if (newValue.length > 0 && this.nsmmSchemeBaseDataObject.schemeComboBases.length > 0) {
          let _this = this;
          let temComboBaseIds = [];
          _this.nsmmSchemeBaseDataObject.schemeComboBases.forEach(function (record, key) {
            newValue.forEach(function (item, index) {
              if (record.comboBaseId === item.comboBaseId) {
                _this.selectedItems.push(index);
                temComboBaseIds.push(item.comboBaseId);
              }
            })
          })
          this.nsmmSchemeBaseDataObject.form.comboBaseIds = temComboBaseIds.join(',');
        }
      },
      'nsmmSchemeBaseDataObject.schemeComboBases': function (newValue, oldValue) {
        if (newValue.length > 0 && this.nsmmSchemeBaseDataObject.comboData.length > 0) {
          let _this = this;
          let temComboBaseIds = [];
          newValue.forEach(function (record, key) {
            _this.nsmmSchemeBaseDataObject.comboData.forEach(function (item, index) {
              if (record.comboBaseId === item.comboBaseId) {
                _this.selectedItems.push(index);
                temComboBaseIds.push(item.comboBaseId);
              }
            })
          })
          this.nsmmSchemeBaseDataObject.form.comboBaseIds = temComboBaseIds.join(',');
        }
      },
    },
    methods: {
      async getSelectData() {
        // 获取套餐信息
        await this.$api.select.getComboSelect({
          comboStatus: 3
        })
          .then(res => {
            if (res.data && res.data.length) {
              this.nsmmSchemeBaseDataObject.comboData = res.data;
            }
          })
        // 获取数据中心列表
        await this.$api.select.getDataCenterSelect()
          .then(res => {
            if (res.data && res.data.length) {
              this.nsmmDataCenterObject.data = res.data;
            }
          })
      },
      // 页面初始化方法封装在这里
      async initPageData() {
        this.nsmmSchemeBaseDataObject.form.dataCenterId = undefined;
        if (this.nsmmSchemeBaseId !== '') {
          this.nsmmSchemeBaseDataObject.form.schemeBaseId = this.nsmmSchemeBaseId
          await this.$api.scheme.getNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
            .then(res => {
              res.data.dataCenterId = res.data.dataCenterId ? res.data.dataCenterId : undefined;
              this.nsmmSchemeBaseDataObject.form = { ...res.data };
              this.nsmmSchemeBaseDataObject.schemeComboBases = res.data.schemeComboBases;
            })
        }
      },
      handleChange(selectedItems) {
        let _this = this;
        let temArr = [];
        selectedItems.forEach(function (item, index) {
          temArr.push(_this.nsmmSchemeBaseDataObject.comboData[item].comboBaseId);
        })
        this.selectedItems = selectedItems;
        this.nsmmSchemeBaseDataObject.form.comboBaseIds = temArr.join(',');
      },
      popupScroll() {
        console.log('popupScroll');
      },
      doInsertNsmmSchemeBase() {
        this.$refs.form.validate(this.insertNsmmSchemeBase);
      },
      doUpdateNsmmSchemeBase() {
        this.$refs.form.validate(this.updateNsmmSchemeBase);
      },
      insertNsmmSchemeBase(isCheck, formObjects) {
        if (isCheck) {
          this.$api.scheme.insertNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
            .then(res => {
              // 新增成功 返回nsmmSchemeBaseId
              // 新增成功的同时 需要将全局模式调整为update
              this.$emit('commitResult', {
                mode: 'update',
                status: 'success',
                object: res.data
              });
            }).catch(error => {
              this.$emit(
                'commitResult', {
                  mode: this.mode,
                  status: 'error',
                  object: null
                });
            });
        } else {
          this.$message.error('请检查方案基础信息是否完整/合规后，进行重试');
        }
      },
      updateNsmmSchemeBase(isCheck, formObjects) {
        if (isCheck) {
          delete this.nsmmSchemeBaseDataObject.form.schemeComboBases;
          this.$api.scheme.updateNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
            .then(res => {
              // 更新成功 返回nsmmSchemeBaseId
              this.$emit('commitResult', {
                mode: this.mode,
                status: 'success',
                object: res.data
              });
            }).catch(error => {
              this.$emit('commitResult', {
                mode: this.mode,
                status: 'error',
                object: null
              });
            });
        } else {
          this.$message.error('请检查方案基础信息是否完整/合规后，进行重试');
        }
      }
    }
  }
</script>

<style></style>
