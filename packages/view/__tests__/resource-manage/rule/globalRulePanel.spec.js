import GlobalRulePanel from '../../../components/resource-manage/src/rule/GlobalRulePanel';
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import ElementUI from 'element-ui';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

let wrapper = null;

describe('RuleForm', () => {
    beforeEach(() => {
        wrapper = mount(GlobalRulePanel, {
            localVue,
            stubs: {
                RuleForm: true
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    it('默认处理只读状态', () => {
        expect(wrapper.find('.global-rule-panel__footer').isVisible()).toBeFalsy();
    });

    it('点击编辑按钮后进入编辑状态', async done => {
        wrapper.find('.sdxu-icon-button').trigger('click');
        await flushPromise();
        setTimeout(() => {
            expect(wrapper.find('.global-rule-panel__footer').isVisible()).toBeTruthy();
            done();
        }, 100);
    });

    it('点击保存按钮调用save回调', async done => {
        wrapper.find('.sdxu-icon-button').trigger('click');
        await flushPromise();
        const saveButton = wrapper.findAll('.global-rule-panel__footer .sdxu-button').at(2);
        const saveCb = jest.fn();
        wrapper.setMethods({
            save: saveCb
        });
        saveButton.trigger('click');
        expect(saveCb).toBeCalled();
        done();
    });

    it('点击取消按钮调用cancel回调', async done => {
        wrapper.find('.sdxu-icon-button').trigger('click');
        await flushPromise();
        const cancelButton = wrapper.findAll('.global-rule-panel__footer .sdxu-button').at(0);
        const cancelCb = jest.fn();
        wrapper.setMethods({
            cancel: cancelCb
        });
        cancelButton.trigger('click');
        expect(cancelCb).toBeCalled();
        done();
    });
});
