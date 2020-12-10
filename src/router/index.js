import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'
import Task from '@/components/Task'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: (to, from, next) => {
            store.getters.checkUser ? next() : next('/login')
        }
    },
    {
        path: '/tasks',
        name: 'Task',
        component: Task,
        beforeEnter: (to, from, next) => {
            store.getters.checkUser ? next() : next('/login')
        }
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Registration',
        name: 'Registration',
        component: Registration
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router