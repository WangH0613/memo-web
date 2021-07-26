<template>
  <a-modal
    :visible="modalVisible"
    class="fullscreen"
    title="配置方案信息"
    centered
    :destroyOnClose="true"
    @cancel="handleCloseDialog"
  >

    <template slot="footer">
      <a-button key="pre" type="primary" @click="stepPre" v-if="stepObject.stepNo > 0">
        上一步
      </a-button>
      <a-button key="next" type="primary" :disabled="!status" @click="stepNext" v-if="stepObject.stepNo < 5">
        下一步
      </a-button>
      <a-button key="submitScheme" type="primary" @click="submitScheme" v-if="stepObject.stepNo === 5" v-hasAuth>
        提交
      </a-button>
      <a-button key="submitSchemeItsm" type="primary" @click="submitSchemeItsm" v-if="stepObject.stepNo === 5" v-hasAuth>
        提交ITSM审核
      </a-button>
    </template>

    <template>
      <a-steps :current="stepObject.stepNo" v-if="status">
        <a-step title="方案信息"/>
        <a-step title="套餐信息"/>
        <a-step title="套餐互联信息"/>
        <a-step title="节点互联信息"/>
        <a-step title="边界互联"/>
        <a-step title="方案预览"/>
      </a-steps>
      <div class="steps-content" v-if="stepObject.stepNo === 0 && status">
        <edit-nsmm-scheme-base
          ref="editNsmmSchemeBase"
          :mode="curMode"
          @commitResult="syncCommitResult"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
      <div class="steps-content" v-if="stepObject.stepNo === 1 && status">
        <edit-nsmm-scheme-combo-base
          ref="editNsmmSchemeComboBase"
          :mode="curMode"
          @commitResult="syncCommitResult"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
      <div class="steps-content" v-if="stepObject.stepNo === 2 && status">
        <edit-nsmm-scheme-combo-relvance
          :mode="curMode"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
      <div class="steps-content" v-if="stepObject.stepNo === 3 && status">
        <edit-nsmm-scheme-combo-real-node-relevance
          :mode="curMode"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
      <div class="steps-content" v-if="stepObject.stepNo === 4 && status">
        <edit-nsmm-scheme-combo-out-relevance
          :mode="curMode"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
      <div class="steps-content" v-if="stepObject.stepNo === 5 && status">
        <edit-nsmm-scheme-preview
          :mode="curMode"
          :nsmmSchemeBaseId="curNsmmSchemeBaseId"
        />
      </div>
    </template>
  </a-modal>
</template>

<script>
  import EditNsmmSchemeBase from './EditNsmmSchemeBase'
  import EditNsmmSchemeComboBase from './EditNsmmSchemeComboBase'
  import EditNsmmSchemeComboRelvance from './EditNsmmSchemeComboRelvance'
  import EditNsmmSchemeComboRealNodeRelevance from './EditNsmmSchemeComboRealNodeRelevance'
  import EditNsmmSchemeComboOutRelevance from './EditNsmmSchemeComboOutRelevance'
  import EditNsmmSchemePreview from './EditNsmmSchemePreview'
  import { NsmmSchemeBase } from '@/form'

  export default {
    name: 'EditNsmmSchemeStepLayout',
    components: {
      EditNsmmSchemeBase,
      EditNsmmSchemeComboBase,
      EditNsmmSchemeComboRelvance,
      EditNsmmSchemeComboRealNodeRelevance,
      EditNsmmSchemeComboOutRelevance,
      EditNsmmSchemePreview
    },
    props: [
      'visible',
      'mode',
      'schemeBaseId'
    ],
    created() {
      this.initPageData();
    },
    computed: {
      modalVisible() {
        return this.visible;
      },
      showEditStepLayout() {
        if (this.curMode === 'add') {
          return true;
        }
        if (this.curMode === 'update' && this.curNsmmSchemeBaseId) {
          return true;
        }
        return false;
      }
    },
    watch: {
      curMode(newVal, oldValue) {
        if (newVal === 'add') {
          this.status = true;
        }
        if (newVal === 'update') {
          // this.curNsmmModelBaseId = '';
          this.status = true;
        }
      }
    },
    data() {
      return {
        // 当前模式 新增为add 编辑为update
        curMode: '',
        curNsmmSchemeBaseId: '',
        labelCol: { span: 4, offset: 2 },
        wrapperCol: { span: 6 },
        stepObject: {
          stepNo: 0,
          max: 5,
          min: 0
        },
        // 数据对象
        curNsmmSchemeBaseDataObject: {
          // 存储当前的模型对象
          object: { ...new NsmmSchemeBase() }
        },
        updateType: '',
        status: true
      };
    },
    methods: {
      initPageData() {
        // 初始化
        this.curMode = this.mode;
        this.curNsmmSchemeBaseId = this.schemeBaseId;
      },
      stepNext() {
        let _this = this;
        if (this.stepObject.stepNo === this.stepObject.max) {
          this.$message.info('已到达最后一步');
          return false;
        }
        if (this.stepObject.stepNo === 0 && this.curMode === 'add' && this.curNsmmSchemeBaseId === '') {
            this.doInsertNsmmSchemeBase();
            return false;
        }
        if (this.stepObject.stepNo === 0 && this.curMode === 'update' && this.curNsmmSchemeBaseId !== '') {
            this.doUpdateNsmmSchemeBase();
            return false;
        }
        if (this.stepObject.stepNo === 1 && this.curNsmmSchemeBaseId !== '') {
          this.doUpdateNsmmSchemeComboBase();
          return false;
        }
        this.stepObject.stepNo++;
      },
      stepPre() {
        if (this.stepObject.stepNo === this.stepObject.min) {
          this.$message.info('已到达第一步');
        } else {
          this.stepObject.stepNo--;
        }
      },
      syncCommitResult(result) {
        // debugger
        if (result.status === 'success') {
          this.stepObject.stepNo++;
        }
        if (result.object && result.object !== null) {
          this.curNsmmSchemeBaseId = result.object.schemeBaseId;
          this.curNsmmSchemeBaseDataObject.object = result.object;
          this.curMode = result.mode;
        }
        // 编辑模式的调整 触发 观察事件
        // this.curMode = result.mode;
      },
      doInsertNsmmSchemeBase() {
        let _this = this;
        this.$confirm({
          title: '确认新增当前方案信息？',
          okText: '确认',
          cancelText: '放弃',
          onOk() {
            _this.$refs.editNsmmSchemeBase.doInsertNsmmSchemeBase();
          },
          onCancel() {
            return false;
          }
        });
      },
      doUpdateNsmmSchemeBase() {
        let _this = this;
        this.$confirm({
          title: '确认更新当前方案信息？',
          okText: '确认',
          cancelText: '暂不更新',
          onOk() {
            _this.$refs.editNsmmSchemeBase.doUpdateNsmmSchemeBase();
          },
          onCancel() {
            _this.stepObject.stepNo++;
          }
        });
      },
      doUpdateNsmmSchemeComboBase() {
        this.$refs.editNsmmSchemeComboBase.doUpdateNsmmSchemeComboBase();
        // let _this = this;
        // this.$confirm({
        //   title: '确认更新当前套餐信息？',
        //   okText: '确认',
        //   cancelText: '暂不更新',
        //   onOk() {
        //     _this.$refs.editNsmmSchemeComboBase.doUpdateNsmmSchemeComboBase();
        //   },
        //   onCancel() {
        //     return false;
        //   }
        // });
      },
      handleCloseDialog() {
        this.stepObject.stepNo = 0;
        this.stepObject.stepStatus = false;
        this.$emit('changeVisible', false);
      },
      submitScheme() {
        let _this = this;
        if (this.curNsmmSchemeBaseId !== '') {
          _this.$confirm({
            title: '当前操作不会对接ITSM审核流程，确认方案审核通过？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.scheme.submitSchemeBase({
                schemeBaseId: _this.curNsmmSchemeBaseId,
                checkStatus: 3
              })
                .then(res => {
                  _this.$message.success('方案审核通过');
                  _this.handleCloseDialog();
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
        if (this.curNsmmSchemeBaseId !== '') {
          this.$confirm({
            title: '确认提交ITSM审核方案信息？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              _this.$api.itsm.commonCreateTicket({
                businessBaseId: _this.curNsmmSchemeBaseId,
                businessType: 'scheme'
              })
                .then(res => {
                  _this.$message.success('提交ITSM审核成功');
                  _this.handleCloseDialog();
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

<style scoped>
  .steps-content {
    margin-top: 24px;
    padding: 24px;
    border: 1px solid #EEEEEE;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>
