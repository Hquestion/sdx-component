jest.mock('../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import SdxvModifiedPackageList from '../../components/image-management/src/ModifiedPackageList';
import SdxuIconButton from '@sdx/ui/components/icon-button';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvModifiedPackageList', () => {

    it('test props and dom render, and button click', done => {
        const mockFn = jest.fn();
        const wrapper = mount(SdxvModifiedPackageList, {
            localVue,
            propsData: {
                installPackages: [{
                    name: "Babel",
                    sourceType: "PIP",
                    uuid: "84ba8a2d-71ef-4781-953d-008d67c0449a",
                    version: "2.6.0"
                }],
                uninstallPackages: [{
                    name: "Click",
                    sourceType: "PIP",
                    uuid: "5cfda0d3-0bac-4ab5-a996-e6be5800dba6",
                    version: "7.0"
                }],
                upgradePackages: [{
                    name: "Cython",
                    sourceType: "PIP",
                    uuid: "2ef368e2-54e7-4eae-a4c5-4ffc492f60fb",
                    version: "0.28.5"
                }],
                operatable: true
            },
            listeners: {
                cancelModifyPackage: mockFn
            }
        });

        setTimeout(() => {
            expect(wrapper.find('.sdxv-modified-list').exists()).toBe(true);
            expect(wrapper.find(SdxuIconButton).exists()).toBe(true);
            expect(wrapper.vm.modifyPackageList.length).toEqual(3);

            wrapper.find(SdxuIconButton).trigger('click');
            expect(mockFn).toBeCalled();

            wrapper.setProps({
                operatable: false
            });
            expect(wrapper.find(SdxuIconButton).exists()).toBe(false);

            done();
        }, 300);
    })
});
