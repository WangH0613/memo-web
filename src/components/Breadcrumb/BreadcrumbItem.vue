<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <template v-if="item.path === '' && item.meta.title === '网管平台'">
        <span @click="toNINM(routeBaseUrl)" style="cursor: pointer;">{{ item.meta.title }}</span>
      </template>
      <template v-else>
<!--        <router-link-->
<!--          :to="{ path: item.path === '' ? '/' : item.path }"-->
<!--        >-->
          {{ item.meta.title }}
<!--        </router-link>-->
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
  import { mapState } from 'vuex'
  import { OT_TOKEN } from '@/store/mutation-types'
  import storage from 'store'

  export default {
    name: 'BreadcrumbItem',
    data() {
      return {
        breadList: [],
        token: this.$store.getters.token,
        routeBaseUrl: '',
        mode: process.env.NODE_ENV
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      })
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    methods: {
      toNINM(routeBaseUrl) {
        window.open(routeBaseUrl + storage.get(OT_TOKEN), '_self');
      },
      getBreadcrumb() {
        this.breadList = []
        this.routeBaseUrl = ''
        this.$route.matched.forEach(item => {
          if (item.path === '') {
            const mode = process.env.NODE_ENV;
            switch (mode) {
              case 'testccb':
                this.routeBaseUrl = 'http://128.196.136.149:8889/#/mainPage?ot='
                break;
              case 'testccbvt':
                this.routeBaseUrl = 'http://128.196.200.33:9999/#/mainPage?ot='
                break;
              case 'production':
                this.routeBaseUrl = 'http://11.33.30.17:1211/#/mainPage?ot='
                break;
              default:
                this.routeBaseUrl = '';
                break;
            }
          }
          this.breadList.push(item)
        })
      }
    }
  }
</script>

<style scoped></style>
