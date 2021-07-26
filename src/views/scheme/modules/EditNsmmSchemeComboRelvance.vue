<template>
  <div>
    <a-row>
      <a-col :span="24">
        <div class="f16">方案名称: {{ nsmmSchemeBaseDataObject.form.schemeName }}</div>
      </a-col>
    </a-row>
    <a-divider/>
    <a-divider/>
    <a-row>
      <a-col :span="8">
        <div class="left f16">套餐互联关系</div>
      </a-col>
      <a-col :span="16" class="right">
        <a-button
          icon="plus"
          type="primary"
          @click="insertRow('schemeComboRelvanceBase')">
          添加套餐互联关系
        </a-button>
      </a-col>
    </a-row>
    <!--    套餐数量-->
    <a-table
      class="mt24"
      ref="nsmmPlanPackageConnectionBaseTable"
      size="middle"
      :columns="nsmmSchemeComboRelvanceBaseTable"
      :data-source.sync="nsmmSchemeComboRelvanceBaseDataObject.data"
      :bordered="true"
      :rowKey='(record, index)=>{return index}'
      :pagination="false"
    >
      <template slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template
        slot="fromSchemeComboRealId"
        slot-scope="text, record, index">
        <a-select
          style="width:100%"
          v-if="record.isEdit"
          v-model="record.fromSchemeComboRealId"
          placeholder="请选择本端套餐"
          @change="(value) => {
            record.fromSchemeComboRealName = nsmmSchemeBaseDataObject.comboData.filter(it =>
              value.toString() === it.schemeComboRealId.toString())[0].selectName
          }"
        >
          <a-select-option
            :value="item.schemeComboRealId.toString()"
            v-for="(item, index) in nsmmSchemeBaseDataObject.comboData"
            :key="index"
          >
            {{ item.selectName }}
          </a-select-option>
        </a-select>
        <template v-if="!record.isEdit">
          {{ record.fromSchemeComboRealName }}
        </template>
      </template>
      <template
        slot="toSchemeComboRealId"
        slot-scope="text, record, index">
        <a-select
          style="width:100%"
          v-if="record.isEdit"
          v-model="record.toSchemeComboRealId"
          placeholder="请选择对端套餐"
          @change="(value) => {
            record.toSchemeComboRealName = nsmmSchemeBaseDataObject.comboData.filter(it =>
              value.toString() === it.schemeComboRealId.toString())[0].selectName
          }"
        >
          <a-select-option
            :value="item.schemeComboRealId.toString()"
            v-for="(item, index) in nsmmSchemeBaseDataObject.comboData"
            :key="index"
          >
            {{ item.selectName }}
          </a-select-option>
        </a-select>
        <template v-if="!record.isEdit">
          {{ record.toSchemeComboRealName }}
        </template>
      </template>

      <template slot="relevanceType" slot-scope="text, record, index">
        <a-radio-group
          v-model="record.relevanceType"
          @change="relevanceTypeRadio"
        >
          <a-radio
            :value="item.dataCode"
            v-for="(item, index) in nsmmDictDataObject.relevanceType"
            :key="index"
            :disabled="!record.isEdit ? true : false"
          >
            {{ item.dataValue }}
          </a-radio>
        </a-radio-group>
      </template>

      <template
        slot="relevanceNum"
        slot-scope="text, record, index">
        <a-form-model
          :ref="'relevanceNumForm'+record.schemeBaseId"
          :model="record"
          v-if="record.isEdit"
          :rules="rulesObject.nsmmSchemeComboRelevance"
        >
          <a-form-model-item class="mb0" prop="relevanceNum" :has-feedback="true">
            <a-input
              v-model="record.relevanceType === '0' ? '' : record.relevanceNum"
              @change="record.relevanceNum = record.relevanceNum.trim()"
              :disabled="record.relevanceType === '0' ? true : false"
            />
          </a-form-model-item>
        </a-form-model>
        <template v-if="!record.isEdit">{{ record.relevanceNum }}</template>
      </template>

      <template
        slot="action"
        slot-scope="text, record, index">
        <template v-if="record.isEdit && record.isEdit === 'add'">
          <a @click="validateRow(record,'add','schemeComboRelvanceBase')">确认新增</a>
          <a-divider type="vertical"/>
          <a @click="cancelInsertRow(record,'schemeComboRelvanceBase')">取消新增</a>
        </template>
        <template v-else-if="record.isEdit && record.isEdit === 'update'">
          <a @click="validateRow(record,'update','schemeComboRelvanceBase')">确认修改</a>
          <a-divider type="vertical"/>
          <a @click="cancelUpdateRow(record,'schemeComboRelvanceBase')">取消修改</a>
        </template>
        <template v-else>
          <a @click="updateRow(record,'schemeComboRelvanceBase')">修改</a>
          <a-divider type="vertical"/>
          <a @click="deleteRow(record,'schemeComboRelvanceBase')">删除</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { NsmmSchemeBase, NsmmSchemeComboRelevance, Search } from '@/form';

  export default {
    name: 'EditNsmmSchemeComboRelvance',
    props: [ 'mode', 'nsmmSchemeBaseId' ],
    created() {
      this.initPageData();
      this.initNsmmDict();
    },
    data() {
      return {
        // 定义方案信息数据对象
        nsmmSchemeBaseDataObject: {
          form: { ...new NsmmSchemeBase() },
          comboData: []
        },
        nsmmSchemeComboRelvanceBaseDataObject: {
          params: { ...new Search() },
          data: [],
          // page: { ...new Pagination() },
          loading: false,
          isEdit: false,
          form: { ...new NsmmSchemeComboRelevance() },
          // 修改模式下 暂存的原始数据 用于取消编辑后的数据恢复
          editObjectList: []
        },
        // 定义列头
        nsmmSchemeComboRelvanceBaseTable: [
          { title: '#', scopedSlots: { customRender: 'serial' }, width: 40, align: 'center' },
          { title: '本端套餐', dataIndex: 'fromSchemeComboRealId', width: '150px', scopedSlots: { customRender: 'fromSchemeComboRealId' } },
          { title: '对端套餐', dataIndex: 'toSchemeComboRealId', width: '150px', scopedSlots: { customRender: 'toSchemeComboRealId' } },
          {
            title: '互联方式',
            dataIndex: 'relevanceType',
            width: '150px',
            scopedSlots: { customRender: 'relevanceType' }
          },
          { title: '单台节点链路数', dataIndex: 'relevanceNum', width: '150px', scopedSlots: { customRender: 'relevanceNum' } },
          { title: '操作', align: 'center', dataIndex: 'action', width: '120px', scopedSlots: { customRender: 'action' } }
        ],
        // 定义校验规则
        rulesObject: {
          nsmmSchemeComboRelevance: {
            relevanceNum: [
              { required: false, message: '请输入总带宽', trigger: [ 'change', 'blur' ], whitespace: true },
              { min: 1, max: 10, message: '总带宽长度为1-10个字符', trigger: [ 'change', 'blur' ] },
              { pattern: /^[^\s]*$/, message: '禁止输入空格', trigger: [ 'change', 'blur' ] },
              { pattern: /^\d+$|^\d+[.]?\d+$/, message: '只允许数字', trigger: [ 'change', 'blur' ] }
            ]
          }
        },
        // 定义字典对象
        nsmmDictDataObject: {
          relevanceType: []
        }
      }
    },
    methods: {
      // 页面初始化方法封装在这里
      async initPageData() {
        if (this.nsmmSchemeBaseId !== '') {
          this.nsmmSchemeBaseDataObject.form.schemeBaseId = this.nsmmSchemeBaseId;
          await this.$api.scheme.getNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
            .then(res => {
              this.nsmmSchemeBaseDataObject.form = { ...res.data };
            })
          await this.$api.select.getSchemeComboRealSelect({
            schemeBaseId: this.nsmmSchemeBaseId
          })
            .then(res => {
              this.nsmmSchemeBaseDataObject.comboData = res.data;
            })
          await this.listNsmmSchemeComboRealRelevanceAll();
        }
      },
      async initNsmmDict() {
        await this.$api.pub.listNsmmDictRelevanceType().then(res => {
          this.nsmmDictDataObject.relevanceType = res.data;
        });
      },
      listNsmmSchemeComboRealRelevanceAll() {
        let _this = this;
        this.nsmmSchemeComboRelvanceBaseDataObject.loading = true;
        this.nsmmSchemeComboRelvanceBaseDataObject.params.schemeBaseId = this.nsmmSchemeBaseId;
        this.$api.scheme.listNsmmSchemeComboRealRelevanceAll(this.$object.genSearch(this.nsmmSchemeComboRelvanceBaseDataObject.params, false))
          .then(res => {
            if (res.data !== null && res.data && res.data.length > 0) {
              _this.nsmmSchemeComboRelvanceBaseDataObject.data = res.data.map(item => {
                item.isEdit = false;
                item.fromSchemeComboRealName = item.fromSchemeComboRealName + '-' + item.fromSchemeComboRealIndex;
                item.fromSchemeComboRealId = item.fromSchemeComboRealId.toString();
                item.toSchemeComboRealName = item.toSchemeComboRealName + '-' + item.toSchemeComboRealIndex;
                item.toSchemeComboRealId = item.toSchemeComboRealId.toString();
                item.relevanceNum = item.relevanceNum ? item.relevanceNum.toString() : '';
                return item;
              });
            } else {
              this.nsmmSchemeComboRelvanceBaseDataObject.data = [];
            }
          })
          .catch(error => {
            _this.nsmmSchemeComboRelvanceBaseDataObject.data = [];
          })
          .finally(() => {
            _this.nsmmSchemeComboRelvanceBaseDataObject.loading = false;
          });
      },
      // 向表中添加一行
      insertRow(tableName) {
        if (tableName === 'schemeComboRelvanceBase') {
          if (!this.nsmmSchemeBaseDataObject.comboData || this.nsmmSchemeBaseDataObject.comboData.length === 0) {
            this.$message.error('当前模型下未配置节点信息，请返回上一步配置节点信息');
            return false;
          }
          if (this.countAddRow('schemeComboRelvanceBase') >= 1) {
            this.$message.error('新建节点互联关系信息未保存，请完成后再新建节点互联关系');
            return false;
          }
          const nsmmSchemeComboRelevance = { ...new NsmmSchemeComboRelevance() };
          nsmmSchemeComboRelevance.isEdit = 'add';
          nsmmSchemeComboRelevance.schemeBaseId = this.nsmmSchemeBaseId;
          // 为新增的互联关系 配置默认选中值
          nsmmSchemeComboRelevance.fromSchemeComboRealId = this.nsmmSchemeBaseDataObject.comboData[0].schemeComboRealId.toString();
          nsmmSchemeComboRelevance.fromSchemeComboRealName = this.nsmmSchemeBaseDataObject.comboData[0].selectName;
          nsmmSchemeComboRelevance.toSchemeComboRealId = this.nsmmSchemeBaseDataObject.comboData[0].schemeComboRealId.toString();
          nsmmSchemeComboRelevance.toSchemeComboRealName = this.nsmmSchemeBaseDataObject.comboData[0].selectName
          nsmmSchemeComboRelevance.relevanceType = this.nsmmDictDataObject.relevanceType[0].dataCode;
          this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = true;
          this.nsmmSchemeComboRelvanceBaseDataObject.data.unshift(nsmmSchemeComboRelevance);
        }
      },
      // 进行修改 改变行状态
      updateRow(record, tableName) {
        if (tableName === 'schemeComboRelvanceBase') {
          if (this.nsmmSchemeComboRelvanceBaseDataObject.isEdit) {
            this.$message.error('节点互联信息未保存，请保存后再配置节点互联信息');
          } else {
            record.isEdit = 'update';
            // 将等待修改的数据存入暂存区
            this.nsmmSchemeComboRelvanceBaseDataObject.editObjectList.push({ ...record });
            this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = true;
          }
        }
      },
      // 取消新增的行
      cancelInsertRow(record, tableName) {
        if (tableName === 'schemeComboRelvanceBase') {
          this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = false;
          this.nsmmSchemeComboRelvanceBaseDataObject.data.shift();
        }
      },
      // 取消修行的修改状态
      cancelUpdateRow(record, tableName) {
        if (tableName === 'schemeComboRelvanceBase') {
          const schemeBaseId = record.schemeBaseId;
          let tempateIndex = null;
          this.nsmmSchemeComboRelvanceBaseDataObject.editObjectList.forEach(function (item, index) {
            if (item.schemeBaseId === schemeBaseId) {
              tempateIndex = index;
              Object.keys(record).forEach(function (item_s) {
                record[item_s] = item[item_s];
              });
              record.isEdit = false;
            }
          });
          if (tempateIndex !== null) {
            this.nsmmSchemeComboRelvanceBaseDataObject.editObjectList.splice(tempateIndex, 1);
          }
          this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = false;
        }
      },
      validateRow(record, editType, tableName) {
        let _this = this;
        if (tableName === 'schemeComboRelvanceBase') {
          if (record.fromSchemeComboRealId === record.toSchemeComboRealId) {
            this.$message.error('本端节点与对端节点重复，检查后重试');
            return false;
          }
          // 判断数据是否存在
          try {
            let count = 0;
            this.nsmmSchemeComboRelvanceBaseDataObject.data.forEach(function (item, index) {
              // if (index !== 0) {
              if ((record.fromSchemeComboRealId === item.fromSchemeComboRealId && record.toSchemeComboRealId === item.toSchemeComboRealId) || (record.fromSchemeComboRealId === item.toSchemeComboRealId && record.toSchemeComboRealId === item.fromSchemeComboRealId)) {
                count++;
              }
              // }
            })
            if (count > 1) {
              // eslint-disable-next-line no-throw-literal
              throw ('数据已存在，检查后重试');
            }
          } catch (e) {
            this.$message.error(e)
            return false;
          }
          if (editType === 'update') {
            Promise.all([
              this.$refs['relevanceNumForm' + record.schemeBaseId].validate()
            ]).then(res => {
              if (record.relevanceType === '0') {
                record.relevanceNum = '';
              }
              _this.updateNsmmSchemeComboRealRelevance(record);
            }).catch(error => {
              _this.$message.error('请完善需要修改的信息，检查后重试');
            });
          } else {
            Promise.all([
              this.$refs['relevanceNumForm' + record.schemeBaseId].validate()
            ]).then(res => {
              _this.insertNsmmSchemeComboRelevance(record);
            }).catch(error => {
              _this.$message.error('请完善需要新增的信息，检查后重试');
            });
          }
        }
      },
      // 只允许每个表仅一行新增的数据
      // 按表返回新增行的数量
      countAddRow(tableName) {
        let returnCount = 0;
        if (tableName === 'schemeComboRelvanceBase') {
          if (this.nsmmSchemeComboRelvanceBaseDataObject.data && this.nsmmSchemeComboRelvanceBaseDataObject.data.length > 0) {
            this.nsmmSchemeComboRelvanceBaseDataObject.data.map(item => {
              if (!item.schemeComboRealRelevanceId || item.schemeComboRealRelevanceId === '') {
                returnCount = returnCount + 1;
              }
            });
          } else {
            returnCount = 0;
          }
        }
        return returnCount;
      },
      insertNsmmSchemeComboRelevance(record) {
        let _this = this;
        this.$api.scheme.insertNsmmSchemeComboRealRelevance(record)
          .then(res => {
            record.fromComboId = res.data.fromComboId.toString();
            record.fromModelId = res.data.fromModelId.toString();
            record.fromSchemeComboBaseId = res.data.fromSchemeComboBaseId.toString();
            record.fromSchemeComboRealId = res.data.fromSchemeComboRealId.toString();
            record.schemeComboRealRelevanceId = res.data.schemeComboRealRelevanceId.toString();
            record.toComboId = res.data.toComboId.toString();
            record.toModelId = res.data.toModelId.toString();
            record.toSchemeComboBaseId = res.data.toSchemeComboBaseId.toString();
            record.toSchemeComboRealId = res.data.toSchemeComboRealId.toString();
            record.isEdit = false;
            _this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = false;
            _this.rulesObject.nsmmSchemeComboRelevance.relevanceNum[0].required = false;
          });
      },
      updateNsmmSchemeComboRealRelevance(record) {
        let _this = this;
        this.$api.scheme.updateNsmmSchemeComboRealRelevance(record).then(res => {
          record.modifyDate = res.data.modifyDate;
          record.isEdit = false;
          const schemeComboRealRelevanceId = record.schemeComboRealRelevanceId;
          let tempateIndex = null;
          _this.nsmmSchemeComboRelvanceBaseDataObject.editObjectList.forEach(function (item, index) {
            if (item.schemeComboRealRelevanceId === schemeComboRealRelevanceId) {
              tempateIndex = index;
            }
          });
          if (tempateIndex !== null) {
            _this.nsmmSchemeComboRelvanceBaseDataObject.editObjectList.splice(tempateIndex, 1);
          }
          _this.nsmmSchemeComboRelvanceBaseDataObject.isEdit = false;
          _this.rulesObject.nsmmSchemeComboRelevance.relevanceNum[0].required = false;
        });
      },
      // 删除套餐互联信息
      deleteRow(record, tableName) {
        let _this = this;
        if (tableName === 'schemeComboRelvanceBase') {
          if (record.schemeComboRealRelevanceId) {
            _this.$confirm({
              title: '确认删除套餐互联关系？',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                _this.$api.scheme.deleteNsmmSchemeComboRealRelevance({
                  schemeComboRealRelevanceId: record.schemeComboRealRelevanceId
                })
                  .then(res => {
                    _this.listNsmmSchemeComboRealRelevanceAll();
                  });
              }
            });
          }
        }
      },
      // 互联方式为口字型时单台节点链路数不能为空
      relevanceTypeRadio(e) {
        if (e.target.value === '1') {
          this.clearValidate();
          this.rulesObject.nsmmSchemeComboRelevance.relevanceNum[0].required = true;
        } else {
          this.clearValidate();
          this.rulesObject.nsmmSchemeComboRelevance.relevanceNum[0].required = false;
        }
      },
      // 移除表单项的校验结果
      clearValidate() {
        this.$refs['relevanceNumForm' + this.nsmmSchemeBaseId].clearValidate(['relevanceNum']);
      }
    }
  }
</script>

<style></style>
