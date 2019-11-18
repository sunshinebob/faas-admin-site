<template>
  <div class="sideItem">
    <el-submenu :index="resolvePath(item.path)" v-if="item.children" popper-append-to-body>
      <template slot="title" v-if="item.meta">
        <i :class="item.meta.icon ? item.meta.icon : ''"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--  递归调用子组件    -->
      <sidebar-item v-for="cItem in item.children" :key="cItem.path" :item="cItem" :basePath="item.path"></sidebar-item>
    </el-submenu>
    <page-link v-else :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)" v-if="item.meta">
        <i :class="item.meta.icon ? item.meta.icon : ''"></i>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </page-link>
  </div>
</template>

<script>
  import PageLink from './Link'
  import { isAbsolutePath } from '@/utils/validate'
  import path from 'path'
  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    methods: {
      resolvePath(router) {
        if (isAbsolutePath(router)) {
          return router
        }
        if (isAbsolutePath(this.basePath)) {
          return this.basePath
        }
        return path.join(this.basePath, router)
      }
    },
    components: {
      PageLink
    }
  }
</script>
