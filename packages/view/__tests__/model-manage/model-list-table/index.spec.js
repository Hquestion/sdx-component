import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import { wrap } from 'module';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const ModelListTable = require('../../../components/model-manage/src/model-list-table/Index.vue').default;

describe('ModelListTable', () => {
    it('test render works', (done) => {
        var wrapper = mount(ModelListTable, {
            localVue,
            stubs: ['create-model', 'sdxu-pagination', 'sdxw-share-setting']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-model-list')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-model-list__table');
            expect(wrapper.html()).toContain('全部共享');
            expect(wrapper.html()).toContain('模型描述');
            expect(wrapper.html()).toContain('模型名称');
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ModelListTable, {
            localVue,
            stubs: ['create-model', 'sdxu-pagination', 'sdxw-share-setting']
        });
        setTimeout(() => {
            expect(wrapper.vm.modelList.length).toEqual(3);
            wrapper.destroy();
            done();
        }, 100);
    });

    it('test prop works', (done) => {
        var wrapper = mount(ModelListTable, {
            localVue,
            stubs: ['create-model', 'sdxu-pagination', 'sdxw-share-setting'],
            propsData: {
                modelType: 'PRIVATE',
                name: 'tesla'
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.modelType).toEqual('PRIVATE');
            expect(wrapper.vm.name).toEqual('tesla');
            wrapper.destroy();
            done();
        }, 100);
    });
});
