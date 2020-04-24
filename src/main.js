import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* vant */
import vant from './vant/vant.js'

/* css */
import './assets/css/common.scss'
import {cookie, wxBrowser} from "./assets/js/util";
import {wxService} from "./api/wx/wx";

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}

	if (to.meta.wx) {
		//页面是否登录
        if(!wxBrowser){
            next({
                path: '/warn',
            })
        }else{
            next()
        }
	}
	next()
})
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
