// eslint-disable-next-line
import { BasicLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
};

// 基础路由
export const constantRouterMap = [
  {
    path: '/nsmm',
    redirect: '/workspace'
  },
  {
    path: '/nsmm/itsm',
    redirect: '/itsm'
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
];

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '网管平台' },
    redirect: '/workspace',
    children: [
      {
        path: '/workspace',
        component: () => import('@/views/workspace/total'),
        meta: { title: '概览', icon: 'home', permission: [ 'dashboard' ] }
      },
      {
        path: '/model',
        name: 'model',
        component: RouteView,
        meta: { title: '模型', icon: 'branches', permission: [ 'table' ] },
        children: [
          {
            path: '/model/model',
            name: 'modelIndex',
            hideChildrenInMenu: true,
            component: () => import('@/views/model/model/index'),
            meta: { title: '模型管理', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/model/combo',
            name: 'comboIndex',
            hideChildrenInMenu: true,
            component: () => import('@/views/model/combo/index'),
            meta: { title: '套餐管理', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/model/technical',
            name: 'technicalIndex',
            hideChildrenInMenu: true,
            component: () => import('@/views/model/technical/index'),
            meta: { title: '技术属性管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/scheme',
        name: 'scheme',
        component: RouteView,
        redirect: '/scheme/index',
        meta: { title: '方案', icon: 'cluster', permission: [ 'table' ] },
        children: [
          {
            path: '/scheme/index',
            name: 'SchemeIndex',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/scheme/index'),
            meta: { title: '方案管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/device',
        name: 'device',
        component: RouteView,
        redirect: '/device/index',
        meta: { title: '已纳管设备', icon: 'cluster', permission: [ 'table' ] },
        children: [
          {
            path: '/device/index',
            name: 'DeviceIndex',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/device/index'),
            meta: { title: '设备管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/server',
        name: 'server',
        component: RouteView,
        redirect: '/server/index',
        meta: { title: '服务器管理', icon: 'cluster', permission: [ 'table' ] },
        children: [
          {
            path: '/server/index',
            name: 'ServerIndex',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/server/index'),
            meta: { title: '服务器接入模型', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/hardware',
        name: 'hardware',
        component: RouteView,
        redirect: '/hardware/index',
        meta: { title: '标配库', icon: 'cluster', permission: [ 'table' ] },
        children: [
          {
            path: '/hardware/index',
            name: 'HardwareIndex',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/hardware/index'),
            meta: { title: '标配库管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      {
        path: '/manufacturer',
        name: 'manufacturer',
        component: RouteView,
        redirect: '/manufacturer/index',
        meta: { title: '设备厂商', icon: 'cluster', permission: [ 'table' ] },
        children: [
          {
            path: '/manufacturer/index',
            name: 'ManufacturerIndex',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/manufacturer/index'),
            meta: { title: '厂商管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '@/views/exception/404', hidden: true
  }
]

export const itsmRouterMap = [
  {
    path: '/itsm',
    name: 'itsmIndex',
    component: () => import('@/views/itsm/index')
  }
];