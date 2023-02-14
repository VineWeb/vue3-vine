import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    // {   path: '/', redirect: '/'    },
    {   
        path: '/', 
        component: () => import("@/components/base/layout.vue"), 
        children: [
          	{ path: '', component: () => import('pages/home/index.vue') },
          	{ path: 'sports', component: () => import('pages/sports/index.vue') },
        ]
    }
]
export default createRouter({
    history: createWebHashHistory(),
    routes
})