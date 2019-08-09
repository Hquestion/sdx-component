import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const FolderSelect = require('../../../components/file/src/popup/FolderSelect').default;

let wrapper = null;

describe('FolderSelect', function () {
    beforeEach(() => {
        wrapper = mount(FolderSelect, {
            localVue,
            propsData: {
                visible: true,
                supportMove: false
            },
            stubs: {
                SdxuDialog: '<div><slot /><slot name="footer"/></div>'
            },
            sync: false
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('不展示移动按钮', () => {
        expect(wrapper.findAll('.sdxu-button').length).toBe(2);
    });

    it('supportMove为true时，展示移动按钮', async () => {
        wrapper.setProps({
            supportMove: true
        });
        await flushPromise();
        expect(wrapper.findAll('.sdxu-button').length).toBe(3);
    });

    it('点击新建按钮时，调用newFolder方法', async () => {
        const fn = jest.fn();
        wrapper.setMethods({
            newFolder: fn
        });
        wrapper.setData({
            newable: true
        });
        await flushPromise();
        wrapper.findAll('.sdxu-button').at(0).trigger('click');
        expect(fn).toBeCalled();
    });

    it('点击移动按钮时，触发move事件', async done => {
        wrapper.setMethods({
            currentNode: () => {
                return {
                    node: {
                        data: {}
                    }
                }
            }
        });
        wrapper.setData({
            newable: true,
            isFolderLegal: true
        });
        wrapper.setProps({
            supportMove: true
        });
        await flushPromise();
        wrapper.findAll('.sdxu-button').at(1).trigger('click');
        expect(wrapper.emitted().move).toBeTruthy();
        done();
    });

    it('点击拷贝按钮时，触发copy事件', async done => {
        wrapper.setMethods({
            currentNode: () => {
                return {
                    node: {
                        data: {}
                    }
                }
            }
        });
        wrapper.setData({
            newable: true,
            isFolderLegal: true
        });
        wrapper.findAll('.sdxu-button').at(1).trigger('click');
        await flushPromise();
        expect(wrapper.emitted().copy).toBeTruthy();
        done();
    });
});
