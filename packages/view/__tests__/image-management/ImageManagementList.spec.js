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
const ImageManagementList = require('../../components/image-management/src/ImageManagementList.vue').default;

describe('ImageManagementList', () => {
    it('test render works', (done) => {
        var wrapper = mount(ImageManagementList, {
            localVue,
            stubs: ['image-task-table', 'image-list-table', 'el-select', 'el-option'],
            mocks: {
                $route: {
                    params: {
                        tab: 'imageTab'
                    }
                },
                $router: []
            }
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-image-management')).toEqual(true);
            expect(wrapper.html()).toContain('镜像列表');
            expect(wrapper.html()).toContain('构建任务列表');
            expect(wrapper.html()).toContain('镜像种类');
            expect(wrapper.html()).toContain('基于文件构建');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ImageManagementList, {
            localVue,
            stubs: ['image-task-table', 'image-list-table', 'el-select', 'el-option'],
            mocks: {
                $route: {
                    params: {
                        tab: 'imageTab'
                    }
                },
                $router: []
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.projectType).toEqual('image');
            wrapper.findAll('.sdxu-tab-radio--regular').at(1).trigger('click');
            setTimeout(() => {
                expect(wrapper.vm.projectType).toEqual('task');
                wrapper.destroy();
                done();
            }, 100)
        }, 100);
    });

    it('test switching works', (done) => {
        var wrapper = mount(ImageManagementList, {
            localVue,
            stubs: ['image-task-table', 'el-select', 'el-option'],
            mocks: {
                $route: {
                    params: {
                        tab: 'imageTab'
                    }
                },
                $router: []
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.imageKind).toEqual('all');
            expect(wrapper.html()).toContain('构建方式');
            wrapper.findAll('.el-tabs__item').at(1).trigger('click');
            setTimeout(() => {
                expect(wrapper.vm.imageKind).toEqual('basic');
                expect(wrapper.html()).not.toContain('创建人');
                wrapper.destroy();
                done();
            }, 100)
        }, 100);
    });
});
