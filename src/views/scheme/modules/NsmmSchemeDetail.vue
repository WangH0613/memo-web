<template>
  <div>
    <a-modal
      :visible="schemeVisible"
      class="fullscreen"
      :dialogClass="this.curMode"
      title="方案详细信息"
      centered
      :destroyOnClose="true"
      @cancel="handleCloseDetailDialog"
    >
      <template slot="footer">
        <a-button key="next" @click="handleCloseDetailDialog">
          取消
        </a-button>
        <a-button type="primary" @click="submitScheme" v-hasAuth>
          提交
        </a-button>
        <a-button type="primary" @click="submitSchemeItsm" v-hasAuth>
          提交ITSM审核
        </a-button>
      </template>
      <a-row>
        <a-col class="left f16" :span="12">
          <div>方案名称: {{ nsmmSchemeBaseDataObject.schemeData.schemeName }}</div>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">
          <div class="left f16">所含套餐</div>
        </a-col>
      </a-row>
      <a-divider/>
      <a-table
        class="mt24"
        ref="nsmmSchemePreviewComboBaseTable"
        size="middle"
        :columns="nsmmSchemePreviewComboBaseTable"
        :data-source.sync="nsmmSchemeBaseDataObject.comboData"
        :bordered="true"
        :rowKey='(record,index)=>{return index}'
        :pagination="false"
      >
        <template slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </template>
        <template slot="technicalSum" slot-scope="text, record, index">
          {{ record.technicalSum }}
        </template>
        <div class="action" slot="action" slot-scope="text, record, index">
          <span @click="doDetail(record, 'detail')" style="color: #2D8CF0;">
            详情
          </span>
        </div>
      </a-table>
      <a-divider/>
      <a-row>
        <a-col :span="8">
          <div class="left f16">详细互联信息</div>
        </a-col>
      </a-row>
      <a-divider/>
      <div>
        <a-button class="mb8 mr8" :type="relevanceType === '' ? 'primary' : ''" @click="getSchemeRelevanceList('')">
          显示所有
        </a-button>
        <a-button class="mb8 mr8" :type="relevanceType === 'and' ? 'primary' : ''" @click="getSchemeRelevanceList('and')">
          套餐间
        </a-button>
        <a-button class="mb8 mr8" :type="relevanceType === 'in' ? 'primary' : ''" @click="getSchemeRelevanceList('in')">
          套餐内
        </a-button>
        <a-button class="mb8 mr8" :type="relevanceType === 'out' ? 'primary' : ''" @click="getSchemeRelevanceList('out')">
          外联
        </a-button>
        <a-table
          class="mt24"
          ref="nsmmSchemePreviewComboRelevanceBaseTable"
          size="middle"
          :columns="nsmmSchemePreviewComboRelevanceBaseTable"
          :data-source.sync="nsmmSchemeBaseDataObject.comboRelevanceData"
          :bordered="true"
          :rowKey='(record,index)=>{return index}'
          :pagination.sync="nsmmSchemeBaseDataObject.page"
          @change="handleTableChangeScheme"
        >
          <template slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
        </a-table>
      </div>
    </a-modal>
    <nsmm-combo-detail
      v-if="comboDetailDialogConfig.visible"
      :visible="comboDetailDialogConfig.visible"
      @changeDetailVisible="handleCloseComboDetailDialog"
      :mode="comboDetailDialogConfig.mode"
      :nsmm-combo-base-id="comboDetailDialogConfig.nsmmComboBaseId"
      :nsmm-model-base-id="comboDetailDialogConfig.nsmmModelBaseId"
    />

    <nsmm-technical-list
      v-if="technicalListDialogConfig.visible"
      :visible="technicalListDialogConfig.visible"
      @changeListVisible="handleCloseTechnicalListDialog"
      :nsmm-combo-base-id="technicalListDialogConfig.nsmmComboBaseId"
      :nsmm-model-base-id="technicalListDialogConfig.nsmmModelBaseId"
      :nsmm-combo-base-status="technicalListDialogConfig.nsmmComboBaseStatus"
    />
  </div>
</template>

<script>
import { NsmmSchemeBase, Pagination, Search } from '@/form';
import NsmmComboDetail from '../../model/combo/modules/NsmmComboDetail';
import NsmmTechnicalList from '../../model/technical/modules/NsmmTechnicalList';

export default {
  name: 'NsmmSchemeDetail',
  components: {
    NsmmComboDetail,
    NsmmTechnicalList
  },
  props: [ 'visible', 'mode', 'nsmmSchemeBaseId' ],
  created() {
    this.initPageData();
  },
  computed: {
    schemeVisible() {
      return this.visible;
    },
    modal() {
      return this.visible;
    }
  },
  data() {
    return {
      curMode: '',
      relevanceType: '',
      // 定义方案信息数据对象
      nsmmSchemeBaseDataObject: {
        form: { ...new NsmmSchemeBase() },
        schemeData: [],
        comboData: [],
        comboRelevanceData: [],
        params: { ...new Search() },
        page: { ...new Pagination() }
      },
      // 定义列头
      nsmmSchemePreviewComboBaseTable: [
        { title: '#', scopedSlots: { customRender: 'serial' }, width: 40, align: 'center' },
        { title: '套餐名称', dataIndex: 'nsmmComboBase.comboName', width: '150px' },
        { title: '套餐数量', dataIndex: 'comboNum', width: '150px' },
        { title: '套餐状态', dataIndex: 'nsmmComboBase.comboStatusName', width: '150px' },
        { title: '套餐版本', dataIndex: 'nsmmComboBase.nsmmComboBaseVersion.version', width: '150px' },
        { title: '所属厂商', dataIndex: 'nsmmComboBase.manufacturerBaseName', width: '150px' },
        { title: '所属模型', dataIndex: 'nsmmComboBase.nsmmModelBase.modelName', width: '150px' },
        { title: '所属模型类型', dataIndex: 'nsmmComboBase.nsmmModelBase.modelTypeName', width: '150px' },
        { title: '技术属性数量', dataIndex: 'technicalSum', width: '150px', scopedSlots: { customRender: 'technicalSum' } },
        { title: '操作', align: 'center', dataIndex: 'action', width: '180px', scopedSlots: { customRender: 'action' } }
      ],
      nsmmSchemePreviewComboRelevanceBaseTable: [
        { title: '#', scopedSlots: { customRender: 'serial' }, width: 40, align: 'center' },
        { title: '本端节点', dataIndex: 'fromNodeName', width: '150px' },
        { title: '本端所属套餐', dataIndex: 'fromComboName', width: '150px' },
        { title: '本端端口', dataIndex: 'fromPortName', width: '150px' },
        { title: '对端节点', dataIndex: 'toNodeName', width: '150px' },
        { title: '对端所属套餐', dataIndex: 'toComboName', width: '150px' },
        { title: '对端端口', dataIndex: 'toPortName', width: '150px' },
        { title: '介质类型', dataIndex: 'interfaceTypeName', width: '150px' },
        { title: '互联关系', dataIndex: 'interConnectionName', width: '150px' },
        { title: '实际速率', dataIndex: 'portRateName', width: '150px' }
      ],
      comboDetailDialogConfig: {
        visible: false,
        mode: '',
        nsmmComboBaseId: '',
        nsmmModelBaseId: ''
      },
      technicalListDialogConfig: {
        visible: false,
        nsmmComboBaseId: '',
        nsmmModelBaseId: '',
        nsmmComboBaseStatus: ''
      }
    }
  },
  methods: {
    handleCloseDetailDialog() {
      this.$emit('changeDetailVisible', false);
    },
    // 页面初始化方法封装在这里
    async initPageData() {
      if (this.nsmmSchemeBaseId !== '') {
        this.curMode = this.mode;
        this.nsmmSchemeBaseDataObject.form.schemeBaseId = this.nsmmSchemeBaseId;
        this.nsmmSchemeBaseDataObject.params.schemeBaseId = this.nsmmSchemeBaseId;
        await this.$api.scheme.getNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
          .then(res => {
            this.nsmmSchemeBaseDataObject.schemeData = { ...res.data };
          })
        await this.listNsmmSchemeComboBaseAll();
        await this.getSchemeRelevanceList('');
      }
    },
    listNsmmSchemeComboBaseAll() {
      this.nsmmSchemeBaseDataObject.loading = true;
      this.$api.scheme.listNsmmSchemeComboBaseAll(this.$object.genSearch(this.nsmmSchemeBaseDataObject.params, true))
        .then(res => {
          this.nsmmSchemeBaseDataObject.comboData = res.data;
        })
    },
    getSchemeRelevanceList(relevanceType) {
      let _this = this;
      this.nsmmSchemeBaseDataObject.loading = true;
      this.relevanceType = relevanceType;
      this.nsmmSchemeBaseDataObject.params.relevanceType = relevanceType;
      this.$api.scheme.getSchemeRelevanceList(this.$object.genSearch(this.nsmmSchemeBaseDataObject.params, true))
        .then(res => {
          if (res.data !== null && res.data && res.data.length > 0) {
            _this.nsmmSchemeBaseDataObject.comboRelevanceData = res.data;
            _this.nsmmSchemeBaseDataObject.page.current = parseInt(res.page.current);
            _this.nsmmSchemeBaseDataObject.page.total = parseInt(res.page.total);
          } else {
            _this.nsmmSchemeBaseDataObject.comboRelevanceData = [];
            _this.nsmmSchemeBaseDataObject.page.current = 1;
            _this.nsmmSchemeBaseDataObject.page.total = 0;
          }
        })
    },
    handleTableChangeScheme(pagination, filters, sorter) {
      this.nsmmSchemeBaseDataObject.params.current = pagination.current;
      this.nsmmSchemeBaseDataObject.params.pageSize = pagination.pageSize;
      this.getSchemeRelevanceList();
    },
    // 查看详情
    doDetail(record, curMode) {
      this.comboDetailDialogConfig.mode = curMode;
      this.comboDetailDialogConfig.nsmmComboBaseId = record.comboBaseId.toString();
      this.comboDetailDialogConfig.nsmmModelBaseId = record.modelBaseId.toString();
      this.comboDetailDialogConfig.visible = true;
    },
    // 关闭弹窗的回调
    handleCloseComboDetailDialog(obj) {
      this.comboDetailDialogConfig.visible = obj;
      this.comboDetailDialogConfig.mode = '';
      this.comboDetailDialogConfig.nsmmComboBaseId = '';
      this.comboDetailDialogConfig.nsmmModelBaseId = '';
      this.listNsmmSchemeComboBaseAll();
    },
    // 技术属性列表页面
    handleTechnicalListDialog(record) {
      this.technicalListDialogConfig.nsmmComboBaseId = record.comboBaseId.toString();
      this.technicalListDialogConfig.nsmmModelBaseId = record.modelBaseId.toString();
      this.technicalListDialogConfig.nsmmComboBaseStatus = record.nsmmComboBase.comboStatus;
      this.technicalListDialogConfig.visible = true;
    },
    // 关闭技术属性弹窗回调
    handleCloseTechnicalListDialog(obj) {
      this.technicalListDialogConfig.visible = obj;
      this.technicalListDialogConfig.nsmmComboBaseId = '';
      this.technicalListDialogConfig.nsmmModelBaseId = '';
      this.technicalListDialogConfig.nsmmComboBaseStatus = '';
      this.listNsmmSchemeComboBaseAll();
    },
    submitScheme() {
      let _this = this;
      if (this.nsmmSchemeBaseId) {
        _this.$confirm({
          title: '当前操作不会对接ITSM审核流程，确认方案审核通过？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            _this.$api.scheme.submitSchemeBase({
              schemeBaseId: _this.nsmmSchemeBaseId,
              checkStatus: 3
            })
              .then(res => {
                _this.$message.success('方案审核通过');
                _this.handleCloseDetailDialog();
              });
          },
          onCancel() {
            _this.$message.error('取消操作');
            return false;
          }
        });
      } else {
        this.$message.error('参数错误，请重试');
        return false;
      }
    },
    // 提交审核
    submitSchemeItsm() {
      let _this = this;
      if (this.nsmmSchemeBaseId) {
        this.$confirm({
          title: '确认提交ITSM审核方案信息？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            _this.$api.itsm.commonCreateTicket({
              businessBaseId: _this.nsmmSchemeBaseId,
              businessType: 'scheme'
            })
              .then(res => {
                _this.$message.success('提交ITSM审核成功');
                _this.handleCloseDetailDialog();
              });
          },
          onCancel() {
            _this.$message.error('取消提交ITSM审核');
            return false;
          }
        });
      } else {
        this.$message.error('参数错误，请重试');
        return false;
      }
    }
  }
}
</script>

<style></style>
