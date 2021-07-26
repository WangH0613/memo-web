<template>
  <a-layout-sider
    class="head-left-container"
    :collapsed="this.$store.state.app.sideCollapsed"
    :trigger="null"
    :collapsible="true"
  >
    <a-menu
      style="height: 100%"
      :open-keys="openKeys"
      mode="inline"
      @openChange="onOpenChange"
    >
      <template v-for="(menu, key) in menus">
        <template v-if="menu.children">
          <a-sub-menu :key="key">
            <span slot="title">
              <a-icon :type="menu.meta.icon"/>
              <span>{{ menu.meta.title }}</span>
            </span>
            <a-menu-item v-for="(item, index) in menu.children" :key="index + '1' + key">
              <router-link :to="item.path">
                {{ item.meta && item.meta.title || '' }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="key">
            <router-link :to="menu.path">
              <a-icon :type="menu.meta.icon"/>
              {{menu.meta.title}}
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'LeftBarItem',
    data() {
      return {
        menus: [],
        selectedKeys: [ '1' ],
        openKeys: [ 'sub1' ],
        preOpenKeys: [ 'sub1' ],
        testComponent: 'AppstoreOutlined',
        rootSubmenuKeys: [ 'sub1', 'sub2' ]
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      }),
      clientHeight: function () {
        return document.body.clientHeight - 56 + 'px'
      }
    },
    created() {
      const routes = this.mainMenu.find(item => item.path === '/')
      this.menus = (routes && routes.children) || []
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys
        } else {
          this.openKeys = latestOpenKey ? [ latestOpenKey ] : []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .head-left-container {
    /*overflow-y: scroll;*/
    /*height: calc(100vh - 56px);*/
    height: 100%;
    width: 255px !important;
    min-width: 255px !important;
  }

  /deep/ .ant-menu {
    /*background: #F1F4FA;*/
    /*background: #F6F6F6;*/
    background: #FFFFFF;

    .ant-menu-sub {
      /*background: #F1F4FA;*/
      background: #FFFFFF;

      .ant-menu-item::after {
        border: none;
      }

      .ant-menu-item-selected::after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: none;
        border-right: 3px solid @primary-color !important;
      }

      .ant-menu-item-selected {
        //background: #FFFFFF;
        font-weight: bold;
        color: @primary-color;

        .router-link-active {

        }
      }
    }
  }
</style>
