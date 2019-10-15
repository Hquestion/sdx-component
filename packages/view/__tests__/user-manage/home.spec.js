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
const Home = require('../../components/user-manage/src/Home').default;
let wrapper = null;
describe('Home', () => {
    beforeEach(() => {
        wrapper = mount(Home, {
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
        expect(wrapper.find('.sdxu-content-panel').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-user-manage').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-user-manage__title').exists()).toBeTruthy()
        expect(wrapper.find('.sdxv-user-manage__table').exists()).toBeTruthy()
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 12 条');
    });

    it('点击新建用户按钮时，弹出新建用户dialog', async done => {
        wrapper.find('.sdxv-user-manage__title--operate > .sdxu-button').trigger('click');
        await flushPromise();
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        expect(wrapper.find('.sdxu-dialog .el-dialog__header').text()).toBe('新建用户');
        done()
    });

    it('点击加入组时，弹出加入组dialog', async done => {
        wrapper.find('.sdxu-icon-button:nth-child(1)').trigger('click');
        await flushPromise();
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        expect(wrapper.find('.sdxu-dialog .el-dialog__header').text()).toBe('加入组设置');
        done()
    });

    it('点击删除时，弹出MessageBox', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.find('.sdxu-icon-button:last-child').trigger('click');
        await flushPromise();
        expect(bodyWrapper.find('.sdxu-message-box').exists()).toBe(true);
        done()
    });
})