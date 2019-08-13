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
const ImageTaskTable = require('../../../components/image-management/src/image-task-table/Index').default;
let wrapper = null;
describe('ImageTaskTable', () => {
    beforeEach(() => {
        wrapper = mount(ImageTaskTable, {
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
        expect(wrapper.find('.sdxv-image-task').exists()).toBeTruthy();
        expect(wrapper.find('.content .sdxu-table').exists()).toBeTruthy();
        expect(wrapper.find('.el-pagination__total').text()).toBe('共 66 条');
    });

    it('点击比较时，弹出包详情比较dialog', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.findAll('.sdxu-icon-button').at(0).trigger('click');
        await flushPromise();
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        expect(bodyWrapper.find('.sdxu-dialog .el-dialog__header').text()).toBe('包详情比较');
        done()
    });

    it('点击查看日志时，弹出日志详情dialog', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.find('.sdxu-icon-button:nth-child(2)').trigger('click');
        await flushPromise();
        expect(wrapper.find('.sdxu-dialog').exists()).toBe(true);
        expect(bodyWrapper.find('.sdxu-dialog .el-dialog__header').text()).toBe('日志详情');
        done()
    });

    it('点击删除时，弹出message-box', async done => {
        const bodyWrapper = createWrapper(document.body);
        wrapper.find('.sdxu-icon-button:last-child').trigger('click');
        await flushPromise();
        expect(bodyWrapper.find('.sdxu-message-box').exists()).toBe(true);
        done()
    });
})