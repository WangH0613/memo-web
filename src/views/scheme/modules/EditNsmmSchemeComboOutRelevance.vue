<template>
  <div>
    <a-row>
      <a-col :span="24">
        <div class="f16">方案名称: {{ nsmmSchemeBaseDataObject.form.schemeName }}</div>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col :span="8">
        <div class="left f16">边界互联</div>
      </a-col>
      <a-col :span="16" class="right">
        <a-button
          icon="plus"
          type="primary"
          @click="insertRow('schemeComboOutRelvanceBase')">
          添加边界互联关系
        </a-button>
      </a-col>
    </a-row>
    <a-divider/>
    <!--    套餐数量-->
    <a-table
      class="mt24"
      size="middle"
      ref="nsmmSchemeComboOutRelevanceBaseTable"
      :columns="nsmmSchemeComboOutRelevanceBaseTable"
      :data-source.sync="nsmmSchemeComboOutRelvanceBaseDataObject.data"
      :loading="nsmmSchemeComboOutRelvanceBaseDataObject.loading"
      :bordered="true"
      :rowKey='(record,index)=>{return index}'
      :pagination="false"
    >
      <template slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template
        slot="fromComboBaseRealId"
        slot-scope="text, record, index">
        <a-select
          style="width:100%"
          v-if="record.isEdit"
          v-model="record.fromComboBaseRealId"
          placeholder="请选择本端套餐"
          @change="value => schemeComboRealSelect(value, record, 'edit')"
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
          {{ record.schemeComboRealName }}
        </template>
      </template>
      <template
        slot="fromComboBaseRealNodeId"
        slot-scope="text, record, index">
        <a-select
          style="width:100%"
          v-if="record.isEdit"
          v-model="record.fromComboBaseRealNodeId"
          :placeholder="placeholderComboNodeName"
          @change="value => schemeComboRealNodeSelect(value, record, 'edit')"
        >
          <a-select-option
            :value="item.schemeComboRealNodeId.toString()"
            v-for="(item, index) in nsmmSchemeBaseDataObject.nodeData"
            :key="index"
          >
            {{ item.selectName }}
          </a-select-option>
        </a-select>
        <template v-if="!record.isEdit">
          {{ record.modelRoleName + '-' + record.modelNodeName }}
        </template>
      </template>
      <template
        slot="fromComboBaseRoleId"
        slot-scope="text, record, index">
        <a-cascader
          v-if="record.isEdit"
          :options="nsmmSchemeBaseDataObject.roleData"
          v-model="nsmmSchemeComboOutRelvanceBaseDataObject.fromComboBaseRealIds"
          :placeholder="placeholderComboRoleName"
          @change="value => schemeComboRealPortSelect(value, record, 'edit')"
        />
        <template v-if="!record.isEdit">
          {{ record.outRoleName }} {{ record.outRoleName && record.outNodeName ? '-' : '' }} {{ record.outNodeName }}
        </template>
      </template>
      <template
        slot="outPortId"
        slot-scope="text, record, index">
        <a-select
          style="width:100%"
          v-if="record.isEdit"
          v-model="record.outPortId"
          :placeholder="placeholderComboPortName"
          @change="(value) => {
            record.outPortName = nsmmSchemeBaseDataObject.portData.filter(it =>
              value.toString() === it.portDistributeBaseId.toString())[0].portName
            record.interfaceTypeName = nsmmSchemeBaseDataObject.portData.filter(it =>
              value.toString() === it.portDistributeBaseId.toString())[0].interfaceType
            record.interConnection = nsmmSchemeBaseDataObject.portData.filter(it =>
              value.toString() === it.portDistributeBaseId.toString())[0].interConnection
            record.portRate = nsmmSchemeBaseDataObject.portData.filter(it =>
              value.toString() === it.portDistributeBaseId.toString())[0].portRate
          }"
        >
          <a-select-option
            :value="item.portDistributeBaseId.toString()"
            v-for="(item, index) in nsmmSchemeBaseDataObject.portData"
            :key="index"
            :disabled="!item.isUsed"
          >
            {{ item.portName }}
          </a-select-option>
        </a-select>
        <template v-if="!record.isEdit">
          {{ record.outPortName }}
        </template>
      </template>
      <template slot="interfaceTypeName" slot-scope="text, record, index">
        <template v-if="record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.interfaceTypeName : record.interfaceTypeName }}
        </template>
        <template v-if="!record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.interfaceTypeName : '-' }}
        </template>
      </template>
      <template slot="interConnection" slot-scope="text, record, index">
        <template v-if="record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.interConnection : record.interConnection }}
        </template>
        <template v-if="!record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.interConnection : '-' }}
        </template>
      </template>
      <template slot="portRate" slot-scope="text, record, index">
        <template v-if="record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.portRate : record.portRate }}
        </template>
        <template v-if="!record.isEdit">
          {{ record.nsmmComboPortDistributeBase ? record.nsmmComboPortDistributeBase.portRate : '-' }}
        </template>
      </template>
      <template
        slot="action"
        slot-scope="text, record, index">
        <template v-if="record.isEdit && record.isEdit === 'add'">
          <a @click="validateRow(record,'add', 'schemeComboOutRelvanceBase')">确认新增</a>
          <a-divider type="vertical"/>
          <a @click="cancelInsertRow(record, 'schemeComboOutRelvanceBase')">取消新增</a>
        </template>
        <template v-else-if="record.isEdit && record.isEdit === 'update'">
          <a @click="validateRow(record, 'update', 'schemeComboOutRelvanceBase')">确认修改</a>
          <a-divider type="vertical"/>
          <a @click="cancelUpdateRow(record, 'schemeComboOutRelvanceBase')">取消修改</a>
        </template>
        <template v-else>
          <a @click="updateRow(record, 'schemeComboOutRelvanceBase')">修改</a>
          <a-divider type="vertical"/>
          <a @click="deleteRow(record, 'schemeComboOutRelvanceBase')">删除</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { NsmmSchemeBase, NsmmSchemeComboOutRelevance, Search } from '@/form'

  export default {
    name: 'EditNsmmSchemeComboOutRelevance',
    props: [ 'mode', 'nsmmSchemeBaseId' ],
    created() {
      this.initPageData()
    },
    computed: {
      placeholderComboNodeName() {
        return this.nsmmSchemeBaseDataObject.nodeData && this.nsmmSchemeBaseDataObject.nodeData.length ? '请选择本端节点' : '没有节点信息';
      },
      placeholderComboRoleName() {
        return this.nsmmSchemeBaseDataObject.roleData && this.nsmmSchemeBaseDataObject.roleData.length ? '请选择外联节点角色' : '没有外联信息';
      },
      placeholderComboPortName() {
        return this.nsmmSchemeBaseDataObject.portData && this.nsmmSchemeBaseDataObject.portData.length ? '请选择端口' : '没有端口信息';
      }
    },
    data() {
      return {
        // 定义方案信息数据对象
        nsmmSchemeBaseDataObject: {
          form: { ...new NsmmSchemeBase() },
          comboData: [],
          nodeData: [],
          roleData: [],
          portData: []
        },
        nsmmSchemeComboOutRelvanceBaseDataObject: {
          params: { ...new Search() },
          data: [],
          // page: { ...new Pagination() },
          loading: false,
          isEdit: false,
          form: { ...new NsmmSchemeComboOutRelevance() },
          // 修改模式下 暂存的原始数据 用于取消编辑后的数据恢复
          editObjectList: [],
          fromComboBaseRealIds: []
        },
        // 定义列头
        nsmmSchemeComboOutRelevanceBaseTable: [
          { title: '#', scopedSlots: { customRender: 'serial' }, width: 40, align: 'center' },
          { title: '本端套餐', dataIndex: 'fromComboBaseRealId', width: '150px', scopedSlots: { customRender: 'fromComboBaseRealId' } },
          { title: '本端节点', dataIndex: 'fromComboBaseRealNodeId', width: '150px', scopedSlots: { customRender: 'fromComboBaseRealNodeId' } },
          { title: '外联节点角色', dataIndex: 'fromComboBaseRoleId', width: '150px', scopedSlots: { customRender: 'fromComboBaseRoleId' } },
          { title: '端口', dataIndex: 'outPortId', width: '150px', scopedSlots: { customRender: 'outPortId' } },
          { title: '介质类型', dataIndex: 'interfaceTypeName', width: '80px', scopedSlots: { customRender: 'interfaceTypeName' } },
          { title: '互联关系', dataIndex: 'interConnection', width: '80px', scopedSlots: { customRender: 'interConnection' } },
          { title: '实际速率', dataIndex: 'portRate', width: '80px', scopedSlots: { customRender: 'portRate' } },
          { title: '操作', align: 'center', dataIndex: 'action', width: '180px', scopedSlots: { customRender: 'action' } }
        ]
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
          await this.listNsmmSchemeComboOutRelevanceAll();
        }
      },
      listNsmmSchemeComboOutRelevanceAll() {
        let _this = this;
        this.nsmmSchemeComboOutRelvanceBaseDataObject.loading = true;
        this.nsmmSchemeComboOutRelvanceBaseDataObject.params.schemeBaseId = this.nsmmSchemeBaseId;
        this.$api.scheme.listNsmmSchemeComboOutRelevanceAll(this.$object.genSearch(this.nsmmSchemeComboOutRelvanceBaseDataObject.params, false))
          .then(res => {
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.data = (res.data || []).map(d => {
              d.outPortId = d.outPortId.toString();
              return d;
            });
          })
          .catch(error => {
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.data = [];
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.loading = false;
          })
          .finally(() => {
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.loading = false;
          });
      },
      // 根据套餐ID获取节点数据
      schemeComboRealSelect(schemeComboRealId, record, type) {
        if (record.isEdit === 'add') {
          record.fromComboBaseRealName = this.nsmmSchemeBaseDataObject.comboData.filter(it =>
            schemeComboRealId.toString() === it.schemeComboRealId.toString())[0].selectName;
        }
        if (type === 'edit') {
          // record.comboNodeBaseId = undefined;
          record.fromComboBaseRealNodeId = undefined;
          record.outPortId = undefined;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.fromComboBaseRealIds = undefined;
          this.nsmmSchemeBaseDataObject.roleData = [];
          this.nsmmSchemeBaseDataObject.portData = [];
        }
        this.$api.select.getSchemeComboRealNodeSelect({
          schemeComboRealId: schemeComboRealId
        })
          .then(res => {
            this.nsmmSchemeBaseDataObject.nodeData = (res.data || []).map(d => {
              d.comboNodeBaseId = d.comboNodeBaseId.toString();
              return d;
            })
          })
      },
      // 根据节点ID获取角色数据
      schemeComboRealNodeSelect(value, record, type) {
        if (record.isEdit === 'add') {
          record.comboNodeBaseId = this.nsmmSchemeBaseDataObject.nodeData.filter(it =>
            value.toString() === it.schemeComboRealNodeId.toString())[0].comboNodeBaseId;
          record.nodeName = this.nsmmSchemeBaseDataObject.nodeData.filter(it =>
            value.toString() === it.schemeComboRealNodeId.toString())[0].selectName;
        } else if (record.isEdit === 'update') {
          let tmpobj = [];
          if (record.outRoleName) {
            tmpobj.push(record.outRoleName);
          }
          if (record.outNodeName) {
            tmpobj.push(record.outNodeName);
          }
          this.nsmmSchemeComboOutRelvanceBaseDataObject.fromComboBaseRealIds = tmpobj;
        }
        if (type === 'edit') {
          record.outPortId = undefined;
          record.nodeName = this.nsmmSchemeBaseDataObject.nodeData.filter(it =>
            value.toString() === it.schemeComboRealNodeId.toString())[0].selectName;
          // {{ record.modelRoleName }} - {{ record.modelNodeName }}
          this.nsmmSchemeComboOutRelvanceBaseDataObject.fromComboBaseRealIds = undefined;
          this.nsmmSchemeBaseDataObject.roleData = [];
          this.nsmmSchemeBaseDataObject.portData = [];
        }
        this.$api.select.getComboPortDistRoleNodeNameSelect({
          comboNodeBaseId: record.comboNodeBaseId
        })
          .then(res => {
            this.nsmmSchemeBaseDataObject.roleData = res.data;
          })
      },
      // 获取端口数据
      schemeComboRealPortSelect(value, record, type) {
        let _this = this;
        let perrNodeRole = '';
        let perrNodeNum = '';
        if (record.isEdit === 'add') {
          record.outPortId = undefined;
          if (value.length === 1) {
            perrNodeRole = value[0];
            record.outRoleName = value[0];
          } else if (value.length === 2) {
            perrNodeRole = value[0];
            perrNodeNum = value[1];
            record.outRoleName = value[0];
            record.outNodeName = value[1];
          }
        } else if (record.isEdit === 'update') {
          perrNodeRole = record.outRoleName;
          perrNodeNum = record.outNodeName;
          if (value.length === 1) {
            perrNodeRole = value[0];
            record.outRoleName = value[0];
          } else if (value.length === 2) {
            perrNodeRole = value[0];
            perrNodeNum = value[1];
            record.outRoleName = value[0];
            record.outNodeName = value[1];
          }
        }
        if (type === 'edit') {
          record.outPortId = undefined;
        }
        this.$api.select.getComboPortDistSelectCheckUsed({
          comboNodeBaseId: record.comboNodeBaseId,
          perrNodeRole: perrNodeRole,
          perrNodeNum: perrNodeNum,
          schemeComboRealNodeId: record.fromComboBaseRealNodeId
        })
          .then(res => {
            _this.nsmmSchemeBaseDataObject.portData = (res.data || []).map(d => {
              d.portDistributeBaseId = d.portDistributeBaseId.toString();
              return d;
            })
          })
      },
      // 向表中添加一行
      insertRow(tableName) {
        if (tableName === 'schemeComboOutRelvanceBase') {
          if (!this.nsmmSchemeBaseDataObject.comboData || this.nsmmSchemeBaseDataObject.comboData.length === 0) {
            this.$message.error('当前模型下未配置节点信息，请返回上一步配置节点信息');
            return false;
          }
          if (this.countAddRow('schemeComboRelvanceBase') >= 1) {
            this.$message.error('新建节点互联关系信息未保存，请完成后再新建节点互联关系');
            return false;
          }
          const nsmmSchemeComboOutRelevance = { ...new NsmmSchemeComboOutRelevance() };
          nsmmSchemeComboOutRelevance.isEdit = 'add';
          nsmmSchemeComboOutRelevance.schemeBaseId = this.nsmmSchemeBaseId;
          // 为新增的外联信息 配置默认选中值
          nsmmSchemeComboOutRelevance.fromComboBaseRealId = undefined;
          nsmmSchemeComboOutRelevance.fromComboBaseRealNodeId = undefined;
          nsmmSchemeComboOutRelevance.fromComboBaseRoleId = undefined;
          nsmmSchemeComboOutRelevance.comboNodeBaseId = undefined;
          nsmmSchemeComboOutRelevance.outPortId = undefined;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = true;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.fromComboBaseRealIds = undefined;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.data.unshift(nsmmSchemeComboOutRelevance);
        }
      },
      // 进行修改 改变行状态
      updateRow(record, tableName) {
        if (tableName === 'schemeComboOutRelvanceBase') {
          if (this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit) {
            this.$message.error('边界互联信息未保存，请保存后再配置边界互联信息');
          } else {
            this.$set(record, 'isEdit', 'update');
            this.$set(record, 'comboNodeBaseId', record.comboNodeBaseId.toString());
            this.$set(record, 'fromComboBaseRealId', record.fromComboBaseRealId.toString());
            this.$set(record, 'fromComboBaseRealNodeId', record.fromComboBaseRealNodeId.toString());
            this.$set(record, 'outPortId', record.outPortId.toString());
            this.schemeComboRealSelect(record.fromComboBaseRealId, record, 'update');
            this.schemeComboRealNodeSelect(record.fromComboBaseRealNodeId, record, 'update');
            this.schemeComboRealPortSelect('', record, 'update');
            // 将等待修改的数据存入暂存区
            this.nsmmSchemeComboOutRelvanceBaseDataObject.editObjectList.push({ ...record });
            this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = true;
          }
        }
      },
      // 取消新增的行
      cancelInsertRow(record, tableName) {
        if (tableName === 'schemeComboOutRelvanceBase') {
          this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = false;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.data.shift();
        }
      },
      // 取消修行的修改状态
      cancelUpdateRow(record, tableName) {
        let _this = this;
        if (tableName === 'schemeComboOutRelvanceBase') {
          const schemeComboOutRelevanceId = record.schemeComboOutRelevanceId;
          let tempateIndex = null;
          this.nsmmSchemeComboOutRelvanceBaseDataObject.editObjectList.forEach(function (item, index) {
            if (item.schemeComboOutRelevanceId === schemeComboOutRelevanceId) {
              tempateIndex = index;
              Object.keys(record).forEach(function (item_s) {
                record[item_s] = item[item_s];
              });
              record.isEdit = false;
            }
          });
          if (tempateIndex !== null) {
            this.nsmmSchemeComboOutRelvanceBaseDataObject.editObjectList.splice(tempateIndex, 1);
          }
          this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = false;
        }
      },
      validateRow(record, editType, tableName) {
        let _this = this;
        if (tableName === 'schemeComboOutRelvanceBase') {
          try {
            if (!record.fromComboBaseRealId || !record.fromComboBaseRealNodeId || !record.outRoleName || !record.outPortId) {
              // eslint-disable-next-line no-throw-literal
              throw (editType === 'update' ? '请完善需要修改的信息，检查后重试' : '请完善需要新增的信息，检查后重试');
            }
            let count = 0;
            // 判断数据是否存在
            this.nsmmSchemeComboOutRelvanceBaseDataObject.data.forEach(function (item, index) {
              if (record.fromComboBaseRealId.toString() === item.fromComboBaseRealId.toString() && record.fromComboBaseRealNodeId.toString() === item.fromComboBaseRealNodeId.toString() && record.outPortId.toString() === item.outPortId.toString() && record.outRoleName === item.outRoleName && record.outNodeName === item.outNodeName) {
                count++;
              }
            })
            if (count > 1) {
              // eslint-disable-next-line no-throw-literal
              throw ('数据已存在，检查后重试');
            }
            if (editType === 'update') {
              if (!record.schemeComboOutRelevanceId) {
                // eslint-disable-next-line no-throw-literal
                throw ('参数错误，检查后重试');
              }
              _this.updateNsmmSchemeComboOutRelevance(record);
            } else {
              _this.insertNsmmSchemeComboOutRelevance(record);
            }
          } catch (e) {
            this.$message.error(e)
            return false;
          }
        }
      },
      // 只允许每个表仅一行新增的数据
      // 按表返回新增行的数量
      countAddRow(tableName) {
        let returnCount = 0;
        if (tableName === 'schemeComboOutRelvanceBase') {
          if (this.nsmmSchemeComboOutRelvanceBaseDataObject.data && this.nsmmSchemeComboOutRelvanceBaseDataObject.data.length > 0) {
            this.nsmmSchemeComboOutRelvanceBaseDataObject.data.map(item => {
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
      insertNsmmSchemeComboOutRelevance(record) {
        let _this = this;
        this.$api.scheme.insertNsmmSchemeComboOutRelevance(record)
          .then(res => {
            _this.$set(record, 'isEdit', false);
            _this.$set(record, 'schemeComboOutRelevanceId', res.data.schemeComboOutRelevanceId);
            _this.$set(record, 'schemeComboRealName', res.data.schemeComboRealName);
            _this.$set(record, 'modelRoleName', res.data.modelRoleName);
            _this.$set(record, 'modelNodeName', res.data.modelNodeName);
            _this.$set(record, 'nsmmComboPortDistributeBase', res.data.nsmmComboPortDistributeBase);
            // record.isEdit = false;
            // record.schemeComboOutRelevanceId = res.data.schemeComboOutRelevanceId;
            // record.schemeComboRealName = res.data.schemeComboRealName;
            // record.modelRoleName = res.data.modelRoleName;
            // record.modelNodeName = res.data.modelNodeName;
            // record.nsmmComboPortDistributeBase = res.data.nsmmComboPortDistributeBase;
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = false;
          });
      },
      updateNsmmSchemeComboOutRelevance(record) {
        let _this = this;
        this.$api.scheme.updateNsmmSchemeComboOutRelevance({
          schemeComboOutRelevanceId: record.schemeComboOutRelevanceId,
          fromComboBaseRealNodeId: record.fromComboBaseRealNodeId,
          outRoleName: record.outRoleName,
          outNodeName: record.outNodeName,
          outPortId: record.outPortId
        })
          .then(res => {
            // record.isEdit = false;
            _this.$set(record, 'isEdit', false);
            _this.$set(record, 'schemeComboOutRelevanceId', res.data.schemeComboOutRelevanceId);
            _this.$set(record, 'schemeComboRealName', res.data.schemeComboRealName);
            _this.$set(record, 'modelRoleName', res.data.modelRoleName);
            _this.$set(record, 'modelNodeName', res.data.modelNodeName);
            _this.$set(record, 'nsmmComboPortDistributeBase', res.data.nsmmComboPortDistributeBase);
            _this.nsmmSchemeComboOutRelvanceBaseDataObject.isEdit = false;
          });
      },
      deleteRow(record, tableName) {
        let _this = this;
        if (tableName === 'schemeComboOutRelvanceBase') {
          if (record.schemeComboOutRelevanceId) {
            _this.$confirm({
              title: '确认删除边界互联？',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                _this.$api.scheme.deleteNsmmSchemeComboOutRelevance({
                  schemeComboOutRelevanceId: record.schemeComboOutRelevanceId
                })
                  .then(res => {
                    _this.listNsmmSchemeComboOutRelevanceAll();
                  });
              }
            });
          }
        }
      }
    }
  }
</script>

<style></style>
