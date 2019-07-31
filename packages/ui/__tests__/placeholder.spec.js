import { shallowMount } from "@vue/test-utils";
import Placeholder from '../components/placeholder-block';

describe('Placeholder', () => {
    it('default size', () => {
        const wrapper = shallowMount(Placeholder);
        expect(wrapper.classes('sdxu-placeholder-block--regular')).toBe(true);
    });

    it('customize size', () => {
        const wrapper = shallowMount(Placeholder, {
            propsData: {
                size: 'large'
            }
        });
        expect(wrapper.classes('sdxu-placeholder-block--large')).toBe(true);
    });

    it('default color', () => {
        const wrapper = shallowMount(Placeholder, {
            propsData: {
                size: 'large'
            }
        });
        expect(window.getComputedStyle(wrapper.element).backgroundColor).toBe('rgb(250, 251, 252)');
    });

    it('customize color', () => {
        const wrapper = shallowMount(Placeholder, {
            propsData: {
                size: 'large',
                color: 'rgb(255,255,255)'
            }
        });
        expect(window.getComputedStyle(wrapper.element).backgroundColor).toBe('rgb(255, 255, 255)');
    })
});
