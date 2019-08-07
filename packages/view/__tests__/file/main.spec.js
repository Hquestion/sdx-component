import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter({
    routes: [

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
                    query: {},
                    params: {}
                },
                $router: router
            },
            stubs: {
                SdxuContentPanel: '<div><slot /></div>'
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    it('渲染正常', done => {
        console.log(wrapper.html());
        done();
    })
});
