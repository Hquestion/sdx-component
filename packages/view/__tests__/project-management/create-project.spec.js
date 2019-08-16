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
const CreateProject = require('../../components/project-management/src/CreateProject.vue').default;

describe('CreateProject', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
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
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-create-project')).toEqual(true);
            expect(wrapper.html()).toContain('新建项目');
            expect(wrapper.html()).toContain('协作者/组');
            expect(wrapper.html()).toContain('项目描述');
            expect(wrapper.html()).toContain('项目名称');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
        });
        wrapper.setData({
            projectForm: {
                name: '11111111111',
                description: '22222222222',
                member: '',
                isTemplate: false
            },
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
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true,
                data: {}
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('编辑项目');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test copy create works', (done) => {
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true,
                createType: 'project'
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('自建项目');
            expect(wrapper.html()).toContain('协作项目');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test template create works', (done) => {
        var wrapper = mount(CreateProject, {
            localVue,
            propsData: {
                visible: true,
                createType: 'template'
            },
            attachToDocument: true,
            stubs: ['sdxw-select-group-user', 'sdxu-empty']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.html()).not.toContain('请输入项目名称');
            wrapper.destroy();
            done();
        }, 100);
    });

});

