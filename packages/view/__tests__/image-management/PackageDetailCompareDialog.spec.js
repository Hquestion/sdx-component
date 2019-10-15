jest.mock('../../../utils/src/api/image');

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

const SdxvPackageDetailCompareDialog = require('../../components/image-management/src/PackageDetailCompareDialog').default;

describe('SdxvBuildLogDialog', () => {

    it('test prop imageBuilder, visible', () => {
        const wrapper = shallowMount(SdxvPackageDetailCompareDialog, {
            localVue,
            propsData: {
                imageBuilder: {
                    baseImage: {
                        uuid: 'test-image-builder-id-sfdaf343',
                        name: 'test-image-name'
                    }
                },
                visible: true
            }
        });

        expect(wrapper.vm.imageId).toEqual('test-image-builder-id-sfdaf343');
        expect(wrapper.vm.basicImageName).toEqual('test-image-name');
        expect(wrapper.vm.title.includes('test-image-name'));
    })
});
