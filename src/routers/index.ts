import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    // {   path: '/', redirect: '/'    },
    {   
        path: '/', 
        component: () => import("@/components/base/layout.vue"), 
        children: [
          	{ path: '', component: () => import('pages/home.vue') },
          	{ path: 'sports', component: () => import('pages/sports.vue') },
        ]
    }
]
export default createRouter({
    history: createWebHashHistory(),
    routes
})