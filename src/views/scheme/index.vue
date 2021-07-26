<template>
  <div>

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row>
          <a-col :span="6">
            <a-form-item label="名称">
              <a-input
                v-model="nsmmSchemeBaseDataObject.params.keywords"
                :value="nsmmSchemeBaseDataObject.params.keywords.trim()"
                placeholder="请输入方案名称"
                @keyup.enter="getSchemeBaseList('select')"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :offset="12" :span="6" class="right">
            <span class="table-page-search-submitButtons">
              <a-button class="ml8" @click="resetForm">
                重置
              </a-button>
              <a-button class="ml16" type="primary" @click="getSchemeBaseList('select')">
                查询
              </a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="search-table-box-wrapper mt24">
      <div>
        <a-button class="mb8 mr8" type="primary" @click="doAdd" v-hasAuth>
          新增
        </a-button>
        <a-button class="mb8 mr8" @click="doSelectedRows('update')" v-hasAuth>
          修改
        </a-button>
        <a-button class="mb8 mr8" @click="doSelectedRows('delete')" v-hasAuth>
          删除
        </a-button>
        <a-button class="mb8 mr8" @click="getSchemeBaseList('select')">
          刷新
        </a-button>
        <a-table
          size="middle"
          :columns="columnsNsmmSchemeBase"
          :data-source="nsmmSchemeBaseDataObject.data"
          :loading="nsmmSchemeBaseDataObject.loading"
          :pagination.sync="nsmmSchemeBaseDataObject.page"
          :rowKey='(record,index)=>{return index}'
          :row-selection="{ selectedRowKeys: rowSelectionNsmmSchemeBase.selectedRowKeys, onChange: tableRowCheck }"
          @change="handleTableChangeScheme"
        >
          <template slot="checkStatusName" slot-scope="text, record, index">
            <template v-if="record.checkStatus === '1' || record.checkStatus === '2' || record.checkStatus === '3' || record.checkStatus === '4'">
              <span @click="getProcessRecords(record.schemeBaseId, 'scheme')" style="cursor: pointer; color: #2D8CF0">
                {{ record.checkStatusName }}
              </span>
            </template>
            <template v-else>
              {{ record.checkStatusName }}
            </template>
          </template>
          <template slot="dataCenterId" slot-scope="text, record, index">
            <a-tooltip>
              <template slot="title">
                {{
                  nsmmDataCenterObject.data.filter(it =>
                    record.dataCenterId.toString()=== it.datacenterId.toString())[0].datacenterName
                }}
              </template>
              {{
              nsmmDataCenterObject.data.filter(it =>
              record.dataCenterId.toString()=== it.datacenterId.toString())[0] ? nsmmDataCenterObject.data.filter(it =>
                  record.dataCenterId.toString()=== it.datacenterId.toString())[0].datacenterName : '-'
              }}
            </a-tooltip>
          </template>
          <div
            slot="action"
            slot-scope="text, record, index"
            class="action"
          >
            <span @click="doDetail(record, 'detail')" style="color:#2D8CF0">
              详情
            </span>
            <template v-if="record.checkStatus === '1'">
              <a-divider type="vertical" v-hasAuth/>
              <span @click="retrieveTicket(record, 'scheme')" style="color:#2D8CF0" v-hasAuth>
                撤回审核
              </span>
            </template>
            <template v-else-if="record.checkStatus === '0' || record.checkStatus === '2' || record.checkStatus === '4'">
              <a-divider type="vertical" v-hasAuth/>
              <span @click="doDetail(record, 'submitScheme')" style="color:#2D8CF0" v-hasAuth>
                提交审核
              </span>
            </template>
          </div>
        </a-table>
      </div>
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

    <edit-nsmm-scheme-step-layout
      v-if="dialogConfig.visible"
      @changeVisible="handleCloseDialog"
      :mode="dialogConfig.mode"
      :visible="dialogConfig.visible"
      :scheme-base-id="dialogConfig.nsmmSchemeBaseId"
    />

    <nsmm-scheme-detail
      v-if="detailDialogConfig.visible"
      :visible="detailDialogConfig.visible"
      @changeDetailVisible="handleCloseDetailDialog"
      :mode="detailDialogConfig.mode"
      :nsmm-scheme-base-id="detailDialogConfig.nsmmSchemeBaseId"
    />
  </div>
</template>

<script>
  import EditNsmmSchemeStepLayout from './modules/EditNsmmSchemeStepLayout'
  import NsmmSchemeDetail from './modules/NsmmSchemeDetail'
  import { Pagination, Search } from '@/form/index'

  export default {
    name: 'schemeIndex',
    components: {
      EditNsmmSchemeStepLayout,
      NsmmSchemeDetail
    },
    computed: {},
    created() {
      this.initNsmmDict();
      this.initPageDate();
    },
    mounted() {
    },
    watch: {},
    props: {},
    data() {
      return {
        // 查询对象封装定义 查询对象 数据对象 分页对象
        nsmmSchemeBaseDataObject: {
          params: { ...new Search() },
          data: [],
          page: { ...new Pagination() },
          loading: true,
          advanced: false
        },
        // 定义字典对象
        nsmmDataCenterObject: {
          data: []
        },
        // 定义table列数据
        columnsNsmmSchemeBase: [
          { title: '方案名称', ellipsis: true, dataIndex: 'schemeName', scopedSlots: { customRender: 'schemeName' } },
          { title: '所属数据中心', ellipsis: true, dataIndex: 'dataCenterId', scopedSlots: { customRender: 'dataCenterId' } },
          {
            title: '方案状态',
            dataIndex: 'checkStatusName',
            width: '150px',
            filters: [],
            scopedSlots: { customRender: 'checkStatusName' }
          },
          { title: '所含套餐数量', dataIndex: 'schemeComboNums', width: '150px' },
          { title: '创建日期', dataIndex: 'createDate', width: '120px', scopedSlots: { customRender: 'createDate' } },
          { title: '更新日期', dataIndex: 'modifyDate', width: '120px', scopedSlots: { customRender: 'modifyDate' } },
          { title: '操作', align: 'left', dataIndex: 'action', width: '160px', scopedSlots: { customRender: 'action' } }
        ],
        rowSelectionNsmmSchemeBase: {
          selectedRowKeys: [],
          selectedRows: []
        },
        // 定义对话框属性
        dialogConfig: {
          visible: false,
          mode: '',
          nsmmSchemeBaseId: ''
        },
        detailDialogConfig: {
          visible: false,
          mode: '',
          nsmmSchemeBaseId: ''
        },
        submitDialogConfig: {
          visible: false,
          mode: '',
          nsmmSchemeBaseId: ''
        },
        // 定义字典表对象
        nsmmDictDataObject: {
          modelType: [],
          checkStatus: [],
          tableModelTypeFifter: [],
          tableCheckStatusFifter: []
        },
        itsmCheckStatusDataBase: {
          checkStatusVisible: false,
          data: []
        }
      }
    },
    methods: {
      initPageDate() {
        this.nsmmSchemeBaseDataObject.params.checkStatus = undefined;
        this.getSchemeBaseList();
      },
      initNsmmDict() {
        this.$api.pub.listNsmmDictCheckStatus().then(res => {
          this.nsmmDictDataObject.checkStatus = res.data;
          const checkStatus = (res.data || []).map(d => {
            let obj = {
              text: d.dataValue,
              value: d.dataCode
            }
            if (this.columnsNsmmSchemeBase[1].filters) {
              this.columnsNsmmSchemeBase[1].filters.push(obj)
            }
            return d
          })
        })

        // 获取数据中心列表
        this.$api.select.getDataCenterSelect()
          .then(res => {
            if (res.data && res.data.length) {
              this.nsmmDataCenterObject.data = res.data;
            }
          })
      },
      getSchemeBaseList(mode = '') {
        let _this = this;
        if (mode === 'select') {
          this.nsmmSchemeBaseDataObject.params.current = 1;
          this.nsmmSchemeBaseDataObject.params.pageSize = 10;
          this.nsmmSchemeBaseDataObject.params.total = 0;
        }
        this.rowSelectionNsmmSchemeBase.selectedRowKeys = [];
        this.rowSelectionNsmmSchemeBase.selectedRows = [];
        this.nsmmSchemeBaseDataObject.loading = true;
        this.$api.scheme.listNsmmSchemeBasePage(this.$object.genSearch(this.nsmmSchemeBaseDataObject.params, true))
            .then(res => {
                _this.nsmmSchemeBaseDataObject.loading = false;
                if (res.data !== null && res.data && res.data.length > 0) {
                    _this.nsmmSchemeBaseDataObject.data = res.data;
                    _this.nsmmSchemeBaseDataObject.page.current = parseInt(res.page.current);
                    _this.nsmmSchemeBaseDataObject.page.total = parseInt(res.page.total);
                } else {
                    _this.nsmmSchemeBaseDataObject.data = [];
                    _this.nsmmSchemeBaseDataObject.page.current = 1;
                    _this.nsmmSchemeBaseDataObject.page.total = 0;
                }
            }).catch(error => {
            _this.nsmmSchemeBaseDataObject.loading = false;
        });
      },
      // 清空搜索条件
      resetForm() {
        this.nsmmSchemeBaseDataObject.params.keywords = '';
        this.nsmmSchemeBaseDataObject.params.current = 1;
        this.nsmmSchemeBaseDataObject.params.pageSize = 10;
        this.nsmmSchemeBaseDataObject.params.total = 0;
        this.getSchemeBaseList();
      },
      // 监听复选框事件
      tableRowCheck(selectedRowKeys, selectedRows) {
        this.rowSelectionNsmmSchemeBase.selectedRowKeys = selectedRowKeys;
        this.rowSelectionNsmmSchemeBase.selectedRows = selectedRows;
      },
      // 打开新建的回调
      doAdd() {
        this.dialogConfig.mode = 'add';
        this.dialogConfig.nsmmSchemeBaseId = '';
        this.dialogConfig.visible = true;
      },
      // 关闭弹窗的回调
      handleCloseDialog(obj) {
        this.dialogConfig.visible = obj;
        this.dialogConfig.mode = '';
        this.dialogConfig.nsmmSchemeBaseId = '';
        this.getSchemeBaseList();
      },
      // 查看详情
      doDetail(record, curMode) {
        this.detailDialogConfig.mode = curMode;
        this.detailDialogConfig.nsmmSchemeBaseId = record.schemeBaseId.toString();
        this.detailDialogConfig.visible = true;
      },
      handleTableChangeScheme(pagination, filters, sorter) {
        if (filters.checkStatusName) {
          let checkStatus = '';
          for (let i = 0; i < filters.checkStatusName.length; i++) {
            checkStatus += filters.checkStatusName[i] + ',';
          }
          this.nsmmSchemeBaseDataObject.params.checkStatus = checkStatus.slice(0, -1)
        }
        this.nsmmSchemeBaseDataObject.params.current = pagination.current;
        this.nsmmSchemeBaseDataObject.params.pageSize = pagination.pageSize;
        this.getSchemeBaseList();
      },
      // 打开更新的回调
      doUpdate(record) {
        this.dialogConfig.mode = 'update';
        this.dialogConfig.nsmmSchemeBaseId = record.schemeBaseId.toString();
        this.dialogConfig.visible = true;
      },
      // 关闭弹窗的回调
      handleCloseDetailDialog(obj) {
        this.detailDialogConfig.visible = obj;
        this.detailDialogConfig.mode = '';
        this.detailDialogConfig.nsmmSchemeBaseId = '';
        this.getSchemeBaseList();
      },
      // 提交审核
      doSubmitScheme(record, curMode) {
        this.submitDialogConfig.mode = curMode;
        this.submitDialogConfig.nsmmSchemeBaseId = record.schemeBaseId.toString();
        this.submitDialogConfig.visible = true;
      },
      // 列表复选框统一方法
      doSelectedRows(mode) {
        const selectedRows = this.rowSelectionNsmmSchemeBase.selectedRows;
        if (mode === 'update') {
          if (selectedRows.length === 1) {
            // if (selectedRows[0] && (selectedRows[0].checkStatus === '0' || selectedRows[0].checkStatus === '2' || selectedRows[0].checkStatus === '3' || selectedRows[0].checkStatus === '4')) {
            this.doUpdate(selectedRows[0]);
            //   } else if (selectedRows[0].checkStatus === '1') {
            //     this.$message.error('模型审核中，禁止操作');
            //     return false;
            //   }
          } else {
            this.$message.error('请选择一条需要修改的数据');
            return false;
          }
        } else if (mode === 'delete') {
          if (selectedRows.length > 0) {
            if (selectedRows.length === 1) {
              // 删除单条数据
              // if (selectedRows[0] && (selectedRows[0].checkStatus === '0' || selectedRows[0].checkStatus === '2')) {
              this.doDelete(selectedRows[0]);
              // } else if (selectedRows[0].checkStatus === '1') {
              //   this.$message.error('模型审核中，禁止操作');
              //   return false;
              // } else if (selectedRows[0].checkStatus === '3') {
              //   this.$message.error('模型已生效，禁止操作！');
              //   return false;
              // }
            } else {
              // 批量删除数据
              let schemeBaseIds = '';
              try {
                selectedRows.forEach(function (item, index) {
                  // if (item && item.checkStatus === '0' || item.checkStatus === '2') {
                    if (item.schemeBaseId !== '') {
                      schemeBaseIds += item.schemeBaseId + ',';
                    }
                  // } else if (item.checkStatus === '1') {
                  //   throw ('方案审核中，禁止操作');
                  // } else if (item.checkStatus === '3') {
                  //   throw ('方案已生效，禁止操作');
                  // }
                })
                this.deleteAll(schemeBaseIds.slice(0, -1))
              } catch (error) {
                this.$message.error(error);
                return false;
              }
            }
          } else {
            this.$message.error('请至少选择一条需要删除的数据');
            return false;
          }
        }
      },
      // 删除方案信息
      doDelete(record) {
        let _this = this;
        if (record.schemeBaseId) {
          _this.$confirm({
            title: '确认删除方案信息？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.scheme.deleteNsmmSchemeBase({
                schemeBaseIds: record.schemeBaseId
              })
                .then(res => {
                  _this.rowSelectionNsmmSchemeBase.selectedRowKeys = [];
                  _this.rowSelectionNsmmSchemeBase.selectedRows = [];
                  _this.getSchemeBaseList();
                });
            },
            onCancel() {
              _this.$message.error('取消删除方案信息');
              return false;
            }
          });
        } else {
          this.$message.error('参数错误，请重试');
          return false;
        }
      },
      // 删除模型信息 -- 批量
      deleteAll(schemeBaseIds) {
        let _this = this;
        if (schemeBaseIds !== '') {
          _this.$confirm({
            title: '确认批量删除方案信息？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.scheme.deleteNsmmSchemeBase({
                schemeBaseIds: schemeBaseIds
              })
                .then(res => {
                  _this.rowSelectionNsmmSchemeBase.selectedRowKeys = [];
                  _this.rowSelectionNsmmSchemeBase.selectedRows = [];
                  _this.getSchemeBaseList();
                });
            },
            onCancel() {
              return false;
            }
          });
        } else {
          this.$message.error('参数错误，请重试');
          return false;
        }
      },
      // 撤回审核
      retrieveTicket(record, businessType) {
        let _this = this;
        if (record.schemeBaseId) {
          _this.$confirm({
            title: '确认撤回方案信息？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.itsm.retrieveTicket({
                businessType: businessType,
                businessBaseId: record.schemeBaseId
              })
                .then(res => {
                  // _this.$message.success('撤回方案审核成功');
                  _this.rowSelectionNsmmSchemeBase.selectedRowKeys = [];
                  _this.rowSelectionNsmmSchemeBase.selectedRows = [];
                  _this.getSchemeBaseList();
                });
            },
            onCancel() {
              _this.$message.error('取消撤回方案信息');
              return false;
            }
          });
        } else {
          this.$message.error('参数错误，请重试');
          return false;
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

<style lang="less" scoped></style>
