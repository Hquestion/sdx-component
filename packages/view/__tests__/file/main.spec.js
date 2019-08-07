import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

const Dexie = require('dexie');
Dexie.dependencies.indexedDB = require('fake-indexeddb');
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

const router = new VueRouter({
    routes: [
        {
            name: 'test-file',
            path: '/test-file',
            component: Main
        }
    ]
});

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const Main = require('../../components/file/src/Main').default;

let wrapper = null;

describe('Main', () => {
    beforeEach(() => {
        wrapper = mount(Main, {
            localVue,
            mocks: {
                $route: {
                    name: 'test-file',
                    query: {},
                    params: {}
                },
                $router: router
            },
            stubs: {
                SdxuContentPanel: '<div><slot /></div>',
                transition: false
            },
            sync: false
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    // 单元测试不便对路由跳转做测试，故这里只测试页面渲染

    it('渲染正常', async done => {
        expect(wrapper.find('.sdxv-operation-bar').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file-breadcrumb-bar').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file-table').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file-task').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file-task').isVisible()).toBe(false);
        await flushPromise();
        expect(wrapper.find('.loaded-tip').text().indexOf('103') > 0).toBe(true);
        const list = await wrapper.vm.db.list.offset(0).limit(1000).toArray();
        expect(wrapper.find('.sdxv-file-table .sdxv-file-table__checkbar').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file-table .sdxv-file-table__checkbar').isVisible()).toBe(false);
        expect(list.length).toBe(5);
        expect(list[0].name).toEqual('我的共享');
        expect(list[4].name).toEqual('file2');
        setTimeout(() => {
            expect(wrapper.findAll('.sdxv-file-table .sdxu-table tbody .sdxv-file__item').length).toBe(5);
            done();
        }, 1000);
    });
});
