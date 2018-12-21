// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router';
import ElementUI from 'element-ui';
import VueAreaLinkage from 'vue-area-linkage';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import store from './store/store';
import axios from 'axios';

// import { quillEditor } from 'vue-quill-editor'
// import VueQuillEditor from 'vue-quill-editor'
// import VueAxios from 'vue-axios';
//
// Vue.use(VueAxios, axios)
// Axios.defaults.baseURL = '/api'
// var VueQuillEditor = require('vue-quill-editor')

Vue.prototype.$axios=axios;
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueAreaLinkage);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({
            path: '/login'
        });
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
