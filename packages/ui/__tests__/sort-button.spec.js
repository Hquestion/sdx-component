import { shallowMount } from '@vue/test-utils';
import SortButton from '../components/sort-button';
import Button from '../components/button';
import Vue from 'vue';
Vue.component(SortButton.name, SortButton);

describe('SortButton', () => {
    it('render SortButton with title', () => {
        const wrapper = shallowMount(SortButton, {
            propsData: {
                title: 'abc'
            }
        });
        expect(wrapper.text()).toBe('abc')
    });

    it('render SortButton with order', () => {
        const wrapper = shallowMount(SortButton, {
            propsData: {
                order: 'desc'
            }
        });
        expect(wrapper.find('.sdx-Paixu1').classes('is-active')).toBe(true)
    });

    it('triggers order', () => {
        const wrapper = shallowMount(SortButton);
        // 创建mock fn
        const mockFn = jest.fn()
        // 设置 Wrapper vm 的方法并强制更新。
        wrapper.setMethods({ sortChange: mockFn })
         // 触发按钮的点击事件 sortChange被分发
        wrapper.vm.$on('sortChange', mockFn);
        wrapper.find(Button).trigger('click');
    });
})