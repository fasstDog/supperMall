import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast/index'

// 解决移动端300ms延迟
// 1.npm install fastclick --save
// 2.导入
import FastClick from 'fastclick'

// 图片懒加载
// 1.npm install vue-lazyload --save
// 2.导入
import VueLazyLoad from 'vue-lazyload'

// px-to-vm-css
// 1.npm install  postcss-px-to-viewport --save-dev
// 2.修改postcss.config.js


Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()
    // 下载toast插件
Vue.use(toast)

//3. 解决移动端300ms延迟
FastClick.attach(document.body)

// 3.使用图片懒加载
Vue.use(VueLazyLoad, {
        // 传入占位图
        loading: require('assets/img/common/placeholder.png')
    })
    // 4.要使用的地方将src变更为 v-lazy

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')