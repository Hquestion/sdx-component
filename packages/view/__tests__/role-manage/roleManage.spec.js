import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
localVue.use(ElementUI);
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};


mockScript();
const RoleManage = require('../../components/role-manage/src/Index').default;
let wrapper = null;
describe('RoleManage', () => {
    beforeEach(() => {
        wrapper = mount(RoleManage, {
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
        expect(wrapper.find('.sdxv-role-manage__table').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-role-manage__header').exists()).toBeTruthy()
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 99 条');
    });

    it('点击编辑时，弹出dialog, 点击取消时，弹框隐藏, ', async done => {
        wrapper.find('.sdxu-icon-button:first-child').trigger('click');
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        wrapper.find('.sdxu-button--default').trigger('click'); 
        expect(wrapper.find('.sdxu-dialog').attributes('style')).toEqual('display: none;');
        done()
    });

    it('点击删除时，弹出dialog, 点击取消时，MessageBox隐藏', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.find('.sdxu-icon-button:last-child').trigger('click');
        expect(bodyWrapper.find('.sdxu-message-box').exists()).toBe(true);
        wrapper.find('.sdxu-button--default').trigger('click'); 
        expect(bodyWrapper.find('.sdxu-message-box').attributes('style')).toEqual('display: none;');
        done()
    });

    it('点击新建角色按钮时，弹出dialog, 点击取消时，弹框隐藏', async done => {
        wrapper.find('.sdxv-role-manage__handle .sdxu-button').trigger('click');
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        wrapper.find('.sdxu-button--default').trigger('click'); 
        expect(wrapper.find('.sdxu-dialog').attributes('style')).toEqual('display: none;');
        done()
    });
})