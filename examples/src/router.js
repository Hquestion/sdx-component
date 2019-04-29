import Vue from 'vue';
import febAlive from 'feb-alive';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Cache from './views/cache/index';
import A from './views/cache/a';
import B from './views/cache/b';
import C from './views/cache/c';
import Comp from './views/cache/comp';
import DialogTest from './views/ui/dialogTest.vue';
febAlive.resetHistory();
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
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
            },{
                path: 'comp',
                component: Comp
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
        }
    ]
});
