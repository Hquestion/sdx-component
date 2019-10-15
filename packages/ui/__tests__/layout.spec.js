import { shallowMount } from "@vue/test-utils";
import Layout from '../components/layout';

describe('Layout', () => {
    it('align属性渲染', () => {
        const wrapper = shallowMount(Layout, {
            align: 'center'
        });
        expect(wrapper.classes('sdxu-layout--center')).toBe(true);
    });

    it('valign属性渲染', () => {
        const wrapper = shallowMount(Layout, {
            valign: 'center'
        });
        expect(wrapper.classes('sdxu-layout--v-center')).toBe(true);
    });
});
