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
const VersionList = require('../../../components/model-manage/src/version-list-table/VersionList.vue').default;

describe('VersionList', () => {
    it('test render works', (done) => {
        var wrapper = mount(VersionList, {
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
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-version-list')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-version-list__table');
            expect(wrapper.html()).toContain('模型版本列表');
            expect(wrapper.html()).toContain('版本描述');
            expect(wrapper.html()).toContain('版本类型');
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(VersionList, {
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
            expect(wrapper.vm.total).toEqual(6);
            expect(wrapper.vm.isPublishing).toEqual(false);
            expect(wrapper.vm.refreshTimer).not.toEqual(null);
            wrapper.destroy();
            done();
        }, 100);
    });
});
