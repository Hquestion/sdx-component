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
const VersionDetail = require('../../../components/model-manage/src/version-list-table/VersionDetail.vue').default;

describe('VersionDetail', () => {
    it('test render works', (done) => {
        var wrapper = mount(VersionDetail, {
            localVue,
            mocks: {
                $route: {
                    params: {
                        versionId: '11111111111111111'
                    }
                }
            }
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-version-detail')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-info-container');
            expect(wrapper.html()).toContain('运行环境');
            expect(wrapper.html()).toContain('运行时长');
            expect(wrapper.html()).toContain('调用次数');
            expect(wrapper.vm.refreshTimer).not.toEqual(null);
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(VersionDetail, {
            localVue,
            stubs: ['sdxu-pagination', 'create-version', 'test-version', 'SdxwFoldLabel'],
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
