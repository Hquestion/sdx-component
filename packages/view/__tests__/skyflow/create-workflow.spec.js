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
const CreateWorkflow = require('../../components/skyflow/src/CreateWorkflow.vue').default;

describe('CreateWorkflow', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
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
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-create-workflow')).toEqual(true);
            expect(wrapper.html()).toContain('新建工作流');
            expect(wrapper.html()).toContain('批处理');
            expect(wrapper.html()).toContain('流处理');
            expect(wrapper.html()).toContain('共享设置');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
        });
        wrapper.setData({
            workflowForm: {
                processType: 'PATCH',
                name: '111111111111',
                description: '22222222222',
                users: [],
                groups: [],
                isTemplate: false,
                skyflowTemplate: ''
            }
        })
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

    it('test editing works', (done) => {
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true,
                data: {}
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('编辑工作流');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test copy create works', (done) => {
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true,
                createType: 'workflow'
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('私有工作流');
            expect(wrapper.html()).toContain('共享工作流');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test template create works', (done) => {
        var wrapper = mount(CreateWorkflow, {
            localVue,
            propsData: {
                visible: true,
                createType: 'template'
            },
            attachToDocument: true,
            stubs: ['el-select', 'sdxw-select-group-user']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.html()).toContain('请输入工作流名称');
            wrapper.destroy();
            done();
        }, 100);
    });

});
