import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import 'babel-polyfill';
const localVue = createLocalVue();
import ElementUI from 'element-ui';
localVue.use(ElementUI);
import sinon from "sinon";
import flushPromise from 'flush-promises';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const List = require('../../../components/resource-manage/src/template/List').default;

let wrapper = null;

describe('List', () => {
    beforeEach(() => {
        wrapper = mount(List, {
            localVue,
            stubs: {
                'el-select': true,
                'el-option': true
            }
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常', () => {
        expect(wrapper.find('.sdxu-content-panel__title').text()).toEqual('资源模板');
        expect(wrapper.findAll('.template-list .resource-card').length).toBe(3);
    });

    it('点击创建CPU模板，弹出CPU模板创建dialog', async done => {
        wrapper.findAll('.sdxu-button__dropdown--main .sdxu-button').at(0).trigger('click');
        await flushPromise();
        const bodyWrapper = createWrapper(document.body);
        expect(bodyWrapper.find('.sdxv-cpu-template').exists()).toBe(true);
        done();
    });

    it('点击创建GPU模板，弹出GPU模板创建dialog', async done => {
        wrapper.findAll('.sdxu-button__dropdown--main .sdxu-button').at(1).trigger('click');
        await flushPromise();
        const bodyWrapper = createWrapper(document.body);
        expect(bodyWrapper.find('.sdxv-gpu-template').exists()).toBe(true);
        done()
    });
});
