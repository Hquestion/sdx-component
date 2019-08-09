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

const UserGroup = require('../../components/user-group/src/UserGroup').default;

let wrapper = null;

describe('UserGroup', () => {
    beforeEach(() => {
        wrapper = mount(UserGroup, {
            localVue,
            sync: false,
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true
            }
        })
    });

    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常', () => {
        expect(wrapper.find('.sdxu-content-panel').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-user-group').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-user-group__table').exists()).toBeTruthy()
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 4 条');
    });

    it('点击创建用户组时，弹出创建用户组弹框，点击取消时，弹框隐藏', async done => {
        await flushPromise();
        wrapper.find('.sdxv-user-group__bar .sdxu-button').trigger('click');
        await flushPromise();
        expect(wrapper.find('.sdxu-dialog .el-dialog__header').text().includes('创建')).toBe(true)
        wrapper.find('.sdxu-button--default').trigger('click');
        await flushPromise(); 
        expect(wrapper.find('.sdxu-dialog').attributes('style')).toEqual('display: none;');
        done();
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

    it('点击搜索按钮时,page 置1, 调用fetchData', async done => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            fetchData: mockFn
        });
        await flushPromise();
        wrapper.find('.sdxw-search-layout .sdxu-button').trigger('click');
        await flushPromise(); 
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.page).toBe(1);
        done()
    });

});
