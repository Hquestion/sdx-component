import { shallowMount, mount } from "@vue/test-utils";
import IconButton from '../components/icon-button';
import TextTooltip from '../components/text-tooltip';
import ElementUI from 'element-ui';
import Vue from 'vue';
Vue.use(ElementUI);

describe('IconButton', () => {
    it('属性icon渲染', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test'
            }
        });
        expect(wrapper.find('i').classes()).toEqual(['sdx-icon', 'sdx-icon-test']);
    });
    it('active属性渲染', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test',
                active: true
            }
        });
        expect(wrapper.classes('is-active')).toBe(true);
    });
    it('disable属性渲染', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test',
                disable: true
            }
        });
        expect(wrapper.classes('is-disable')).toBe(true);
    });
    it('size属性渲染', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test',
                disable: true,
                size: 'normal'
            }
        });
        expect(wrapper.classes('sdxu-icon-button--normal')).toBe(true);
    });
    it('title属性渲染', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test',
                disable: true,
                size: 'normal',
                title: 'test'
            }
        });
        expect(wrapper.find(TextTooltip).vm.title).toBe('test');
    });
    it('点击时， 抛出click事件', () => {
        const wrapper = shallowMount(IconButton, {
            propsData: {
                icon: 'sdx-icon sdx-icon-test',
                disable: true,
                size: 'normal',
                title: 'test'
            }
        });
        const mockFn = jest.fn();
        wrapper.vm.$on('click', mockFn);
        wrapper.trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
