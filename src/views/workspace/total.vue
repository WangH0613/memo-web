<template>
  <div class="table-page-search-wrapper">
    <div class="workspace-total-count">
      <div class="left f16">模型数据</div>
      <a-divider/>
      <a-row type="flex" class="mt24" justify="space-around">
        <a-col v-for="(record, key) of countData.records" :key="key" :span="record.span">
          <div class="workspace-total-count-number">{{ record.count ? record.count : 0 }}</div>
          <div class="workspace-total-count-name mt16 f14">{{ record.name ? record.name : '-' }}</div>
        </a-col>
      </a-row>
      <a-divider/>
    </div>
    <div class="workspace-total-count">
      <a-row>
        <a-col :span="8">
          <div class="left f16 index-title">待审核模型列表</div>
        </a-col>
        <a-col :span="16" class="right">
          <a-input-search
            v-model="modelDataObject.params.keywords"
            placeholder="请输入模型名称"
            enter-button="搜索"
            class="w300"
            size="default"
            @search="getModelBaseList()"
          />
        </a-col>
      </a-row>
      <a-divider/>
      <a-table
        size="middle"
        :columns="columnsMoudle"
        :data-source="modelDataObject.data"
        :loading="modelDataObject.loading"
        :pagination.sync="modelDataObject.page"
        :rowKey='record=>record.id'
        @change="handleTableChangeMoudle"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <template slot="modelName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.modelName && record.modelName !== null ? record.modelName : '-' }}
            </template>
            {{ record.modelName && record.modelName !== null ? record.modelName : '-' }}
          </a-tooltip>
        </template>

        <template slot="modelTypeName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{
                nsmmDictDataObject.modelType.filter(it =>
                  record.modelType.toString()=== it.enumCode.toString())[0].enumValue
              }}
            </template>
            {{
              nsmmDictDataObject.modelType.filter(it =>
                record.modelType.toString()=== it.enumCode.toString())[0].enumValue
            }}
          </a-tooltip>
        </template>

        <span
          slot="action"
          slot-scope="text, record, index"
        >
          <a @click="getProcessRecords(record.modelBaseId, 'model')">审核状态</a>
          <a-divider type="vertical"/>
          <a class="ant-dropdown-link" @click="detailsModelBase(record)">
            模型详情
          </a>
        </span>
      </a-table>
      <a-divider
        :class="{
          'mt8':comboDataObject.page.total>0,
          'mt24':!comboDataObject.page.total>0
        }"
      />
    </div>
    <div class="workspace-total-count">
      <a-row>
        <a-col :span="8">
          <div class="left f16 index-title">待审核套餐列表</div>
        </a-col>
        <a-col :span="16" class="right">
          <a-input-search
            v-model="comboDataObject.params.keywords"
            placeholder="请输入套餐名"
            enter-button="搜索"
            class="w300"
            size="default"
            @search="getComboBaseList()"
          />
        </a-col>
      </a-row>
      <a-divider/>
      <a-table
        size="middle"
        :columns="columnsCombo"
        :data-source="comboDataObject.data"
        :loading="comboDataObject.loading"
        :pagination.sync="comboDataObject.page"
        :rowKey="record=>record.id"
        @change="handleTableChangeCombo"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <template slot="comboName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.comboName && record.comboName !== null ? record.comboName : '-' }}
            </template>
            {{ record.comboName && record.comboName !== null ? record.comboName : '-' }}
          </a-tooltip>
        </template>
        <template slot="modelName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.nsmmModelBase && record.nsmmModelBase.modelName !== null ? record.nsmmModelBase.modelName : '-' }}
            </template>
            {{ record.nsmmModelBase && record.nsmmModelBase.modelName !== null ? record.nsmmModelBase.modelName : '-' }}
          </a-tooltip>
        </template>

        <template slot="modelTypeName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{
                nsmmDictDataObject.modelType.filter(it =>
                record.nsmmModelBase.modelType.toString()=== it.enumCode.toString())[0].enumValue
              }}
            </template>
            {{
              nsmmDictDataObject.modelType.filter(it =>
              record.nsmmModelBase.modelType.toString()=== it.enumCode.toString())[0].enumValue
            }}
          </a-tooltip>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="getProcessRecords(record.comboBaseId, 'combo')">审核状态</a>
          <a-divider type="vertical"/>
          <a class="ant-dropdown-link" @click="detailsComboBase(record)">
            套餐详情
          </a>
        </span>
      </a-table>
      <a-divider
        :class="{
        'mt8':comboDataObject.page.total>0,
        'mt24':!comboDataObject.page.total>0
      }"/>
    </div>
    <div class="workspace-total-count">
      <a-row>
        <a-col :span="8">
          <div class="left f16 index-title">设备列表</div>
        </a-col>
        <a-col :span="16" class="right">
          <a-input-search
            v-model="deviceDataObject.params.keywords"
            placeholder="请输入设备名/IP"
            enter-button="搜索"
            class="w300"
            size="default"
            @search="getDeviceBaseList()"
          />
        </a-col>
      </a-row>
      <a-divider/>
      <a-table
        size="middle"
        :columns="columnsDevice"
        :data-source="deviceDataObject.data"
        :loading="deviceDataObject.loading"
        :pagination.sync="deviceDataObject.page"
        :rowKey='record=>record.id'
        :scroll="{ y: this.$store.state.app.tableScroll }"
        @change="handleTableChangeDevice"
      >
        <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
        </span>
        <template slot="deviceName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.deviceName !== null && record.deviceName !== '' ? record.deviceName : '-' }}
            </template>
            {{ record.deviceName !== null && record.deviceName !== '' ? record.deviceName : '-' }}
          </a-tooltip>
        </template>
        <template slot="modelBaseName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.modelBaseName !== null && record.modelBaseName !== '' ? record.modelBaseName : '-' }}
            </template>
            {{ record.modelBaseName !== null && record.modelBaseName !== '' ? record.modelBaseName : '-' }}
          </a-tooltip>
        </template>
        <template slot="deviceIp" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.deviceIp !== null && record.deviceIp !== '' ? record.deviceIp : '-' }}
            </template>
            {{ record.deviceIp !== null && record.deviceIp !== '' ? record.deviceIp : '-' }}
          </a-tooltip>
        </template>
        <template slot="deviceGroupName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.nsmmDeviceGroup && record.nsmmDeviceGroup.deviceGroupName ? record.nsmmDeviceGroup.deviceGroupName : '-' }}
            </template>
            {{ record.nsmmDeviceGroup && record.nsmmDeviceGroup.deviceGroupName ? record.nsmmDeviceGroup.deviceGroupName : '-' }}
          </a-tooltip>
        </template>
        <template slot="roleBaseName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.roleBaseName !== null && record.roleBaseName !== '' ? record.roleBaseName : '-' }}
            </template>
            {{ record.roleBaseName !== null && record.roleBaseName !== '' ? record.roleBaseName : '-' }}
          </a-tooltip>
        </template>
        <template slot="comboBaseName" slot-scope="text, record, index">
          <a-tooltip>
            <template slot="title">
              {{ record.comboBaseName !== null && record.comboBaseName !== '' ? record.comboBaseName : '-' }}
            </template>
            {{ record.comboBaseName !== null && record.comboBaseName !== '' ? record.comboBaseName : '-' }}
          </a-tooltip>
        </template>
        <template slot="apiStatus" slot-scope="text, record, index">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="record.apiStatus === '1' ? true : false"
            @click="checkSwitch(record)"
          />
        </template>
        <span slot="action" slot-scope="text, record">
          <a>审核状态</a>
          <a-divider type="vertical"/>
          <a class="ant-dropdown-link">模型详情</a>
        </span>
      </a-table>
    </div>
    <a-modal
      v-model="itsmCheckStatusDataBase.checkStatusVisible"
      title="工单处理流程记录"
      :footer="null"
      :bodyStyle="{maxHeight: 'calc(100vh - 260px)', overflowY: 'scroll'}"
    >
      <template v-if="itsmCheckStatusDataBase.data.length">
        <a-timeline>
          <a-timeline-item
            v-for="(item, key) in itsmCheckStatusDataBase.data"
            :key="key"
          >
            <p>环节名称：{{ item.activityName && item.activityName !== '' ? item.activityName : '-' }}</p>
            <p>操作类型：{{ item.actionType && item.actionType !== '' ? item.actionType : '-' }}</p>
            <p>处理人：{{ item.exectorName && item.exectorName !== '' ? item.exectorName : '-' }}</p>
            <p>处理时间：{{ item.exectorTime && item.exectorTime !== '' ? item.exectorTime : '-' }}</p>
            <p>意见：{{ item.tickeAdvice && item.tickeAdvice !== '' ? item.tickeAdvice : '-' }}</p>
          </a-timeline-item>
        </a-timeline>
      </template>
      <template v-else>
        无数据
      </template>
    </a-modal>

    <nsmm-model-detail
      v-if="modelDialogConfig.modelBase.visible"
      :visible="modelDialogConfig.modelBase.visible"
      @changeDetailVisible="handleCloseModelDialog"
      :mode="modelDialogConfig.modelBase.mode"
      :nsmm-model-base-id="modelDialogConfig.modelBase.modelBaseId"
    />
    <nsmm-combo-detail
      v-if="modelDialogConfig.comboBase.visible"
      :visible="modelDialogConfig.comboBase.visible"
      @changeDetailVisible="handleCloseComboDialog"
      :mode="modelDialogConfig.comboBase.mode"
      :nsmm-model-base-id="modelDialogConfig.comboBase.modelBaseId"
      :nsmm-combo-base-id="modelDialogConfig.comboBase.comboBaseId"
    />
  </div>
</template>

<script>
  import { Pagination, Search } from '@/form/index'
  import { Timeline } from 'ant-design-vue';
  import NsmmModelDetail from '../model/model/modules/NsmmModelDetail'
  import NsmmComboDetail from '../model/combo/modules/NsmmComboDetail'

  export default {
    name: 'Workspace',
    components: {
      NsmmModelDetail,
      NsmmComboDetail,
      'a-timeline': Timeline,
      'a-timeline-item': Timeline.Item
    },
    created() {
      this.initNsmmDict();
      this.getMoudleBaseData();
      this.getModelBaseList();
      this.getComboBaseList();
      this.getDeviceBaseList();
    },
    mounted() {
    },
    props: {},
    data() {
      return {
        countData: {
          title: '模型数据',
          records: {
            modelCount: {
              name: '模型总数',
              count: '0',
              span: '2'
            },
            modelFailedCount: {
              name: '待审核模型',
              count: '0',
              span: '2'
            },
            comboCount: {
              name: '套餐总数',
              count: '0',
              span: '2'
            },
            comboFailedCount: {
              name: '待审核套餐',
              count: '0',
              span: '2'
            },
            technicalCount: {
              name: '技术属性总数',
              count: '0',
              span: '3'
            },
            technicalFailedCount: {
              name: '待审核技术属性',
              count: '0',
              span: '3'
            },
            deviceCount: {
              name: '纳管设备总数',
              count: '0',
              span: '3'
            }
          }
        },
        nsmmDictDataObject: {
          modelType : []
        },
        // 查询对象封装定义 查询对象 数据对象 分页对象
        modelDataObject: {
          params: new Search(),
          data: [],
          page: { ...new Pagination() },
          loading: true
        },
        comboDataObject: {
          params: { ...new Search() },
          data: [],
          page: { ...new Pagination() },
          loading: false
        },
        deviceDataObject: {
          params: { ...new Search() },
          data: [],
          page: { ...new Pagination() },
          loading: false
        },
        // 定义table列数据
        columnsMoudle: [
          { title: '#', width: 40, align: 'center', scopedSlots: { customRender: 'serial' } },
          { title: '模型名称', ellipsis: true, dataIndex: 'modelName', scopedSlots: { customRender: 'modelName' } },
          { title: '模型类型', ellipsis: true, dataIndex: 'modelTypeName', width: '150px', scopedSlots: { customRender: 'modelTypeName' } },
          { title: '模型状态', ellipsis: true, dataIndex: 'checkStatusName', width: '150px' },
          {
            title: '模型版本',
            dataIndex: 'nsmmModelBaseVersion.version',
            customRender: (text, record) => {
              return {
                children: record.nsmmModelBaseVersion.version ? record.nsmmModelBaseVersion.version : '-'
              }
            }
          },
          { title: '操作', dataIndex: 'action', width: '200px', scopedSlots: { customRender: 'action' } }
        ],
        columnsCombo: [
          { title: '#', width: 40, align: 'center', scopedSlots: { customRender: 'serial' } },
          { title: '套餐名称', ellipsis: true, dataIndex: 'comboName', scopedSlots: { customRender: 'comboName' } },
          {
            title: '套餐状态',
            dataIndex: 'comboVersionName',
            width: '150px',
            customRender: (text, record) => {
              return {
                children: record.comboVersionName ? record.comboVersionName : '-'
              }
            }
          },
          {
            title: '当前版本',
            dataIndex: 'nsmmComboBaseVersion.version',
            width: '100px',
            customRender: (text, record) => {
              return {
                children: record.nsmmComboBaseVersion && record.nsmmComboBaseVersion.version ? record.nsmmComboBaseVersion.version : '-'
              }
            }
          },
          {
            title: '套餐审核状态',
            dataIndex: 'comboStatusName',
            width: '120px',
            customRender: (text, record) => {
              return {
                children: record.comboStatusName ? record.comboStatusName : '-'
              }
            }
          },
          { title: '所属模型', ellipsis: true, dataIndex: 'nsmmModelBase.modelName', width: '150px', scopedSlots: { customRender: 'modelName' } },
          { title: '模型类型', dataIndex: 'modelTypeName', width: '120px', scopedSlots: { customRender: 'modelTypeName' } },
          { title: '操作', dataIndex: 'action', width: '150px', scopedSlots: { customRender: 'action' } }
        ],
        columnsDevice: [
          { title: '#', align: 'center', width: '40px', scopedSlots: { customRender: 'serial' } },
          { title: '设备名', ellipsis: true, dataIndex: 'deviceName', scopedSlots: { customRender: 'deviceName' } },
          { title: '设备IP', ellipsis: true, dataIndex: 'deviceIp', width: '150px', scopedSlots: { customRender: 'deviceIp' } },
          { title: '所属设备组', ellipsis: true, dataIndex: 'deviceGroupName', width: '150px', scopedSlots: { customRender: 'deviceGroupName' } },
          { title: '设备模型', ellipsis: true, dataIndex: 'modelBaseName', width: '150px', scopedSlots: { customRender: 'modelBaseName' } },
          { title: '设备套餐', ellipsis: true, dataIndex: 'comboBaseName', width: '150px', scopedSlots: { customRender: 'comboBaseName' } },
          { title: '设备角色', ellipsis: true, dataIndex: 'roleBaseName', width: '150px', scopedSlots: { customRender: 'roleBaseName' } },
          { title: 'API状态', width: '100px', dataIndex: 'apiStatus', scopedSlots: { customRender: 'apiStatus' } }
        ],
        // 定义对话框属性
        modelDialogConfig: {
          modelBase: {
            visible: false,
            modelBaseId: '',
            mode: '',
            height: document.body.clientHeight - 200
          },
          comboBase: {
            visible: false,
            modelBaseId: '',
            comboBaseId: '',
            mode: '',
            height: document.body.clientHeight - 200
          },
          deviceBase: {
            visible: false,
            height: document.body.clientHeight - 200
          }
        },
        itsmCheckStatusDataBase: {
          checkStatusVisible: false,
          data: []
        }
      }
    },
    computed: {},
    methods: {
      initNsmmDict() {
        let param = {};
        param.dictCode = 'DEVICE_TYPE';
        this.$api.select.getSysDictSelect(param).then(res => {
          this.nsmmDictDataObject.modelType = res.data;
        });
      },
      getMoudleBaseData() {
        this.$api.total.countNsmmDataTotal()
          .then(res => {
            for (let record of Object.keys(this.countData.records)) {
              this.countData.records[record].count = res.data[record]
            }
          })
      },
      getModelBaseList() {
        let _this = this;
        this.modelDataObject.loading = true;
        this.modelDataObject.params.checkStatus = 1;
        this.$api.total.listNsmmModelBasePage(this.$object.genSearch(this.modelDataObject.params, true))
          .then(res => {
            _this.modelDataObject.loading = false;
            if (res.data !== null && res.data && res.data.length > 0) {
              _this.modelDataObject.data = res.data;
              _this.modelDataObject.page.current = parseInt(res.page.current);
              _this.modelDataObject.page.total = parseInt(res.page.total);
            } else {
              _this.modelDataObject.data = [];
              _this.modelDataObject.page.current = 1;
              _this.modelDataObject.page.total = 0;
            }
          }).catch(error => {
            _this.modelDataObject.loading = false;
          });
      },
      getComboBaseList() {
        let _this = this;
        this.comboDataObject.loading = true;
        this.comboDataObject.params.checkStatus = '';
        this.comboDataObject.params.comboStatus = 1;
        this.$api.total.listNsmmComboBasePage(this.$object.genSearch(this.comboDataObject.params, true))
          .then(res => {
            _this.comboDataObject.loading = false;
            if (res.data !== null && res.data && res.data.length > 0) {
              _this.comboDataObject.data = res.data;
              _this.comboDataObject.page.current = parseInt(res.page.current);
              _this.comboDataObject.page.total = parseInt(res.page.total);
            } else {
              _this.comboDataObject.data = [];
              _this.comboDataObject.page.current = 1;
              _this.comboDataObject.page.total = 0;
            }
          }).catch(error => {
          _this.comboDataObject.loading = false;
        });
      },
      getDeviceBaseList() {
        let _this = this;
        this.deviceDataObject.loading = true;
        this.$api.total.listNsmmDeviceBasePage(this.$object.genSearch(this.deviceDataObject.params, true))
          .then(res => {
            _this.deviceDataObject.loading = false;
            if (res.data !== null && res.data && res.data.length > 0) {
              _this.deviceDataObject.data = res.data;
              _this.deviceDataObject.page.current = parseInt(res.page.current);
              _this.deviceDataObject.page.total = parseInt(res.page.total);
            } else {
              _this.deviceDataObject.data = [];
              _this.deviceDataObject.page.current = 1;
              _this.deviceDataObject.page.total = 0;
            }
          }).catch(error => {
          _this.deviceDataObject.loading = false;
        });
      },
      handleTableChangeMoudle(pagination) {
        this.modelDataObject.params.current = pagination.current;
        this.modelDataObject.params.pageSize = pagination.pageSize;
        this.getModelBaseList();
      },
      handleTableChangeCombo(pagination) {
        this.comboDataObject.params.current = pagination.current;
        this.comboDataObject.params.pageSize = pagination.pageSize;
        this.getComboBaseList();
      },
      handleTableChangeDevice(pagination) {
        this.deviceDataObject.params.current = pagination.current;
        this.deviceDataObject.params.pageSize = pagination.pageSize;
        this.getDeviceBaseList();
      },
      detailsModelBase(record) {
        this.modelDialogConfig.modelBase.mode = 'detail';
        this.modelDialogConfig.modelBase.modelBaseId = record.modelBaseId.toString();
        this.modelDialogConfig.modelBase.visible = true;
      },
      detailsComboBase(record) {
        this.modelDialogConfig.comboBase.mode = 'detail';
        this.modelDialogConfig.comboBase.modelBaseId = record.modelBaseId.toString();
        this.modelDialogConfig.comboBase.comboBaseId = record.comboBaseId.toString();
        this.modelDialogConfig.comboBase.visible = true;
      },
      handleCloseModelDialog(obj) {
        this.modelDialogConfig.modelBase.visible = obj;
        this.modelDialogConfig.modelBase.mode = '';
        this.modelDialogConfig.modelBase.modelBaseId = '';
        this.getModelBaseList();
      },
      handleCloseComboDialog(obj) {
        this.modelDialogConfig.comboBase.visible = obj;
        this.modelDialogConfig.comboBase.mode = '';
        this.modelDialogConfig.comboBase.modelBaseId = '';
        this.modelDialogConfig.comboBase.comboBaseId = '';
        this.getComboBaseList();
      },
      // API状态
      checkSwitch(record) {
        let _this = this;
        if (record.apiStatus !== '') {
          let title = record.apiStatus === '0'
            ?
            '确认开启对外服务提供该设备的相关配置模板、配置参数、并且可以接受参数输出标准配置？'
            :
            '确认关闭对外服务提供该设备的相关配置模板、配置参数等信息？';
          this.$confirm({
            title: title,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.device.changeApiStatus({
                deviceBaseId: record.deviceBaseId,
                apiStatus: record.apiStatus === '0' ? '1' : '0'
              })
                .then(res => {
                  _this.getDeviceBaseList();
                });
            },
            onCancel() {
              return false;
            }
          });
        } else {
          this.$message.error('参数错误，请重试');
        }
      },
      getProcessRecords(businessBaseId, businessType) {
        this.$api.itsm.getProcessRecords({
          businessBaseId: businessBaseId,
          businessType: businessType
        })
          .then(res => {
            this.itsmCheckStatusDataBase.data = res.data
            this.itsmCheckStatusDataBase.checkStatusVisible = true;
          });
      }
    }
  }
</script>

<style lang="less" scoped>
  .workspace-total-count {
    text-align: center;
    font-weight: 500;

    .workspace-total-count-number {
      font-size: 32px;
      color: #2d8cf0;
    }

    .workspace-total-count-name {
      font-size: 14px;
    }
  }

  .index-title {
    height: 32px;
    line-height: 32px;
    /*border-left: 2px solid #2d8cf0;*/
    /*padding-left: 8px;*/
    /*padding-right: 8px;*/
    /*background: #F9F9F9;*/
    /*width: 200px;*/
  }
</style>
