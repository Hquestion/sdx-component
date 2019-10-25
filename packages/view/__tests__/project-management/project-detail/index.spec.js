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
const ProjectDetail = require('../../../components/project-management/src/project-detail/Index.vue').default;

describe('ProjectDetail', () => {
    it('test render works', (done) => {
        var wrapper = mount(ProjectDetail, {
            localVue,
            stubs: ['sdxw-task-running-limit', 'sdxu-pagination', 'SdxuEmpty'],
            mocks: {
                $route: {
                    params: {
                        id: '1111'
                    }
                }
            }
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-project-detail')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-project-detail__create-task');
            expect(wrapper.html()).toContain('模型开发');
            expect(wrapper.html()).toContain('模型训练');
            expect(wrapper.html()).toContain('任务列表');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ProjectDetail, {
            localVue,
            stubs: ['sdxw-task-running-limit', 'sdxu-pagination', 'SdxuEmpty'],
            mocks: {
                $route: {
                    params: {
                        id: '1111'
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.total).toEqual(13);
                wrapper.destroy();
                done();
        }, 100);
    });
});
