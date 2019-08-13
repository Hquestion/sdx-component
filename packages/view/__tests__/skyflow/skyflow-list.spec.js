import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const SkyflowList = require('../../components/skyflow/src/SkyflowList.vue').default;

describe('SkyflowList', () => {
    it('test render works', (done) => {
        var wrapper = mount(SkyflowList, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow'],
            mocks: {
                $route: {
                    query: {
                        templateType: ''
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-skyflow')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-skyflow__bottom-panel--content');
            expect(wrapper.html()).toContain('工作流列表');
            expect(wrapper.html()).toContain('私有与共享');
            expect(wrapper.html()).toContain('新建工作流');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(SkyflowList, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow'],
            mocks: {
                $route: {
                    query: {
                        templateType: ''
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.total).toEqual(1);
                wrapper.destroy();
                done();
        }, 100);
    });
});
