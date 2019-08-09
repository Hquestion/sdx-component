jest.mock('../../../../utils/src/api/image');

import { shallowMount, createLocalVue } from '@vue/test-utils';
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

const SdxvPackageDetailDialog = require('../../../components/image-management/src/image-list-table/PackageDetailDialog').default;


describe('SdxvPackageDetailDialog', () => {

    it('test props: basicImageName, imageId and visible', () => {
        const wrapper = shallowMount(SdxvPackageDetailDialog, {
            localVue,
            propsData: {
                imageId: 'test-image-builder-id-sfdaf343',
                basicImageName: 'test-basic-image-name',
                visible: true
            }
        });

        expect(wrapper.vm.imageId).toEqual('test-image-builder-id-sfdaf343');
        expect(wrapper.vm.title.includes('test-basic-image-name')).toBe(true);
        expect(wrapper.vm.visible).toBe(true);
    })
});
