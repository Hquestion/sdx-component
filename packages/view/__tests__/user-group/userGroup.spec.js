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


});
