jest.mock('../../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import ElementUI from 'element-ui';
import SdxvAddPackage from '../../../components/image-management/src/image-build-basic/AddPackage';
import ElRadioGroup from 'element-ui/lib/radio-group';
import ElRadio from 'element-ui/lib/radio';
import ElSelect from 'element-ui/lib/select';
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import ElFormItem from 'element-ui/lib/form-item';
import Vue from 'vue/dist/vue.min';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvAddPackage', () => {

    it('test prop queryCount', () => {
        const wrapper = shallowMount(SdxvAddPackage, {
            localVue,
            propsData: {
                queryCount: 2
            }
        });
        wrapper.setData({
            packageInfo: {
                name: 'test-package-info-name'
            }
        });
        expect(wrapper.find('.sdxv-add-package__warning-tips').isVisible()).toBe(true);

        wrapper.setProps({
            queryCount: 0
        });
        expect(wrapper.find('.sdxv-add-package__warning-tips').isVisible()).toBe(false);
    })

    it('test dom render when change source type', done => {
        const vm = new Vue({
            template: '<div><SdxvAddPackage /></div>',
            components: {
                SdxvAddPackage
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        const sourceTypeUrlWrapper = wrapper.findAll(ElFormItem).at(2);

        expect(sourceTypeUrlWrapper.find(ElSelect).exists()).toBe(false);
        expect(sourceTypeUrlWrapper.find(SdxuInput).exists()).toBe(false);

        wrapper.setData({
            packageInfo: {
                sourceUrlType: 'SELECTED'
            }
        });
        setTimeout(() => {
            expect(sourceTypeUrlWrapper.find(ElSelect).exists()).toBe(true);
            expect(sourceTypeUrlWrapper.find(SdxuInput).exists()).toBe(false);

            wrapper.setData({
                packageInfo: {
                    sourceUrlType: 'USER_DEFINED'
                }
            });
            setTimeout(() => {
                expect(sourceTypeUrlWrapper.find(ElSelect).exists()).toBe(false);
                expect(sourceTypeUrlWrapper.find(SdxuInput).exists()).toBe(true);
                done();
            }, 300);
        }, 300);
    })

    it('test dom render when change version', done => {
        const vm = new Vue({
            template: '<div><SdxvAddPackage /></div>',
            components: {
                SdxvAddPackage
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        const versionWrapper = wrapper.findAll(ElFormItem).at(3);

        expect(versionWrapper.find(SdxuInput).exists()).toBe(false);

        wrapper.setData({
            packageInfo: {
                versionType: 'USER_DEFINED'
            }
        })
        setTimeout(() => {
            expect(versionWrapper.find(SdxuInput).exists()).toBe(true);
            done();
        }, 300);
    })

    it('test add package event when click confirm button', done => {
        const vm = new Vue({
            template: '<div><SdxvAddPackage /></div>',
            components: {
                SdxvAddPackage
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        
        const mockFn = jest.fn();
        wrapper.find(SdxvAddPackage).setMethods({
            handleCommitUpdate: mockFn
        });

        setTimeout(() => {
            wrapper.find(SdxuButton).vm.$emit('click');
            expect(mockFn).toBeCalled();
            done();
        }, 300);
    })

    it('test urlOptions when change sourceType', done => {
        const wrapper = shallowMount(SdxvAddPackage, {
            localVue
        });

        setTimeout(() => {
            expect(wrapper.vm.urlOptions.length).toBe(4);

            wrapper.setData({
                packageInfo: {
                    sourceType: 'CONDA'
                }
            });
            expect(wrapper.vm.urlOptions.length).toBe(1);
            done();
        }, 300);
    })
})