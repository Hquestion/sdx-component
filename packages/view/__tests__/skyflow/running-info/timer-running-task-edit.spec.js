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
const TimerRunningTaskEdit = require('../../../components/skyflow/src/running-info/TimerRunningTaskEdit.vue').default;

describe('TimerRunningTaskEdit', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(TimerRunningTaskEdit, {
            localVue,
            propsData: {
                visible: true,
                data: {
                    crontabName: '',
                    crontab: ''
                }
            },
            attachToDocument: true
        });
        setTimeout(() => {
            wrapper.find('.sdxu-button.sdxu-button--default').trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('close')).toBeTruthy();
                expect(wrapper.emitted('update:visible')).toBeTruthy();
                wrapper.destroy();
                done();
            }, 100);
        }, 100);
    });

    it('test render works', (done) => {
        var wrapper = mount(TimerRunningTaskEdit, {
            localVue,
            propsData: {
                visible: true,
                data: {
                    crontabName: '1111111',
                    crontab: '222222222222'
                }
            },
            attachToDocument: true
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-task-edit')).toEqual(true);
            expect(wrapper.html()).toContain('定时运行设置');
            expect(wrapper.html()).toContain('任务名称');
            expect(wrapper.html()).toContain('触发频率');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(TimerRunningTaskEdit, {
            localVue,
            propsData: {
                visible: true,
                data: {
                    crontabName: '1111111',
                    crontab: '222222222222'
                }
            },
            attachToDocument: true
        });
        setTimeout(() => {
            wrapper.find('.sdxu-button.sdxu-button--primary').trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('close')).toBeTruthy();
                expect(wrapper.emitted('update:visible')).toBeTruthy();
                wrapper.destroy();
                done();
            }, 100);
        }, 100);
    });
});
