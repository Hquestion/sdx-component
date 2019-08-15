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
const GeneralRunning = require('../../../components/skyflow/src/running-info/GeneralRunning.vue').default;

describe('GeneralRunning', () => {

    it('test render works', (done) => {
        const wrapper = mount(GeneralRunning, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
                    }
                }
            }
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-general-running')).toEqual(true);
            expect(wrapper.html()).toContain('执行方式');
            expect(wrapper.html()).toContain('执行开始时间');
            expect(wrapper.html()).toContain('执行结束时间');
            expect(wrapper.html()).toContain('执行时长');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        const wrapper = mount(GeneralRunning, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
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
})
