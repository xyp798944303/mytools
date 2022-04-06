import Vue from 'vue'
import VueRouter, { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../views/HelloWorld.vue'
import PeoplePosition from '../views/PeoplePosition/PageIndex.vue'
import LocationAnalysis from '../views/LocationAnalysis/PageIndex.vue'
import Home from "../views/Home/index.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: {
            name: 'login'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: HelloWorld
    },
    {
        path: "/page",
        component: Home,
        children: [
            {
                path: "people",
                component: PeoplePosition
            },
            {
                path: "locationAnalysis",
                component: LocationAnalysis
            },
        ]
    }
]
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes
})

export default router
