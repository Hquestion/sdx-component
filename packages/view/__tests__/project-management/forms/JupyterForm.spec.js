import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
import flushPromise from 'flush-promises';
import SdxwResourceConfig from '@sdx/widget/components/resource-config';
localVue.use(ElementUI);
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};


mockScript();
const JupyterForm = require('../../../components/project-management/src/forms/JupyterForm').default;
let wrapper = null;
describe('JupyterForm', () => {
    beforeEach(() => {
        wrapper = mount(JupyterForm, {
            localVue,
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
            },
            mocks: {
                $route: {
                    params: {
                        projectId: '123dasd31'
                    }
                }
            }
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常，测试有无uuid时，展示编辑，新建', () => {
        expect(wrapper.find('.sdxu-content-panel').exists()).toBeTruthy();
        expect(wrapper.find('.sdxu-content-panel__title').text().includes('新建')).toBe(true);
        wrapper.setProps({
            task: {
                uuid: '12'
            }
        })
        
        expect(wrapper.find('.sdxu-content-panel__title').text().includes('编辑')).toBe(true);
    });

    it('点击确定按钮，commit方法被调用', async done => {
        const mockFn = jest.fn();
        wrapper.setMethods({
            commit: mockFn
        });
        wrapper.find('.sdxu-button--primary').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });

})