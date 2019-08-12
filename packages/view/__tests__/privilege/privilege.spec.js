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
const Privilege = require('../../components/privilege/src/Privilege').default;
let wrapper = null;
describe('Authorize', () => {
    beforeEach(() => {
        wrapper = mount(Privilege, {
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
        expect(wrapper.find('.sdxv-privilege-system__search').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-privilege-system').exists()).toBeTruthy();
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 66 条');
    });

    it('点击搜索按钮时,page 置1, 调用fetchData', () => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            fetchData: mockFn
        });
        wrapper.setData({
            page: 3
        });
        wrapper.find('.sdxv-privilege-system__search--button').trigger('click');
        expect(mockFn).toBeCalled();
        expect(wrapper.vm.page).toBe(1);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

})