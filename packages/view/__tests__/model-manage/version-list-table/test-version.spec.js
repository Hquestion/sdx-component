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
const TestVersion = require('../../../components/model-manage/src/version-list-table/TestVersion.vue').default;

describe('TestVersion', () => {
    it('test cancel works', (done) => {
        var wrapper = mount(TestVersion, {
            localVue,
            propsData: {
                visible: true,
                version: {
                    restApi: '1111122223333',
                    uuid: '2121212121'
                }
            },
            attachToDocument: true,
            mocks: {
                $route: {
                    params: {
                        modelId: '11111111111111111'
                    }
                }
            }
        });
        setTimeout(() => {
            wrapper.find('.el-dialog__headerbtn').trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('close')).toBeTruthy();
                expect(wrapper.emitted('update:visible')).toBeTruthy();
                wrapper.destroy();
                done();
            }, 100);
        }, 100);
    });

    it('test render works', (done) => {
        var wrapper = mount(TestVersion, {
            localVue,
            propsData: {
                visible: true,
                version: {
                    restApi: '1111122223333',
                    uuid: '2121212121'
                }
            },
            attachToDocument: true,
            mocks: {
                $route: {
                    params: {
                        modelId: '11111111111111111'
                    }
                }
            }
        });
        setTimeout(() => {
            expect(wrapper.classes('sdxv-test-version')).toEqual(true);
            expect(wrapper.html()).toContain('测试模型版本');
            expect(wrapper.html()).toContain('获取Key');
            expect(wrapper.html()).toContain('测试');
            expect(wrapper.html()).toContain('返回结果');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test getToken works', (done) => {
        var wrapper = mount(TestVersion, {
            localVue,
            propsData: {
                visible: true,
                version: {
                    restApi: '1111122223333',
                    uuid: '2121212121'
                }
            },
            attachToDocument: true,
            mocks: {
                $route: {
                    params: {
                        modelId: '11111111111111111'
                    }
                }
            }
        });
        setTimeout(() => {
            wrapper.findAll('.sdxu-button.sdxu-button--primary').at(0).trigger('click');
            setTimeout(() => {
                expect(wrapper.html()).toContain('token123456');
                wrapper.destroy();
                done();
            }, 100);
        }, 100);
    });
});
