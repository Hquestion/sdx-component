import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import TaskRunningLimit from '../components/task-running-limit';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

jest.mock('@sdx/utils/src/api/resource', () => {
    return {
        getResourceConfigDetail() {
            return Promise.resolve({
                maxGpuTime: 36000,
                maxCpuTime: 3600000
            });
        }
    };
});
jest.mock('@sdx/utils/src/helper/shareCenter', () => {
    return {
        getUser() {
            return Promise.resolve({
                userId: '1111'
            });
        }
    };
});

describe('TaskRunningLimit', () => {
    it('test render works', (done) => {
        var wrapper = mount(TaskRunningLimit, {
            localVue
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('el-alert')).toEqual(true);
            expect(wrapper.html()).toContain('单个GPU任务运行时长');
            done();
        }, 500);

    });
});
