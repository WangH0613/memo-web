<template>
  <div>
    <a-row>
      <a-col :span="24">
        <div class="f16">方案名称: {{ nsmmSchemeBaseDataObject.form.schemeName }}</div>
      </a-col>
    </a-row>
    <a-divider/>
    <div class="center f16">
      <a-spin :spinning="nsmmSchemeComboNodeRelvanceBaseDataObject.spinningLoading" tip="数据加载中..." >
        <a-empty v-if="nsmmSchemeComboNodeRelvanceBaseDataObject.data.length <= 0" :image="nsmmSchemeBaseDataObject.simpleImage" />
      </a-spin>
    </div>
    <template v-for="(group, key) in this.nsmmSchemeComboNodeRelvanceBaseDataObject.data">
      <a-row>
        <a-col :span="16">
          <div class="left f16">节点互联关系：{{ group.relevanceName ? group.relevanceName : '-' }}</div>
        </a-col>
        <a-col :span="8" class="right">
          <a-button
            icon="plus"
            type="primary"
            @click="insertRow(key, 'schemeNodeRelvanceBase')">
            添加节点互联关系
          </a-button>
        </a-col>
      </a-row>
      <a-divider/>
      <!--套餐数量-->
      <a-table
        class="mt24"
        ref="nsmmPlanPackageConnectionBaseTable"
        size="middle"
        :columns="nsmmSchemeComboNodeRelevanceBaseTable"
        :data-source.sync="group.groupList"
        :bordered="true"
        :rowKey='(record, index) => {return index}'
        :pagination="false"
      >
        <template slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
        <!-- 本端节点 -->
        <template
          slot="fromSchemeComboRealNodeId"
          slot-scope="text, record, index">
          <a-select
            style="width:100%"
            v-if="record.isEdit"
            v-model="record.fromSchemeComboRealNodeId"
            :placeholder="placeholderFromSchemeComboRealNodeName"
            @change="value => schemeComboRealPortSelect(value, record, 'from')"
          >
            <a-select-option
              :value="item.schemeComboRealNodeId.toString()"
              v-for="(item, index) in fromSchemeComboRealNodeSelectData"
              :key="index"
            >
              {{ item.selectName }}
            </a-select-option>
          </a-select>
          <template v-if="!record.isEdit">
            {{ record.fromNsmmModelRoleBaseName ? record.fromNsmmModelRoleBaseName + '-' + record.fromNsmmModelNodeBaseName : record.fromNsmmModelNodeBaseName }}
          </template>
        </template>
        <!-- 对端节点 -->
        <template
          slot="toSchemeComboRealNodeId"
          slot-scope="text, record, index">
          <a-select
            style="width:100%"
            v-if="record.isEdit"
            v-model="record.toSchemeComboRealNodeId"
            :placeholder="placeholderToSchemeComboRealNodeName"
            @change="value => schemeComboRealPortSelect(value, record, 'to')"
          >
            <a-select-option
              :value="item.schemeComboRealNodeId.toString()"
              v-for="(item, index) in toSchemeComboRealNodeSelectData"
              :key="index"
            >
              {{ item.selectName }}
            </a-select-option>
          </a-select>
          <template v-if="!record.isEdit">
            {{ record.toNsmmModelRoleBaseName ? record.toNsmmModelRoleBaseName + '-' + record.toNsmmModelNodeBaseName : record.toNsmmModelNodeBaseName }}
          </template>
        </template>
        <!--        本端端口-->
        <template
          slot="fromComboPortId"
          slot-scope="text, record, index">
          <a-select
            style="width:100%"
            v-if="record.isEdit"
            v-model="record.fromComboPortId"
            :placeholder="placeholderFromSchemeComboRealPortName"
            @change="(value) => {
              record.fromPortName = fromSchemeComboRealPortSelectData.filter(it =>
                value.toString() === it.portDistributeBaseId.toString())[0].portName
            }"
          >
            <a-select-option
              :value="item.portDistributeBaseId.toString()"
              v-for="(item, index) in fromSchemeComboRealPortSelectData"
              :key="index"
              :disabled="!item.isUsed"
            >
              {{ item.portName }}
            </a-select-option>
          </a-select>
          <template v-if="!record.isEdit">
            {{ record.fromPortName }}
          </template>
        </template>
        <!--        对端端口-->
        <template
          slot="toComboPortId"
          slot-scope="text, record, index">
          <a-select
            style="width:100%"
            v-if="record.isEdit"
            v-model="record.toComboPortId"
            :placeholder="placeholderToSchemeComboRealPortName"
            @change="(value) => {
              record.toPortName = toSchemeComboRealPortSelectData.filter(it =>
                value.toString() === it.portDistributeBaseId.toString())[0].portName
            }"
          >
            <a-select-option
              :value="item.portDistributeBaseId.toString()"
              v-for="(item, index) in toSchemeComboRealPortSelectData"
              :key="index"
              :disabled="!item.isUsed"
            >
              {{ item.portName }}
            </a-select-option>
          </a-select>
          <template v-if="!record.isEdit">
            {{ record.toPortName }}
          </template>
        </template>
        <template slot="interfaceTypeName" slot-scope="text, record, index">
          <template v-if="record.isEdit">
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.interfaceTypeName : record.interfaceTypeName }}
          </template>
          <template v-else>
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.interfaceTypeName : '-' }}
          </template>
        </template>
        <template slot="interConnection" slot-scope="text, record, index">
          <template v-if="record.isEdit">
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.interConnection : record.interConnection }}
          </template>
          <template v-else>
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.interConnection : '-' }}
          </template>
        </template>
        <template slot="portRate" slot-scope="text, record, index">
          <template v-if="record.isEdit">
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.portRate : record.portRate }}
          </template>
          <template v-else>
            {{ record.fromNsmmComboPortDistributeBase ? record.fromNsmmComboPortDistributeBase.portRate : '-' }}
          </template>
        </template>
        <template
          slot="action"
          slot-scope="text, record, index">
          <template v-if="record.isEdit && record.isEdit === 'add'">
            <a @click="validateRow(record,'add','schemeNodeRelvanceBase')">确认新增</a>
            <a-divider type="vertical"/>
            <a @click="cancelInsertRow(key, record,'schemeNodeRelvanceBase')">取消新增</a>
          </template>
          <template v-else-if="record.isEdit && record.isEdit === 'update'">
            <a @click="validateRow(record,'update','schemeNodeRelvanceBase')">确认修改</a>
            <a-divider type="vertical"/>
            <a @click="cancelUpdateRow(key, record,'schemeNodeRelvanceBase')">取消修改</a>
          </template>
          <template v-else>
            <a @click="updateRow(key, index, record,'schemeNodeRelvanceBase')">修改</a>
            <a-divider type="vertical"/>
            <a @click="deleteRow(record,'schemeNodeRelvanceBase')">删除</a>
          </template>
        </template>
      </a-table>
      <a-divider/>
    </template>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue';
import { NsmmSchemeBase, NsmmSchemeNodeRelevance, Search } from '@/form';

export default {
  name: 'EditNsmmSchemeComboNodeRelevance',
  components: {
    'a-empty': Empty
  },
  props: [ 'mode', 'nsmmSchemeBaseId' ],
  created() {
    this.nsmmSchemeBaseDataObject.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    this.initNsmmDict()
    this.initPageData()
  },
  computed: {
    placeholderFromSchemeComboRealNodeName() {
      return this.fromSchemeComboRealNodeSelectData && this.fromSchemeComboRealNodeSelectData.length ? '请选择' : '没有节点信息';
    },
    placeholderToSchemeComboRealNodeName() {
      return this.toSchemeComboRealNodeSelectData && this.toSchemeComboRealNodeSelectData.length ? '请选择' : '没有节点信息';
    },
    placeholderFromSchemeComboRealPortName() {
      return this.fromSchemeComboRealPortSelectData && this.fromSchemeComboRealPortSelectData.length ? '请选择' : '没有端口信息';
    },
    placeholderToSchemeComboRealPortName() {
      return this.toSchemeComboRealPortSelectData && this.toSchemeComboRealPortSelectData.length ? '请选择' : '没有端口信息';
    }
  },
  data() {
    return {
      // 定义方案信息数据对象
      nsmmSchemeBaseDataObject: {
        form: { ...new NsmmSchemeBase() },
        comboData: []
      },
      nsmmSchemeComboNodeRelvanceBaseDataObject: {
        params: { ...new Search() },
        data: [],
        // page: { ...new Pagination() },
        loading: false,
        spinningLoading: false,
        isEdit: false,
        form: { ...new NsmmSchemeNodeRelevance() },
        // 修改模式下 暂存的原始数据 用于取消编辑后的数据恢复
        editObjectList: []
      },
      // 定义列头
      nsmmSchemeComboNodeRelevanceBaseTable: [
        { title: '#', scopedSlots: { customRender: 'serial' }, width: 40, align: 'center' },
        { title: '本端所属套餐', dataIndex: 'fromComboName', width: '150px', scopedSlots: { customRender: 'fromComboName' } },
        { title: '本端节点', dataIndex: 'fromSchemeComboRealNodeId', width: '150px', scopedSlots: { customRender: 'fromSchemeComboRealNodeId' } },
        { title: '对端节点', dataIndex: 'toSchemeComboRealNodeId', width: '150px', scopedSlots: { customRender: 'toSchemeComboRealNodeId' } },
        { title: '本端端口', dataIndex: 'fromComboPortId', width: '150px', scopedSlots: { customRender: 'fromComboPortId' } },
        { title: '对端端口', dataIndex: 'toComboPortId', width: '150px', scopedSlots: { customRender: 'toComboPortId' } },
        { title: '对端所属套餐', dataIndex: 'toComboName', width: '150px', scopedSlots: { customRender: 'toComboName' } },
        { title: '介质类型', dataIndex: 'interfaceTypeName', width: '80px', scopedSlots: { customRender: 'interfaceTypeName' } },
        {
          title: '互联关系',
          dataIndex: 'interConnection',
          width: '80px',
          scopedSlots: { customRender: 'interConnection' }
        },
        { title: '实际速率', dataIndex: 'portRate', width: '80px', scopedSlots: { customRender: 'portRate' } },
        { title: '操作', align: 'center', dataIndex: 'action', width: '150px', scopedSlots: { customRender: 'action' } }
      ],
      fromSchemeComboRealNodeSelectData: [],
      toSchemeComboRealNodeSelectData: [],
      fromSchemeComboRealPortSelectData: [],
      toSchemeComboRealPortSelectData: [],
      // 定义字典对象
      nsmmDictDataObject: {
        lineRelevanceType: [],
        mediaType: [],
        relevanceType: [],
        speedUnit: []
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
        await this.listNsmmSchemeComboRealNodeRelevanceAllForGroup()
      }
    },
    async initNsmmDict() {
      await this.$api.pub.listNsmmDictRelevanceType().then(res => {
        this.nsmmDictDataObject.relevanceType = res.data;
      });
      await this.$api.pub.listNsmmDictMediaType().then(res => {
        this.nsmmDictDataObject.mediaType = res.data;
      });
      await this.$api.pub.listNsmmDictSpeedUnit().then(res => {
        this.nsmmDictDataObject.speedUnit = res.data;
      });
      await this.$api.pub.listNsmmDictLineRelevanceType().then(res => {
        this.nsmmDictDataObject.lineRelevanceType = res.data;
      });
    },
    listNsmmSchemeComboRealNodeRelevanceAllForGroup() {
      let _this = this;
      this.nsmmSchemeComboNodeRelvanceBaseDataObject.spinningLoading = true;
      this.nsmmSchemeComboNodeRelvanceBaseDataObject.params.schemeBaseId = this.nsmmSchemeBaseId;
      this.nsmmSchemeComboNodeRelvanceBaseDataObject.params.dimension = 'and';
      this.$api.scheme.listNsmmSchemeComboRealNodeRelevanceAllForGroup(this.$object.genSearch(this.nsmmSchemeComboNodeRelvanceBaseDataObject.params, false))
        .then(res => {
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.data = res.data;
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.spinningLoading = false;
        })
        .catch(error => {
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.data = [];
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.spinningLoading = false;
        })
        .finally(() => {
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.spinningLoading = false;
        });
    },
    async getSchemeComboRealNodeSelect(fromSchemeComboRealId, toSchemeComboRealId, key, index) {
      let _this = this;
      this.fromSchemeComboRealNodeSelectData = [];
      await this.$api.select.getSchemeComboRealNodeSelect({
        schemeComboRealId: fromSchemeComboRealId
      })
        .then(res => {
          _this.fromSchemeComboRealNodeSelectData = (res.data || []).map(d => {
            d.schemeComboRealRoleId = d.schemeComboRealRoleId.toString();
            d.schemeComboRealNodeId = d.schemeComboRealNodeId.toString();
            return d;
          });
          _this.schemeComboRealPortSelect('', _this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[index], '')
        })
      this.toSchemeComboRealNodeSelectData = [];
      await this.$api.select.getSchemeComboRealNodeSelect({
        schemeComboRealId: toSchemeComboRealId
      })
        .then(res => {
          _this.toSchemeComboRealNodeSelectData = (res.data || []).map(d => {
            d.schemeComboRealRoleId = d.schemeComboRealRoleId.toString();
            d.schemeComboRealNodeId = d.schemeComboRealNodeId.toString();
            return d;
          });
          _this.schemeComboRealPortSelect('', _this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[index], '')
        })
    },
    schemeComboRealPortSelect(value, record, type) {
      let _this = this;
      switch (type) {
        case 'from':
          record.fromNsmmModelNodeBaseName = this.fromSchemeComboRealNodeSelectData.filter(it =>
            value.toString() === it.schemeComboRealNodeId.toString())[0].selectName;
          record.fromComboPortId = undefined;
          record.toComboPortId = undefined;
          break;
        case 'to':
          record.toNsmmModelNodeBaseName = this.toSchemeComboRealNodeSelectData.filter(it =>
            value.toString() === it.schemeComboRealNodeId.toString())[0].selectName;
          record.fromComboPortId = undefined;
          record.toComboPortId = undefined;
          break;
        case '':
          break;
      }
      if (record.fromSchemeComboRealNodeId && record.toSchemeComboRealNodeId) {
        if (this.fromSchemeComboRealNodeSelectData && this.fromSchemeComboRealNodeSelectData.length > 0 && this.toSchemeComboRealNodeSelectData && this.toSchemeComboRealNodeSelectData.length > 0) {
          const fromSchemeComboRealNodeData = this.fromSchemeComboRealNodeSelectData.filter(it =>
            record.fromSchemeComboRealNodeId.toString() === it.schemeComboRealNodeId.toString())[0]
          const toSchemeComboRealNodeData = this.toSchemeComboRealNodeSelectData.filter(it =>
            record.toSchemeComboRealNodeId.toString() === it.schemeComboRealNodeId.toString())[0]
          // 获取本端端口
          this.fromSchemeComboRealPortSelectData = [];
          this.toSchemeComboRealPortSelectData = [];
          if (!fromSchemeComboRealNodeData) {
            this.$set(record, 'fromSchemeComboRealNodeId', undefined);
            this.$set(record, 'fromComboPortId', undefined);
            this.$set(record, 'toComboPortId', undefined);
          }
          if (!toSchemeComboRealNodeData) {
            this.$set(record, 'toSchemeComboRealNodeId', undefined);
            this.$set(record, 'fromComboPortId', undefined);
            this.$set(record, 'toComboPortId', undefined);
          }
          // 获取对端端口
          if (fromSchemeComboRealNodeData && toSchemeComboRealNodeData) {
            this.$api.select.getComboPortDistSelectCheckUsed({
              comboNodeBaseId: fromSchemeComboRealNodeData.comboNodeBaseId, // 套餐节点id
              perrNodeRole: toSchemeComboRealNodeData.roleName, // 对端角色名
              perrNodeNum: toSchemeComboRealNodeData.nodeName, // 对端节点名
              schemeComboRealNodeId: record.fromSchemeComboRealNodeId,
              // toSchemeComboRealNodeId: record.toSchemeComboRealNodeId
            })
              .then(res => {
                _this.fromSchemeComboRealPortSelectData = res.data;
              })
            this.$api.select.getComboPortDistSelectCheckUsed({
              comboNodeBaseId: toSchemeComboRealNodeData.comboNodeBaseId, // 套餐节点id
              perrNodeRole: fromSchemeComboRealNodeData.roleName, // 对端角色名
              perrNodeNum: fromSchemeComboRealNodeData.nodeName, // 对端节点名
              // fromSchemeComboRealNodeId: record.fromSchemeComboRealNodeId,
              schemeComboRealNodeId: record.toSchemeComboRealNodeId
            })
              .then(res => {
                _this.toSchemeComboRealPortSelectData = res.data;
              })
          }
        }
      }
    },
    // 向表中添加一行
    insertRow(key, tableName) {
      if (tableName === 'schemeNodeRelvanceBase') {
        if (!this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList || this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList.length === 0) {
          this.$message.error('当前方案下未配置套餐互联信息，请返回上一步配置套餐互联信息');
          return false;
        }
        if (this.countAddRow(key, 'schemeNodeRelvanceBase') >= 1) {
          this.$message.error('新建节点互联信息未保存，请完成后再新建节点互联信息');
          return false;
        }
        const nsmmSchemeNodeRelevance = { ...new NsmmSchemeNodeRelevance() };
        nsmmSchemeNodeRelevance.isEdit = 'add';
        // 为新增的互联关系 配置默认选中值
        nsmmSchemeNodeRelevance.fromComboBaseId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromComboBaseId.toString();
        nsmmSchemeNodeRelevance.fromComboName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromComboName;
        nsmmSchemeNodeRelevance.fromSchemeComboRealNodeId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromSchemeComboRealNodeId.toString();
        nsmmSchemeNodeRelevance.fromNsmmModelNodeBaseName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmModelNodeBaseName;
        nsmmSchemeNodeRelevance.fromComboPortId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromComboPortId.toString();
        nsmmSchemeNodeRelevance.fromPortName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromPortName;
        nsmmSchemeNodeRelevance.toComboBaseId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toComboBaseId.toString();
        nsmmSchemeNodeRelevance.toComboName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toComboName;
        nsmmSchemeNodeRelevance.toNsmmModelNodeBaseName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toNsmmModelNodeBaseName;
        nsmmSchemeNodeRelevance.toSchemeComboRealNodeId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toSchemeComboRealNodeId.toString();
        nsmmSchemeNodeRelevance.toPortName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toPortName;
        nsmmSchemeNodeRelevance.toComboPortId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toComboPortId.toString();
        nsmmSchemeNodeRelevance.interfaceType = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmComboPortDistributeBase.interfaceType;
        nsmmSchemeNodeRelevance.interfaceTypeName = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmComboPortDistributeBase.interfaceTypeName;
        nsmmSchemeNodeRelevance.perrNodeRole = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmComboPortDistributeBase.perrNodeRole;
        nsmmSchemeNodeRelevance.interConnection = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmComboPortDistributeBase.interConnection;
        nsmmSchemeNodeRelevance.portRate = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromNsmmComboPortDistributeBase.portRate;
        nsmmSchemeNodeRelevance.fromSchemeComboRealId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].fromSchemeComboRealId;
        nsmmSchemeNodeRelevance.toSchemeComboRealId = this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList[0].toSchemeComboRealId;
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = true;
        this.getSchemeComboRealNodeSelect(nsmmSchemeNodeRelevance.fromSchemeComboRealId, nsmmSchemeNodeRelevance.toSchemeComboRealId, key, 0);
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList.unshift(nsmmSchemeNodeRelevance);
      }
    },
    // 进行修改 改变行状态
    updateRow(key, index, record, tableName) {
      if (tableName === 'schemeNodeRelvanceBase') {
        if (this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit) {
          this.$message.error('节点互联信息未保存，请保存后再配置节点互联信息');
        } else {
          this.$set(record, 'isEdit', 'update');
          this.$set(record, 'fromSchemeComboRealId', record.fromSchemeComboRealId.toString());
          this.$set(record, 'toSchemeComboRealId', record.toSchemeComboRealId.toString());
          this.$set(record, 'fromSchemeComboRealNodeId', record.fromSchemeComboRealNodeId.toString());
          this.$set(record, 'toSchemeComboRealNodeId', record.toSchemeComboRealNodeId.toString());
          this.$set(record, 'fromComboPortId', record.fromComboPortId.toString());
          this.$set(record, 'toComboPortId', record.toComboPortId.toString());
          // 将等待修改的数据存入暂存区
          this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = true;
          this.nsmmSchemeComboNodeRelvanceBaseDataObject.editObjectList.push({ ...record });
          this.getSchemeComboRealNodeSelect(record.fromSchemeComboRealId, record.toSchemeComboRealId, key, index, 'form');
        }
      }
    },
    // 取消新增的行
    cancelInsertRow(key, record, tableName) {
      if (tableName === 'schemeNodeRelvanceBase') {
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = false;
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList.shift();
      }
    },
    // 取消行的修改状态
    cancelUpdateRow(key, record, tableName) {
      if (tableName === 'schemeNodeRelvanceBase') {
        const schemeComboRealNodeRelevanceId = record.schemeComboRealNodeRelevanceId;
        let tempateIndex = null;
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.editObjectList.forEach(function (item, index) {
          if (item.schemeComboRealNodeRelevanceId === schemeComboRealNodeRelevanceId) {
            tempateIndex = index;
            Object.keys(record).forEach(function (item_s) {
              record[item_s] = item[item_s];
            });
            record.isEdit = false;
          }
        });
        if (tempateIndex !== null) {
          this.nsmmSchemeComboNodeRelvanceBaseDataObject.editObjectList.splice(tempateIndex, 1);
        }
        this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = false;
      }
    },
    validateRow(record, editType, tableName) {
      let _this = this;
      if (tableName === 'schemeNodeRelvanceBase') {
        try {
          if (!record.fromSchemeComboRealNodeId || !record.fromComboPortId || !record.toSchemeComboRealNodeId || !record.toComboPortId) {
            // eslint-disable-next-line no-throw-literal
            throw (editType === 'update' ? '请完善需要修改的信息，检查后重试' : '请完善需要新增的信息，检查后重试');
          }
          if (record.fromSchemeComboRealNodeId === record.toSchemeComboRealNodeId && record.fromComboPortId === record.toComboPortId) {
            // eslint-disable-next-line no-throw-literal
            throw ('本端节点、本端端口与对端节点、对端端口重复，检查后重试');
          }
          if (editType === 'update') {
            _this.updateNsmmSchemeComboRealNodeRelevance(record);
          } else {
            _this.insertNsmmSchemeComboRealNodeRelevance(record);
          }
        } catch (e) {
          this.$message.error(e)
          return false;
        }
      }
    },
    // 只允许每个表仅一行新增的数据
    // 按表返回新增行的数量
    countAddRow(key, tableName) {
      let returnCount = 0;
      if (tableName === 'schemeNodeRelvanceBase') {
        if (this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList && this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList.length > 0) {
          this.nsmmSchemeComboNodeRelvanceBaseDataObject.data[key].groupList.map(item => {
            if (!item.schemeComboRealNodeRelevanceId || item.schemeComboRealNodeRelevanceId === '') {
              returnCount = returnCount + 1;
            }
          });
        } else {
          returnCount = 0;
        }
      }
      return returnCount;
    },
    insertNsmmSchemeComboRealNodeRelevance(record) {
      let _this = this;
      this.$api.scheme.insertNsmmSchemeComboRealNodeRelevance(record)
        .then(res => {
          record.schemeComboRealNodeRelevanceId = res.data.schemeComboRealNodeRelevanceId.toString();
          record.fromNsmmComboPortDistributeBase = res.data.fromNsmmComboPortDistributeBase;
          record.isEdit = false;
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = false;
        });
    },
    updateNsmmSchemeComboRealNodeRelevance(record) {
      let _this = this;
      this.$api.scheme.updateNsmmSchemeComboRealNodeRelevance({
        schemeComboRealNodeRelevanceId: record.schemeComboRealNodeRelevanceId,
        fromSchemeComboRealNodeId: record.fromSchemeComboRealNodeId,
        fromComboPortId: record.fromComboPortId,
        toSchemeComboRealNodeId: record.toSchemeComboRealNodeId,
        toComboPortId: record.toComboPortId
      })
        .then(res => {
          record.isEdit = false;
          _this.nsmmSchemeComboNodeRelvanceBaseDataObject.isEdit = false;
        });
    },
    deleteRow(record, tableName) {
      let _this = this;
      if (tableName === 'schemeNodeRelvanceBase') {
        if (record.schemeComboRealNodeRelevanceId) {
          _this.$confirm({
            title: '确认删除节点互联关系？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.scheme.deleteNsmmSchemeComboRealNodeRelevance({
                schemeComboRealNodeRelevanceId: record.schemeComboRealNodeRelevanceId
              })
                .then(res => {
                  _this.listNsmmSchemeComboRealNodeRelevanceAllForGroup();
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
