import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
import flushPromise from 'flush-promises';
localVue.use(ElementUI);
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};


mockScript();
const EditUser = require('../../components/user-manage/src/components/EditUser').default;
let wrapper = null;
describe('EditUser', () => {
    beforeEach(() => {
        wrapper = mount(EditUser, {
            localVue,
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

    it('渲染正常', () => {
        expect(wrapper.find('.sdxv-user-manage__userform').exists()).toBeTruthy();
        expect(wrapper.find('.sdxu-dialog').exists()).toBeTruthy();
    });

    it('点击确定按钮，confirm方法被调用', async done => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            confirm: mockFn
        });
        wrapper.find('.sdxu-button:last-child').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });

})