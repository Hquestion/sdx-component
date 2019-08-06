import { shallowMount, mount, createLocalVue} from '@vue/test-utils';
import locale from '@sdx/utils/src/mixins/locale';
import ElementUI from 'element-ui';
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
const localVue = createLocalVue();
localVue.use(ElementUI);
mockScript();
const Authorize = require('../../components/authorize-manage/src/Index').default;

describe('Authorize', () => {
    it('test tabName', done =>{
        const mockFn = jest.fn();
        const wrapper = shallowMount(Authorize, {
            localVue,
            listeners: {
                getPermissions: mockFn
            }
        });
       
        setTimeout(() => {
            expect(wrapper.vm.permissionData.length).toBe(4);
            done();
        }, 1000)
    })
  
})