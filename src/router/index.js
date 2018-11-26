import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../page/login.vue'
import home from '../page/home.vue'
import notFound from '../page/404.vue'
import menutab from '../page/menu1/menuTab.vue'
import menutable from '../page/menu2/menuTable.vue'
import consultantList from '../page/canglong/consultantList.vue'
import consultingFieldList from '../page/canglong/consultingFieldList.vue'
import consultantEdit from '../page/canglong/consultantEdit.vue'
import consultingFieldEdit from '../page/canglong/consultingFieldEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: notFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: home,
        name: '藏龙',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
        {
            path: '/consultantList',
            component: consultantList,
            name: '咨询师管理'
        },
        {
            path: '/consultingFieldList',
            component: consultingFieldList,
            name: '咨询领域管理'
        },
        // {
        //     path: '/consultantEdit',
        //     component: consultantEdit,
        //     name: '咨询师编辑'
        // },
        {
            path: '/consultingFieldEdit',
            component: consultingFieldEdit,
            name: '咨询领域编辑'
        }

        ]
    },

    // {
    //     path: '/',
    //     component: home,
    //     name: '导航二',
    //     iconCls: 'el-icon-message',
    //     children: [{
    //             path: '/menutable',
    //             component: menutable,
    //             name: 'Table'
    //         }
    //     ]
    // }
  ]
})
