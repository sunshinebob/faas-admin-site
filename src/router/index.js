import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
// import { Message } from 'element-ui'
// import getTitle from '@/utils/getTitle'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/account/organization'
  },
  {
    path: '/account',
    name: 'Account',
    component: Layout,
    redirect: '/account/organization',
    meta: {
      title: '账户管理',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/account/organization'),
        meta: {
          title: '单位信息总览'
        }
      },
      {
        path: 'platform-user',
        name: 'PlatformUser',
        component: () => import('@/views/account/platform-user'),
        meta: {
          title: '用户信息总览'
        }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/account/admin'),
        meta: {
          title: '后台账号管理'
        }
      },
      {
        path: 'mobile',
        name: 'Mobile',
        component: () => import('@/views/account/mobile'),
        meta: {
          title: '移动端账号管理'
        }
      }
    ]
  },
  {
    path: '/data',
    name: 'Data',
    component: Layout,
    redirect: '/data/two-dimensional',
    meta: {
      title: '数据管理',
      icon: 'el-icon-s-data'
    },
    children: [
      {
        path: 'two-dimensional',
        name: 'TowDimensional',
        component: () => import('@/views/data/two-dimensional'),
        meta: {
          title: '二维数据'
        }
      },
      {
        path: 'three-dimensional',
        name: 'ThreeDimensional',
        component: () => import('@/views/data/three-dimensional'),
        meta: {
          title: '三维数据'
        }
      },
      {
        path: 'indoor-panorama',
        name: 'IndoorPanorama',
        component: () => import('@/views/data/indoor-panorama'),
        meta: {
          title: '室内全景图'
        }
      },
      {
        path: 'outdoor-panorama',
        name: 'OutdoorPanorama',
        component: () => import('@/views/data/outdoor-panorama'),
        meta: {
          title: '室外全景图'
        }
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/data/video'),
        meta: {
          title: '视频数据'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
