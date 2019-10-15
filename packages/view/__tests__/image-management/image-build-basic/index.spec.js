jest.mock('../../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';
import ElFormItem from 'element-ui/lib/form-item';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvImageBuildBasic = require('../../../components/image-management/src/image-build-basic/index').default;

describe('SdxvImageBuildBasic', () => {

    it('test prop imageId, and test method fetch data', done => {
        const wrapper = shallowMount(SdxvImageBuildBasic, {
            propsData: {
                imageId: 'test-image-id'
            }
        });

        expect(wrapper.vm.imageInfo.baseImage).toEqual('test-image-id');

        setTimeout(() => {
            expect(wrapper.vm.baseInfo.name).toBeTruthy();
            expect(wrapper.vm.name_prefix === wrapper.vm.baseInfo.name + '_').toBe(true);
            done();
        }, 300);
    })

    it('test click add package button', done => {
        const wrapper = shallowMount(SdxvImageBuildBasic, {
            localVue,
            propsData: {
                imageId: 'test-image-id'
            }
        });

        expect(wrapper.vm.showAddPackageForm).toBe(false);
        wrapper.find('.sdxv-image-build-basic__add-package--button').trigger('click')
        expect(wrapper.vm.showAddPackageForm).toBe(true);
        setTimeout(() => {
            wrapper.find('.sdxv-image-build-basic__add-package--button').find(SdxuButton).vm.$el.click();
            expect(wrapper.vm.showAddPackageForm).toBe(false);
            done();
        }, 300);
    })

    it('test event when click save and cancel button', () => {
        const wrapper = shallowMount(SdxvImageBuildBasic, {
            localVue,
            propsData: {
                imageId: 'test-image-id'
            }
        });

        const handleCancel = jest.fn();
        const handleSaveAndBuild = jest.fn();

        wrapper.setMethods({
            handleCancel,
            handleSaveAndBuild
        });

        const wrapperArray = wrapper.findAll(ElFormItem).at(5).findAll(SdxuButton);
        wrapperArray.wrappers.forEach(w => {
            w.vm.$emit('click');
        });

        expect(handleCancel).toBeCalled();
        expect(handleSaveAndBuild).toBeCalled();
    })
})