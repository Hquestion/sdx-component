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
const TimerRunning = require('../../../components/skyflow/src/running-info/TimerRunning.vue').default;

describe('TimerRunning', () => {

    it('test render works', (done) => {
        const wrapper = mount(TimerRunning, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow', 'timer-running-task-edit'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
                    }
                }
            },
            sync: false
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-timer-running')).toEqual(true);
            expect(wrapper.html()).toContain('执行设置');
            expect(wrapper.html()).toContain('任务名称');
            expect(wrapper.html()).toContain('提交时间');
            expect(wrapper.html()).toContain('状态');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        const wrapper = mount(TimerRunning, {
            localVue,
            stubs: ['sdxu-pagination', 'sdxv-create-workflow', 'timer-running-task-edit'],
            mocks: {
                $route: {
                    params: {
                        id: '1111111'
                    }
                }
            },
            sync: false
        });
        setTimeout(() => {
            expect(wrapper.vm.total).toEqual(1);
            wrapper.destroy();
            done();
        }, 100);
    });
})
