// 引用全局reset.css
import './css/reset.css'

//引用框架脚本
import Vue from 'vue'
import axios from './axios/axios'
import app from './app'
import router from './routes/routes'
import store from './store/store'

new Vue({
    el: '.container',
    render: c => c(app),
    router: router,
    store: store
})
if (module.hot) {
    module.hot.accept()
}