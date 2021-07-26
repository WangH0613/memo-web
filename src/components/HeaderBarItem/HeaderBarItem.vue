<template>
  <div>
    <a-layout-header class="nsmm-header-layout">
      <div class="header-left-container">
        <span class="header-title">网络方案管理</span>
      </div>
      <div class="header-right-container right">
        <span class="header-title"
              @click="logOut"
              style="padding-right:20px;color:#FFFFFF">注销</span>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
  import { SIDEBAR_TYPE } from '@/store/mutation-types'

  export default {
    name: 'HeaderBarItem',
    components: { SIDEBAR_TYPE },
    data() {
      return {
        collapsed: this.$store.state.app.sideCollapsed
      }
    },
    methods: {
      changeCollapsed() {
        this.$store.dispatch('setCollapsed', !this.$store.state.app.sideCollapsed)
      },
      logOut: function () {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({ name: 'login' })
        });
      }
    }
  }
</script>

<style lang="less" scoped>

  /deep/ .nsmm-header-layout.ant-layout-header {
    height: 56px;
    background: @primary-color !important;
    line-height: 56px;
    padding: 0 !important;

    .header-left-container {
      float: left;
      width: 200px;
      height: 100%;
      padding-left: 16px;

      .header-logo {
        height: 30px;
      }

      .header-title {
        font-size: 14px;
        color: #FFFFFF;
        margin-left: 4px;
      }

    }

    .header-right-container {
      margin-left: 200px;
      height: 100%;
    }

  }

  .header-menu-fold-outlined {
    color: #ffffff;
    font-size: 16px;
  }

  .header-bar-background .header-title {
    color: #ffffff;
    font-size: 20px;
    margin-left: 10px;
  }
</style>
