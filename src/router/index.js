import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            wx: true
        },
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页',
            wx: true
        },
        component: () => import('../views/home/Home.vue')
    },
    {
        path: '/category',
        name: 'category',
        meta: {
            title: '商品分类',
            wx: true
        },
        component: () => import('../views/home/category.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {
            title: '购物车',
            wx: true
        },
        component: () => import('../views/home/cart.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        meta: {
            title: '商品详情',
            wx: true
        },
        component: () => import('../views/home/detail')
    },
    {
        path: '/my',
        name: 'my',
        meta: {
            title: '我的',
            wx: true
        },
        component: () => import('../views/my/user')
    },
    {
        path: '/my/account',
        name: 'account',
        meta: {
            title: '余额',
            wx: true
        },
        component: () => import('../views/my/account')
    },
    {
        path: '/my/Recharge',
        name: 'Recharge',
        meta: {
            title: '充值',
            wx: true
        },
        component: () => import('../views/my/recharge')
    },
    {
        path: '/my/address',
        name: 'addressList',
        meta: {
            title: '地址列表',
            wx: true
        },
        component: () => import('../views/my/addressList')
    },
    {
        path: '/my/addressAdd',
        name: 'addressAdd',
        meta: {
            title: '添加地址',
            wx: true
        },
        component: () => import('../views/my/addressAdd')
    },
    {
        path: '/my/addressEdit/:id',
        name: 'addressEdit',
        meta: {
            title: '修改地址',
            wx: true
        },
        component: () => import('../views/my/addressEdit')
    },
    {
        path: "/order/list/:type?",
        name: "MyOrder",
        meta: {
            title: "我的订单",
            wx: true
        },
        component: () => import("../views/order/MyOrder")
    },
    {
        path: "/order/submit/:id",
        name: "submitOrder",
        meta: {
            title: "提交订单",
            wx: true
        },
        component: () => import("../views/order/submit")
    },
    {
        path: "/order/status",
        name: "StatusOrder",
        meta: {
            title: "订单信息",
            wx: true
        },
        component: () => import("../views/order/status")
    },
    {
        path: '/warn',
        name: 'warn',
        meta: {
            title: ''
        },
        component: () => import('../views/warn/warn')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/my/login')
    },
    {
        path: "*",
        name: "error",
        meta: {
            title: "页面找不到",
        },
        component: () => import('../views/404/404')
    }
]

const router = new VueRouter({
    routes
})

export default router
