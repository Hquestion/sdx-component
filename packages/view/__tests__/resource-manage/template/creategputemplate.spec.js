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

const CreateGpuTemplate = require('../../../components/resource-manage/src/template/CreateGpuTemplate').default;

let wrapper = null;
describe('CreateGpuTemplate', () => {

    beforeEach(() => {
        wrapper = mount(CreateGpuTemplate, {
            localVue,
            propsData:{
                visible: true,
            },
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
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
                label: '',
                count: 1
            }
        });
        await flushPromise();
        const bodyWrapper = createWrapper(document.body);
        const fn = jest.fn(() => {
            return Promise.resolve()
        });
        const cancel = jest.fn(() => {
            return Promise.resolve()
        });
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
