import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'babel-polyfill';
import 'jest-canvas-mock';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const TaskDetailView = require('../../../components/task-management/src/task-detail/TaskDetailView').default;
const TaskDetail = require('../../../components/task-management/src/task-detail/TaskDetail').default;

describe('TaskDetailView', () => {

    it('dom render', () => {
        const wrapper = mount(TaskDetailView, {
            localVue,
            propsData: {
                taskId: 'test-task-idxxx'
            },
            stubs: {
                'el-select': true,
                'el-option': true
            }
        });

        expect(wrapper.find(TaskDetail).exists()).toBeTruthy();
    })

    it('test method getTaskInfo', done => {
        const wrapper = mount(TaskDetailView, {
            localVue,
            propsData: {
                taskId: 'test-task-idxxx'
            },
            stubs: {
                'el-select': true,
                'el-option': true
            }
        });

        setTimeout(() => {
            expect(wrapper.vm.task).not.toEqual(null);
            done();
        }, 300);
    })
})