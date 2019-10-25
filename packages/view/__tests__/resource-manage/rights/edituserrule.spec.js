import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const EditUserRule = require('../../../components/resource-manage/src/rights/EditUserRule').default;

let wrapper = null;

describe('EditUserRule', () => {
    beforeEach(() => {
        wrapper = mount(EditUserRule, {
            propsData: {
                meta: undefined,
                visible: true,
                readonly: false
            },
            sync: false,
            stubs: {
                transition: false,
                RuleForm: '<div class="rule-form"></div>'
            }
        })
    });

    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染为新增', async done => {
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().indexOf('新增') >=0 ).toBe(true);
        const fn = jest.fn(() => Promise.resolve());
        wrapper.setMethods({
            handleConfirm: fn
        });
        const buttonWrapper = domWrapper.findAll('.sdxu-button').at(1).trigger('click');
        expect(domWrapper.find('.sdxu-user-avatar').exists()).toBe(false);
        expect(fn).toBeCalled();
        done();
    });

    it('渲染为查看', async done => {
        await flushPromise();
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
        wrapper = mount(EditUserRule, {
            propsData: {
                meta: {
                    user: {
                        uuid: '1',
                        fullName: 'test'
                    }
                },
                visible: true,
                readonly: true
            },
            sync: false,
            stubs: {
                transition: false,
                RuleForm: '<div class="rule-form"></div>'
            }
        });
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().indexOf('查看') >=0 ).toBe(true);
        expect(domWrapper.find('.sdxu-user-avatar').exists()).toBe(true);
        expect(domWrapper.find('.sdxu-user-avatar').isVisible()).toBe(true);
        done();
    });

    it('渲染为编辑', async done => {
        await flushPromise();
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
        wrapper = mount(EditUserRule, {
            propsData: {
                meta: {
                    user: {
                        uuid: '1',
                        fullName: 'test'
                    }
                },
                visible: true,
                readonly: false
            },
            sync: false,
            stubs: {
                transition: false,
                RuleForm: '<div class="rule-form"></div>'
            }
        });
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().indexOf('编辑') >=0 ).toBe(true);
        expect(domWrapper.find('.sdxu-user-avatar').exists()).toBe(true);
        expect(domWrapper.find('.sdxu-user-avatar').isVisible()).toBe(true);
        done();
    });
});
