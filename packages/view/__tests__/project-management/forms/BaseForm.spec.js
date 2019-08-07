import BaseForm from '../../../components/project-management/src/forms/BaseForm';
import { shallowMount, mount } from "@vue/test-utils";
import ContentPanel from '@sdx/ui/components/content-panel';
import { t } from '@sdx/utils/src/locale';


describe('BaseForm', () => {
    it('customize title', () => {
        const wrapper = shallowMount(BaseForm, {
            propsData: {
                title: 'abc'
            }
        });
        expect(wrapper.find(ContentPanel).attributes('title')).toBe('abc');
    });

    it('default labelWidth', () => {
        const wrapper = shallowMount(BaseForm);
        expect(wrapper.find('.task-from__btn-box').attributes('style')).toEqual('padding-left: 80px;');
    });

    it('customize labelWidth', () => {
        const wrapper = shallowMount(BaseForm, {
            propsData: {
                labelWidth: 100
            }
        });
        expect(wrapper.find('.task-from__btn-box').attributes('style')).toEqual('padding-left: 100px;');
    });

    it('customize icon', () => {
        const wrapper = shallowMount(BaseForm, {
            propsData: {
                icon: 'aBc'
            }
        });
        expect(wrapper.find('i').classes('aBc')).toBe(true);
    });

    it('default commitTitle', () => {
        const wrapper = mount(BaseForm);
        expect(wrapper.find('.sdxu-button:last-child').text()).toEqual(t('sdxCommon.Confirm'));
    });

    it('customize commitTitle', () => {
        const wrapper = mount(BaseForm, {
            propsData: {
                commitTitle: 'test'
            }
        });
        expect(wrapper.find('.sdxu-button:last-child').text()).toEqual('test');
    });

    it('triggers handleCommit', () => {
        const wrapper = mount(BaseForm);
        const mockFn = jest.fn();
        wrapper.find('.sdxu-button:last-child').vm.$on('click', mockFn);
        wrapper.find('.sdxu-button:last-child').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('form slot is rendered withing BaseForm', () => {
        const wrapper = mount(BaseForm, {
            slots: {
                form: '<div class="sdxv-project-task-form-slot">What an awesome form</div>'
            }
        });
        const formText = wrapper.find('.sdxv-project-task-form-slot').text();
        expect(formText).toEqual('What an awesome form');
    });
})