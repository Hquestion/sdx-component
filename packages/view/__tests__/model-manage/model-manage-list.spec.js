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
const ModelManageList = require('../../components/model-manage/src/ModelManageList.vue').default;

describe('ModelManageList', () => {
    it('test render works', (done) => {
        var wrapper = mount(ModelManageList, {
            localVue,
            stubs: ['create-model']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.classes('sdxv-model-management')).toEqual(true);
            expect(wrapper.html()).toContain('sdxv-model-list__table');
            expect(wrapper.html()).toContain('我的共享列表');
            expect(wrapper.html()).toContain('模型描述');
            expect(wrapper.html()).toContain('模型名称');
            done();
        }, 100);
    });

    it('test loading works', (done) => {
        var wrapper = mount(ModelManageList, {
            localVue,
            stubs: ['create-model']
        });
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.vm.modelType).toEqual('ALL');
            wrapper.findAll('.sdxu-tab-radio--regular').at(1).trigger('click');
            setTimeout(() => {
                expect(wrapper.vm.modelType).toEqual('PRIVATE');
                wrapper.destroy();
                done();
            }, 100)
        }, 100);
    });
});
