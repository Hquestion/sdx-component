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
const IconInfo = require('../../../components/image-management/src/image-file-build/Iconinfo').default;
let wrapper = null;
describe('IconInfo', () => {
    beforeEach(() => {
        wrapper = mount(IconInfo, {
            localVue,
            sync: false
        });
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常', () => {
        expect(wrapper.find('.create-image-base-file_tips').exists()).toBeTruthy();
    });
})