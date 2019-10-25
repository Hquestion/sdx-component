import { shallowMount, mount, createLocalVue, createWrapper } from '@vue/test-utils';
import ElementUI from 'element-ui';
import SdxuInput from '../components/input';
import ElInput from 'element-ui/lib/input';
import Vue from 'vue/dist/vue.min';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxuInput', () => {
    it('test type search', () => {
        const wrapper = mount(SdxuInput, {
            propsData: {
                type: 'search'
            }
        });
        expect(wrapper.find('.sdx-icon-search').exists()).toBe(true);
    });

    it('test event when set type search and prop searchable', () => {
        const mockFn = jest.fn();
        const wrapper = mount(SdxuInput, {
            localVue,
            propsData: {
                type: 'search',
                searchable: true
            },
            listeners: {
                search: mockFn
            }
        });
        wrapper.find('.sdx-icon-search').trigger('click');
        // wrapper.find(ElInput).trigger('keydown.enter');
        wrapper.find({ ref: 'input' }).trigger('keydown.enter');
        // blur
        wrapper.vm.$refs.input.focus();
        wrapper.vm.$refs.input.blur();
        
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(3);
    });

    it('test passwordVisibleness and passwordStrength', () => {
        const wrapper = mount(SdxuInput, {
            propsData: {
                type: 'password',
                passwordVisibleness: true,
                passwordStrength: true,
                value: '1df',
            }
        });

        expect(wrapper.find('.sdx-icon-eye-open').exists()).toBe(true);
        expect(wrapper.find('.sdx-icon-eye-close').exists()).toBe(false);
        expect(wrapper.find('.sdxu-input__pwd-strength').exists()).toBe(true);
    });

    it('test prop size and inline', () => {
        const wrapper = mount(SdxuInput, {
            propsData: {
                size: 'small',
                inline: true
            }
        });

        expect(wrapper.find('.sdxu-input--small').exists()).toBe(true);
        expect(wrapper.find('.is-inline').exists()).toBe(true);

        wrapper.setProps({
            size: 'regular',
            inline: false
        });

        expect(wrapper.find('.sdxu-input--small').exists()).toBe(false);
        expect(wrapper.find('.sdxu-input--regular').exists()).toBe(true);
        expect(wrapper.find('.is-inline').exists()).toBe(false);
    })
})