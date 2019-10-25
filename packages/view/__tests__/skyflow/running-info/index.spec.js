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
const RunningInfo = require('../../../components/skyflow/src/running-info/Index.vue').default;

describe('RunningInfo', () => {

    it('test render works', (done) => {
        const wrapper = mount(RunningInfo, {
            localVue,
            stubs: ['el-select', 'el-option', 'general-running', 'timer-running'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-running-info')).toEqual(true);
            expect(wrapper.html()).toContain('运行记录');
            expect(wrapper.html()).toContain('请选择执行方式');
            expect(wrapper.html()).toContain('请选择工作流状态');
            expect(wrapper.html()).toContain('结束日期');
            wrapper.destroy();
            done();
        }, 100);

    });

    it('test switch works', (done) => {
        const wrapper = mount(RunningInfo, {
            localVue,
            stubs: ['el-select', 'el-option', 'general-running', 'timer-running'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('执行方式');
            expect(wrapper.html()).toContain('工作流状态');
            expect(wrapper.html()).toContain('执行时间');
            wrapper.findAll('.sdxu-tab-radio--regular').at(1).trigger('click');
            setTimeout(() => {
                expect(wrapper.html()).not.toContain('执行方式');
                expect(wrapper.html()).not.toContain('工作流状态');
                expect(wrapper.html()).not.toContain('执行时间');
                expect(wrapper.html()).toContain('任务名称');
                wrapper.destroy();
                done();
            }, 100)
        }, 100);

    });


})
