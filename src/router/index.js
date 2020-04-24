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
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		meta: {
			title: '首页',
            wx:true
		},
		component: () => import('../views/home/Home.vue')
	},
	{
		path:'/my',
		name:'my',
		meta:{
			title:'我的',
            wx:true
		},
		component:()=>import('../views/my/user')
	},
    {
      path:'/warn',
      name:'warn',
      meta: {
          title:''
      },
        component:()=>import('../views/warn/warn')
    },
	{
		path:'/login',
		name:'login',
		meta:{
			title:'登录',
		},
		component:()=>import('../views/my/login')
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
