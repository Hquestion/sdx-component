import Vue from 'vue';
import febAlive from 'feb-alive';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Cache from './views/cache/index';
import A from './views/cache/a';
import B from './views/cache/b';
import C from './views/cache/c';
import Table from './views/cache/table';
import RoleManage from './views/cache/roleManage';
import DialogTest from './views/ui/dialogTest.vue';
import Demo from './views/demo';
import InputDemo from './views/demo/InputDemo';
import PaginationTest from './views/ui/paginationTest.vue';
import BreadcrumbTest from './views/widget/breadcrumbTest.vue';
febAlive.resetHistory();
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                breadcrumb: '首页'
            }
        },
        {
            path: '/Cache',
            name: 'cache',
            component: Cache,
            redirect: '/Cache/a/:id',
            children: [{
                path: 'a/:id',
                component: A,
                meta: {
                    name: 'a',
                    disableCache: false
                }
            },{
                path: 'b',
                component: B,
                meta: {
                    name: 'b'
                }
            },{
                path: 'c',
                component: C,
                meta: {
                    name: 'c'
                }
            },
            {
                path: 'table',
                component: Table,
            },
            {
                path: 'roleManage',
                component: RoleManage,
            }
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/dialogTest',
            name: '对话框',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: DialogTest
        },
        {
            path: '/paginationTest',
            name: '分页',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: PaginationTest
        },
        {
            path: '/breadcrumbTest',
            name: '面包屑',
            component: BreadcrumbTest,
            meta: {
                breadcrumb: '活动管理'
            },
            children: [
                {
                    path: 'b',
                    component: B,
                    name: '活动列表',
                    meta: {
                        breadcrumb: '活动列表'
                    }
                },
                {
                    path: 'c',
                    component: C,
                    meta: {
                        breadcrumb: '活动详情'
                    }
                }
            ]
        }, {
            path: '/demo',
            name: 'demo',
            component: Demo,
            children: [{
                path: 'input',
                component: InputDemo,
                meta: {
                    name: 'input'
                }
            }]
        },
    ]
});
