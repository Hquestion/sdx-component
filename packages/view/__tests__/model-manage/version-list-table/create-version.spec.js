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
const CreateVersion = require('../../../components/model-manage/src/version-list-table/CreateVersion.vue').default;

describe('CreateVersion', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(CreateVersion, {
            localVue,
            propsData: {
                visible: true,
                editingVersion: null
            },
            attachToDocument: true,
            stubs: ['SdxwFileSelect', 'el-select', 'el-option', 'ResourceConfig']
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
        var wrapper = mount(CreateVersion, {
            localVue,
            propsData: {
                visible: true,
                editingVersion: null
            },
            attachToDocument: true,
            stubs: ['SdxwFileSelect', 'el-select', 'el-option', 'ResourceConfig']
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-create-version')).toEqual(true);
            expect(wrapper.html()).toContain('新增模型版本');
            expect(wrapper.html()).toContain('发布环境');
            expect(wrapper.html()).toContain('模型路径');
            expect(wrapper.html()).toContain('版本类型');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(CreateVersion, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select', 'el-option'],
            mocks: {
                $route: {
                    params: {
                        modelId: '11111'
                    }
                }
            }
        });
        wrapper.setData({
            versionInfoForm: {
                description: "",
                framework: "TENSORFLOW",
                modelPath: "/新建文件夹55",
                name: "11111111111111",
                runtimeImage: "tensorflow_deployment_cpu:1.0",
                runtimeResource: {cpuObj: {cpu: 1, memory: 2, uuid: "1-2"}, gpuObj: {}, cpu: 1000, memory: 2147483648}
            }
        })
        setTimeout(() => {
            wrapper.findAll('.sdxu-button.sdxu-button--primary').at(2).trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('close')).toBeTruthy();
                // expect(wrapper.emitted('update:visible')).toBeTruthy();
                wrapper.destroy();
                done();
            }, 100);
        }, 100);
    });

    it('test editing works', (done) => {
        var wrapper = mount(CreateVersion, {
            localVue,
            propsData: {
                visible: true,
                editingVersion: {}
            },
            attachToDocument: true,
            stubs: ['SdxwFileSelect', 'el-select', 'el-option', 'ResourceConfig']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('编辑版本');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test publishing works', (done) => {
        var wrapper = mount(CreateVersion, {
            localVue,
            propsData: {
                visible: true,
                editingVersion: {},
                isPublishing: true
            },
            attachToDocument: true,
            stubs: ['SdxwFileSelect', 'el-select', 'el-option', 'ResourceConfig']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('发布版本');
            wrapper.destroy();
            done();
        }, 100);
    });
});
