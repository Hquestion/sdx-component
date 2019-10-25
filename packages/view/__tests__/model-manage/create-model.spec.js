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
const CreateModel = require('../../components/model-manage/src/CreateModel.vue').default;

describe('CreateModel', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(CreateModel, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select']
        });
        setTimeout(() => {
            console.log(wrapper.html());
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
        var wrapper = mount(CreateModel, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select']
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-create-model')).toEqual(true);
            expect(wrapper.html()).toContain('新建模型');
            expect(wrapper.html()).toContain('模型标签');
            expect(wrapper.html()).toContain('模型描述');
            expect(wrapper.html()).toContain('模型名称');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(CreateModel, {
            localVue,
            propsData: {
                visible: true
            },
            attachToDocument: true,
            stubs: ['el-select']
        });
        wrapper.setData({
            modelInfoForm: {
                name: '111',
                description: '2222',
                labels: ['111', '222']
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
        var wrapper = mount(CreateModel, {
            localVue,
            propsData: {
                visible: true,
                editingModel: {}
            },
            attachToDocument: true,
            stubs: ['el-select']
        });
        setTimeout(() => {
            expect(wrapper.html()).toContain('编辑模型');
            wrapper.destroy();
            done();
        }, 100);
    });
});
