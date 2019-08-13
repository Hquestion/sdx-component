import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
import SdxuButton from '@sdx/ui/components/button';
localVue.use(ElementUI);
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};


mockScript();
const ImageFileBuild = require('../../../components/image-management/src/image-file-build/Index').default;
let wrapper = null;

describe('ImageFileBuild', () => {
    beforeEach(() => {
        wrapper = mount(ImageFileBuild, {
            localVue,
            stubs: {
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
            },
            sync: false,
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常', () => {
        expect(wrapper.find('.sdxv-image-file').exists()).toBeTruthy();
        expect(wrapper.find('.foot').exists()).toBeTruthy();
    });

    it('点击取消时', async done => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            cancel: mockFn
        });
        await flushPromise();
        wrapper.find('.foot .sdxu-button:first-child').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });

    it('点击保存构建', async done => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            savaBuild: mockFn
        });
        await flushPromise();
        wrapper.find('.foot .sdxu-button:last-child').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });
})