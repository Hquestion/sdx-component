import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
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
const Authorize = require('../../components/authorize-manage/src/Index').default;
let wrapper = null;
describe('Authorize', () => {
    beforeEach(() => {
        wrapper = mount(Authorize, {
            localVue,
            stubs: {
                'el-form': true,
                'el-form-item': true
            },
            sync: false
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常', () => {
        expect(wrapper.find('.sdxu-content-panel').exists()).toBeTruthy();
        expect(wrapper.find('.sdxu-content-panel .is-active').text()).toBe('用户授权列表');
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 100 条');
    });

    it('点击编辑时，弹出dialog', async done => {
        wrapper.findAll('.sdxu-icon-button').at(0).trigger('click');
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        done()
    });

    it('点击删除时，弹出dialog, 点击取消时，弹框隐藏', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.find('.sdxu-icon-button:last-child').trigger('click');
        expect(bodyWrapper.find('.sdxu-message-box').exists()).toBe(true);
        wrapper.find('.sdxu-button--default').trigger('click'); 
        expect(wrapper.find('.sdxu-dialog').attributes('style')).toEqual('display: none;');
        done()
    });

    it('点击新建按钮时，弹出dialog, 点击取消时，弹框隐藏', async done => {
        wrapper.find('.addAuth').trigger('click');
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        wrapper.find('.sdxu-button--default').trigger('click'); 
        expect(wrapper.find('.sdxu-dialog').attributes('style')).toEqual('display: none;');
        done()
    });
})