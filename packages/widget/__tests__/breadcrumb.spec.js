import Breadcrumb from '../components/breadcrumb';
import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import Vue from 'vue/dist/vue.min';
const localVue = createLocalVue();
localVue.use(VueRouter);

const main = new Vue({
    template: '<div class="main"><Breadcrumb /><router-view /></div>',
    components: {
        Breadcrumb
    }
});
const hello = new Vue({
    template: '<div class="hello">hello</div>'
});

const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: main,
            children: [
                {
                    name: 'path1',
                    path: 'path1',
                    component: hello,
                    meta: {
                        breadcrumb: '路径1',

                    }
                },
                {
                    name: 'path2',
                    path: 'path2',
                    component: hello,
                    meta: {
                        breadcrumb: '路径2',

                    }
                },
                {
                    name: 'path3',
                    path: 'path3',
                    component: hello,
                    meta: {
                        breadcrumb: '路径3',

                    }
                }
            ]
        }
    ]
});

describe('Breadcrumb', () => {
    it('路由跳转时吗，展示面包屑,点击时跳转路由', done => {
        const wrapper = mount(Breadcrumb, {
            mocks: {
                $route: {
                    to: {
                        name: 'path1',
                        path: '/path1',
                        meta: {
                            breadcrumb: '路径1'
                        }
                    }
                },
                $router: router
            }
        });

        wrapper.vm.breadcrumbs = [
            {
                name: 'path1',
                path: '/path1',
                meta: {
                    breadcrumb: '路径1'
                }
            },
            {
                name: 'path2',
                path: 'path2',
                meta: {
                    breadcrumb: '路径2',

                }
            }
        ];
        localStorage.setItem('widget.breadcrumb.history', JSON.stringify(wrapper.vm.breadcrumbs));

        Vue.nextTick(() => {
            expect(wrapper.findAll('.el-breadcrumb__item').length).toBe(2);
            router.push('/path3');
            setTimeout(() => {
                expect(wrapper.findAll('.el-breadcrumb__item').length).toBe(3);
                wrapper.findAll('.el-breadcrumb__inner').at(1).trigger('click');
                setTimeout(() => {
                    expect(wrapper.findAll('.el-breadcrumb__item').length).toBe(2);
                    expect(router.history.current.name).toEqual('path2');
                    done();
                }, 1000);
            }, 1000);
        });
    });

});
