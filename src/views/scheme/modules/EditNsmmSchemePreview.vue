<template>
  <div>
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
      :loading="nsmmSchemeBaseDataObject.comboLoading"
      :bordered="true"
      :rowKey='(record,index)=>{return index}'
      :pagination="false"
    >
      <template slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="technicalSum" slot-scope="text, record, index">
        <span @click="handleTechnicalListDialog(record)" style="cursor: pointer; color: #2D8CF0;">
          {{ record.technicalSum }}
        </span>
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
      <a-button class="mb8 mr8" :type="relevanceType === 'and' ? 'primary' : ''" @click="getSchemeRelevanceList('and')">
        套餐间
      </a-button>
      <a-button class="mb8 mr8" :type="relevanceType === 'in' ? 'primary' : ''" @click="getSchemeRelevanceList('in')">
        套餐内
      </a-button>
      <a-button class="mb8 mr8" :type="relevanceType === 'out' ? 'primary' : ''" @click="getSchemeRelevanceList('out')">
        外联
      </a-button>
      <a-button class="mb8 mr8" :type="relevanceType === '' ? 'primary' : ''" @click="getSchemeRelevanceList('all')">
        显示所有
      </a-button>
      <a-table
        class="mt24"
        ref="nsmmSchemePreviewComboRelevanceBaseTable"
        size="middle"
        :columns="nsmmSchemePreviewComboRelevanceBaseTable"
        :data-source.sync="nsmmSchemeBaseDataObject.comboRelevanceData"
        :loading="nsmmSchemeBaseDataObject.comboRelevanceLoading"
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
    <a-divider/>
    <!-- 拓扑图结构  -->
    <div>
      <a-row>
        <a-col :span="8">
          <div class="left f16 index-title">拓扑图结构</div>
        </a-col>
      </a-row>
      <div id="container" style="position: relative; min-height: 500px; display: block; overflow: scroll;">
        <div class="center f16">
          <a-spin :spinning="nsmmSchemeBaseDataObject.spinningLoading" tip="数据加载中...">
            <a-empty v-if="nsmmSchemeBaseDataObject.graphSpinningLoading" :image="nsmmSchemeBaseDataObject.simpleImage" />
          </a-spin>
        </div>
      </div>
    </div>
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
import { Empty } from 'ant-design-vue';
import { NsmmSchemeBase, Pagination, Search } from '@/form';
import NsmmComboDetail from '../../model/combo/modules/NsmmComboDetail';
import NsmmTechnicalList from '../../model/technical/modules/NsmmTechnicalList';
// import insertCss from 'insert-css';
import G6 from '@antv/g6';

export default {
  name: 'EditNsmmSchemePreview',
  components: {
    'a-empty': Empty,
    NsmmComboDetail,
    NsmmTechnicalList
  },
  props: [ 'mode', 'nsmmSchemeBaseId' ],
  created() {
    this.nsmmSchemeBaseDataObject.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    this.initPageData();
    this.initNsmmDict();
  },
  data() {
    return {
      relevanceType: '',
      graph: '',
      graphDestroy: false, //记录每次加载是否创建了画布
      // 定义方案信息数据对象
      nsmmSchemeBaseDataObject: {
        form: { ...new NsmmSchemeBase() },
        schemeData: [],
        comboData: [],
        comboRelevanceData: [],
        comboRelevanceChartData: [],
        comboLoading: false,
        comboRelevanceLoading: false,
        // 拓扑图数据加载状态
        spinningLoading: false,
        graphSpinningLoading: false,
        simpleImage: '',
        params: { ...new Search() },
        page: { ...new Pagination() }
      },
      nsmmDictDataObject: {
        modelType: []
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
        { title: '所属模型类型', dataIndex: 'nsmmComboBase.nsmmModelBase.modelType', width: '150px', scopedSlots: { customRender: 'modelTypeName' } },
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
  watch: {
    relevanceType: function (newValue, oldValue) {
      this.getSchemeComboRealNodeRelevanceChart(newValue);
    }
  },
  methods: {
    // 页面初始化方法封装在这里
    async initPageData() {
      if (this.nsmmSchemeBaseId !== '') {
        this.nsmmSchemeBaseDataObject.form.schemeBaseId = this.nsmmSchemeBaseId;
        this.nsmmSchemeBaseDataObject.params.schemeBaseId = this.nsmmSchemeBaseId;
        await this.$api.scheme.getNsmmSchemeBase(this.nsmmSchemeBaseDataObject.form)
          .then(res => {
            this.nsmmSchemeBaseDataObject.schemeData = { ...res.data };
          })
        await this.listNsmmSchemeComboBaseAll();
        await this.getSchemeRelevanceList('and');
        // await this.getSchemeComboRealNodeRelevanceChart('and');
      }
    },
    initNsmmDict() {
      let param = {};
      param.dictCode = 'DEVICE_TYPE';
      this.$api.select.getSysDictSelect(param).then(res => {
        this.nsmmDictDataObject.modelType = res.data;
      });
    },
    listNsmmSchemeComboBaseAll() {
      this.nsmmSchemeBaseDataObject.comboLoading = true;
      this.$api.scheme.listNsmmSchemeComboBaseAll(this.$object.genSearch(this.nsmmSchemeBaseDataObject.params, true))
        .then(res => {
          this.nsmmSchemeBaseDataObject.comboData = res.data;
          this.nsmmSchemeBaseDataObject.comboLoading = false;
        })
    },
    getSchemeRelevanceList(relevanceType) {
      let _this = this;
      this.relevanceType = relevanceType;
      this.nsmmSchemeBaseDataObject.params.relevanceType = relevanceType;
      this.nsmmSchemeBaseDataObject.comboRelevanceLoading = true;
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
          this.nsmmSchemeBaseDataObject.comboRelevanceLoading = false;
        })
    },
    handleTableChangeScheme(pagination, filters, sorter) {
      this.nsmmSchemeBaseDataObject.params.current = pagination.current;
      this.nsmmSchemeBaseDataObject.params.pageSize = pagination.pageSize;
      this.getSchemeRelevanceList(this.relevanceType);
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
    async listNsmmModelNodeRelevance() {
      let _this = this;
      this.nsmmModelNodeRelevanceDataObject.loading = true;
      this.$api.model.listNsmmModelNodeRelevanceAll(this.$object.genSearch(this.nsmmModelNodeRelevanceDataObject.params, false))
        .then(res => {
          if (res.data !== null && res.data && res.data.length > 0) {
            _this.nsmmModelNodeRelevanceDataObject.data = res.data.map(item => {
              item.isEdit = false;
              return item;
            });
          } else {
            _this.nsmmModelNodeRelevanceDataObject.data = [];
          }
        })
        .catch(error => {
          _this.nsmmModelNodeRelevanceDataObject.data = [];
        })
        .finally(() => {
          _this.nsmmModelNodeRelevanceDataObject.loading = false;
        });
    },
    createElementButton(data) {
      const _this = this;
      const container = document.getElementById('container');
      const descriptionAll = document.createElement('button');
      const descriptionDivAnd = document.createElement('button');
      const descriptionDivIn = document.createElement('button');
      const descriptionDivOut = document.createElement('button');
      const descriptionDivSaveChart = document.createElement('button');
      const descriptionDivExportImgChart = document.createElement('button');
      descriptionAll.innerHTML = '全部';
      descriptionDivAnd.innerHTML = '套餐间';
      descriptionDivIn.innerHTML = '套餐内';
      descriptionDivOut.innerHTML = '外联';
      descriptionDivSaveChart.innerHTML = '保存';
      descriptionDivExportImgChart.innerHTML = '导出拓扑图';
      const styleMargin = 'margin-right: 5px;margin-top: 20px;';
      const styleSelectButton = 'color: #fff;background-color: #4082e6; border-radius: 4px;margin-right: 5px; border-color: #4082e6;';
      switch (this.relevanceType) {
        case 'and':
          descriptionDivAnd.style = styleSelectButton;
          descriptionAll.style = styleMargin;
          descriptionDivIn.style = styleMargin;
          descriptionDivOut.style = styleMargin;
          break;
        case 'in':
          descriptionDivIn.style = styleSelectButton;
          descriptionAll.style = styleMargin;
          descriptionDivAnd.style = styleMargin;
          descriptionDivOut.style = styleMargin;
          break;
        case 'out':
          descriptionDivOut.style = styleSelectButton;
          descriptionAll.style = styleMargin;
          descriptionDivAnd.style = styleMargin;
          descriptionDivIn.style = styleMargin;
          break;
        case 'all':
          descriptionAll.style = styleSelectButton;
          descriptionDivAnd.style = styleMargin;
          descriptionDivIn.style = styleMargin;
          descriptionDivOut.style = styleMargin;
          break;
        case '':
          descriptionAll.style = styleSelectButton;
          descriptionDivAnd.style = styleMargin;
          descriptionDivIn.style = styleMargin;
          descriptionDivOut.style = styleMargin;
          break;
      }
      descriptionDivSaveChart.style = styleMargin;
      descriptionAll.addEventListener('click', (e) => {
        // _this.getSchemeComboRealNodeRelevanceChart('');
        _this.getSchemeRelevanceList('all');
      });
      descriptionDivAnd.addEventListener('click', (e) => {
        // _this.getSchemeComboRealNodeRelevanceChart('and');
        _this.getSchemeRelevanceList('and');
      });
      descriptionDivIn.addEventListener('click', (e) => {
        // _this.getSchemeComboRealNodeRelevanceChart('in');
        _this.getSchemeRelevanceList('in');
      });
      descriptionDivOut.addEventListener('click', (e) => {
        // _this.getSchemeComboRealNodeRelevanceChart('out');
        _this.getSchemeRelevanceList('out');
      });
      descriptionDivSaveChart.addEventListener('click', (e) => {
        // _this.getSchemeComboRealNodeRelevanceChart('out');
        _this.saveSchemeChart();
      });
      descriptionDivExportImgChart.addEventListener('click', (e) => {
        _this.exportSchemeChartImg();
      });
      container.appendChild(descriptionDivAnd);
      container.appendChild(descriptionDivIn);
      container.appendChild(descriptionDivOut);
      container.appendChild(descriptionAll);
      container.appendChild(descriptionDivSaveChart);
      container.appendChild(descriptionDivExportImgChart);
      const width = container.scrollWidth;
      const height = (container.scrollHeight || 500) - 30;
      const toolbar = new G6.ToolBar({
        position: { x: 360, y: 15 }
      });
      this.graph = new G6.Graph({
        container: 'container',
        width,
        height,
        // groupByTypes: false,
        plugins: [toolbar],
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            'drag-combo',
          ]
        },
        layout: {
          type: 'dagre',
          // gravity: 7,
          // speed: 5
        },
        defaultCombo: {
          type: 'rect',
          size: [25, 20],
          style: {
            stroke: '#6ba5f2',
            fillOpacity: 0.1
          },
          labelCfg: {
            position: 'top'
          }
        }
      });
      const chartData = this.parseNodeRelevanceChartData(data);
      // 渲染数据
      this.graph.data(chartData);
      this.graph.render();
      this.graphDestroy = true;
      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!this.graph || this.graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          this.graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
        };
      }
    },
    parseNodeRelevanceChartData(data) {
      const chartData = {
        nodes: (data.nodes || []).map(d => {
          if (d.modelTypeName) {
            d.img = require('@/assets/images/' + d.modelTypeName + '.jpg');
            d.type = 'image';
            d.size = [50, 50];
          }
          d.labelCfg = {
            position: 'bottom'
          }
          d.label = d.roleName + '-' + d.nodeName;
          d.x = d.xCoordinate;
          d.y = d.yCoordinate;
          return d;
        }),
        edges: (data.edges || []).map(d => {
          let label = '';
          d.sourcePorts.forEach(function (item, index) {
            label += item + '\n';
          })
          label += '\n';
          d.targetPorts.forEach(function (item, index) {
            label += item + '\n';
          })
          d.label = label;
          d.style = {
            stroke: '#6ba5f2'
          }
          return d;
        }),
        combos: data.realIdGroupDetail
      };
      chartData.nodes.forEach((node) => {
        switch (node.comboId) {
          case 'A':
            node.style = {
              fill: '#C4E3B2',
              stroke: '#C4E3B2'
            };
            break;
          case 'B':
            node.style = {
              fill: '#99C0ED',
              stroke: '#99C0ED'
            };
            break;
          case 'C':
            node.style = {
              fill: '#eee',
              stroke: '#eee'
            };
            break;
          default:
            node.style = {
              fill: '#FDE1CE',
              stroke: '#FDE1CE'
            };
            break;
        }
      });
      return chartData;
    },
    saveSchemeChart() {
      if (this.graph.save() && this.graph.save() != undefined) {
        let param = {};
        param.schemeChartType = this.nsmmSchemeBaseDataObject.params.relevanceType;
        param.schemeBaseId = this.nsmmSchemeBaseDataObject.params.schemeBaseId;
        param.edges = JSON.stringify(this.graph.save().edges);
        param.nodes = JSON.stringify(this.graph.save().nodes);
        param.combos = JSON.stringify(this.graph.save().combos);

        this.$api.scheme.saveNsmmSchemeChart(param)
      }
    },
    exportSchemeChartImg() {
      this.graph.downloadImage(this.nsmmSchemeBaseDataObject.schemeData.schemeName, "image/png")
    },
    async getSchemeComboRealNodeRelevanceChart(dimension = '') {
      const container = document.getElementById('container');
      // 清空按钮
      const button = container.getElementsByTagName('button');
      if (button.length > 6) {
        button[0].parentNode.removeChild(button[0]);
        button[0].parentNode.removeChild(button[0]);
        button[0].parentNode.removeChild(button[0]);
        button[0].parentNode.removeChild(button[0]);
        button[0].parentNode.removeChild(button[0]);
        button[0].parentNode.removeChild(button[0]);
      }
      if(this.graphDestroy) {
        // 清空画布
        // this.graph.clear();
        // 销毁画布
        this.graph.destroy();
        this.graphDestroy = false;
      }
      this.nsmmSchemeBaseDataObject.form.dimension = dimension;
      this.nsmmSchemeBaseDataObject.spinningLoading = true;
      this.nsmmSchemeBaseDataObject.graphSpinningLoading = false;
      await this.$api.scheme.getSchemeComboRealNodeRelevanceChart(this.nsmmSchemeBaseDataObject.form)
        .then(res => {
          if ((res.data.nodes !== null || res.data.edges !== null) && (res.data.nodes || res.data.edges) && (res.data.nodes.length > 0 || res.data.edges.length > 0)) {
            this.createElementButton(res.data)
          } else {
            this.nsmmSchemeBaseDataObject.graphSpinningLoading = true;
          }
          this.nsmmSchemeBaseDataObject.spinningLoading = false;
        })
        .catch(error => {
          this.nsmmSchemeBaseDataObject.spinningLoading = false;
          return false;
        })
        .finally(() => {
          this.nsmmSchemeBaseDataObject.spinningLoading = false;
          return false;
        });
    }
  }
}
</script>

<style></style>
