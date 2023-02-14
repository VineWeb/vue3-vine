
<script lang="ts" setup>
import { defineAsyncComponent , ref } from 'vue';
//  同步加载
// import basketball from './basketball.vue';
// import football from './football.vue';
// import pingpong from './pingpong.vue';

const activeKey = ref('1')
// 异步加载
const basketball  = defineAsyncComponent(() => import('./basketball.vue'));
const football  = defineAsyncComponent(() => import('./football.vue'));
const pingpong  = defineAsyncComponent(() => import('./pingpong.vue'));
interface listTpye {
   id: string,
   name: string,
   comp: any
}
const list: listTpye[] = [
   {id: '0', name: '篮球', comp: basketball},
   {id: '1', name: '足球', comp: football},
   {id: '2', name: '乒乓球', comp: pingpong},
]
</script>
<template>
   <a-tabs v-model:activeKey="activeKey">
     <a-tab-pane :tab="item.name" v-for="item in list" :key="item.id">
      <component :is="item.comp"></component>
      </a-tab-pane>
   </a-tabs>
 </template>
 
 