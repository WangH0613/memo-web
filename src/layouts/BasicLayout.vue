<template>
  <div style="height:100%;">
    <a-layout class="pub-layout-container">
      <!--      <header-bar-item/>-->
      <a-layout>
        <left-bar-item/>
        <a-layout-content
          class="main-layout-container">
          <breadcrumb-item/>
          <router-view class="mt16"/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
  import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'
  import HeaderBarItem from '../components/HeaderBarItem/HeaderBarItem'
  import LeftBarItem from '../components/LeftBarItem/LeftBarItem'
  import BreadcrumbItem from '../components/Breadcrumb/BreadcrumbItem'

  export default {
    name: 'BasicLayout',
    components: { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE, HeaderBarItem, LeftBarItem, BreadcrumbItem },
    computed: {
      clientHeight: function () {
        return document.body.clientHeight - 125 + 'px'
      }
    }
  }
</script>
<style scoped>
  .pub-layout-container {
    width: 100%;
    height: 100%;
  }

  .main-layout-container {
    /*height: calc(100vh - 56px);*/
    height: 100%;
    padding: 16px 24px;
    overflow-y: scroll;
  }

  /deep/ .ant-layout {
    background: #FFFFFF;
  }

  .mt-24 {
    margin-top: 24px;
  }
</style>
