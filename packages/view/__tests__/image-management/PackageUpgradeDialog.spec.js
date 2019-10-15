jest.mock('../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import ElRadio from 'element-ui/lib/radio';
import SdxuInput from '@sdx/ui/components/input';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvPackageUpgradeDialog = require('../../components/image-management/src/PackageUpgradeDialog').default;
const SdxuDialog = require('@sdx/ui/components/dialog').default;


describe('SdxvPackageUpgradeDialog', () => {

    it('test props currentPackage, and visible', done => {
        const wrapper = mount(SdxvPackageUpgradeDialog, {
            localVue,
            propsData: {
                currentPackage: {
                    name: "Babel",
                    sourceType: "PIP",
                    uuid: "84ba8a2d-71ef-4781-953d-008d67c0449a",
                    version: "2.6.0",
                    versionType: 'LATEST'
                },
                visible: true
            }
        });
        setTimeout(() => {
            expect(wrapper.find('.sdxv-package-upgrade-dialog__form').exists()).toBe(true);

            wrapper.findAll(ElRadio).at(1).find('input').setChecked();
            expect(wrapper.vm.currentPackage.versionType).toEqual('USER_DEFINED');
            done();
        }, 300);
    })
});
