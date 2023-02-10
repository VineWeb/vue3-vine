<script lang="ts" setup>
import { useRoute } from "vue-router";
import {
  UnorderedListOutlined,
  FileTextOutlined,
  TrophyOutlined,
  SmileOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  EyeOutlined,
  HeartOutlined,
  FolderAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
const route =  useRoute()
const list = [
  { id: "0", name: "首页", link: "/", icon: UnorderedListOutlined },
  { id: "1", name: "体育", link: "/sports", icon: TrophyOutlined },
  { id: "2", name: "书籍", link: "/books", icon: BookOutlined },
  { id: "3", name: "音乐", link: "/music", icon: CustomerServiceOutlined },
  { id: "4", name: "精美摘记", link: "/extract", icon: HeartOutlined },
  { id: "5", name: "资讯", link: "/info", icon: EyeOutlined },
  { id: "6", name: "图标", link: "/chart", icon: FolderAddOutlined },
  { id: "7", name: "历史", link: "/history", icon: FileTextOutlined },
  { id: "8", name: "其他", link: "/other", icon: SmileOutlined },
];
const sidebarIndex = list.findIndex(item => item.link === route.path)+''

const selectedKeys = ref([sidebarIndex]);
const collapsed = ref(false);
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider
      class="layout-left"
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
    >
      <div class="logo">Vine</div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
        <a-menu-item v-for="item in list" :key="item.id">
          <component :is="item.icon"></component>
          <span class="menu-name">
            <router-link :to="item.link">
            {{ item.name }}
          </router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="layout-right">
      <a-layout-header class="layout-right-top">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content class="layout-body">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.layout {
  background-color: #fff;
  height: 100%;

  .layout-left {
    background-color: #fff;
    height: 100%;

    .logo {
      height: 64px;
      line-height: 64px;
      text-align: center;
    }

    .menu-name {
      margin-left: 5px;
    }
  }
  .layout-right-top {
    background-color: #fff;
    padding: 0;
  }
  .layout-body {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}

</style>
