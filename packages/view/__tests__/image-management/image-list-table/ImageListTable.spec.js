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
const ImageListTable = require('../../../components/image-management/src/image-list-table/Index.vue').default;

describe('ImageListTable', () => {
    it('test render works', (done) => {
        var wrapper = mount(ImageListTable, {
            localVue,
            stubs: ['sdxw-share-setting', 'SdxvPackageDetailDialog', 'sdxu-pagination']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-image-list')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-image-list__table');
            expect(wrapper.html()).toContain('构建方式');
            expect(wrapper.html()).toContain('创建时间');
            expect(wrapper.html()).toContain('镜像种类');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ImageListTable, {
            localVue,
            stubs: ['sdxw-share-setting', 'SdxvPackageDetailDialog', 'sdxu-pagination']
        });
        setTimeout(() => {
            expect(wrapper.vm.total).toEqual(3);
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test prop works', (done) => {
        var wrapper = mount(ImageListTable, {
            localVue,
            stubs: ['sdxw-share-setting', 'SdxvPackageDetailDialog', 'sdxu-pagination'],
            propsData: {
                imageKind: 'basic',
                name: 'searchname',
                shareType: 'private'
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.imageKind).toEqual('basic');
            expect(wrapper.vm.name).toEqual('searchname');
            expect(wrapper.vm.shareType).toEqual('private');
            wrapper.destroy();
            done();
        }, 100);
    });
});
