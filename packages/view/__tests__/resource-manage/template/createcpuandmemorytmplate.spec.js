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

const CreateCpuAndMemoryTemplate = require('../../../components/resource-manage/src/template/CreateCPUAndMemoryTemplate').default;

let wrapper = null;
describe('CreateCpuAndMemoryTemplate', () => {

    beforeEach(() => {
        wrapper = mount(CreateCpuAndMemoryTemplate, {
            localVue,
            propsData:{
                visible: true,
            },
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true
            }
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('点击按钮触发回调', async done => {
        await flushPromise();
        wrapper.setData({
            formData: {
                cpu: 2,
                memory: 3
            }
        });
        await flushPromise();
        const bodyWrapper = createWrapper(document.body);
        const fn = jest.fn();
        const cancel = jest.fn();
        wrapper.setMethods({
            handleConfirm: fn,
            handleCancel: cancel
        });
        bodyWrapper.findAll('.sdxu-button').at(1).trigger('click');
        await flushPromise();
        expect(fn).toBeCalled();
        bodyWrapper.findAll('.sdxu-button').at(0).trigger('click');
        await flushPromise();
        expect(cancel).toBeCalled();
        done();
    });
});
