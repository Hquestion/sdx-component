import { shallowMount, mount } from '@vue/test-utils';
import flushPromise from 'flush-promises';
import Vue from 'vue'
import ContentPanel from '../components/content-panel';

describe('ContentPanel', () => {
    it('使用title属性渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            propsData: {
                title: 'test title'
            }
        });
        const mainTitle = wrapper.find('.sdxu-content-panel__title span:nth-child(1)');
        expect(mainTitle.text()).toEqual('test title');
    });

    it('使用title slot渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                title: '<span>test title</span>'
            }
        });
        const mainTitle = wrapper.find('.sdxu-content-panel__title span:nth-child(1)');
        expect(mainTitle.html()).toEqual('<span>test title</span>');
    });
    it('不渲染title', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>'
            }
        });
        expect(wrapper.find('.sdxu-content-panel__header').exists()).toBe(false);
    });
    it('subtitle属性渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>'
            },
            propsData: {
                subtitle: 'test subtitle',
                title: 'test title'
            }
        });
        const subTitle = wrapper.find('.sdxu-content-panel__subtitle').text();
        expect(subTitle).toEqual('test subtitle');
    });
    it('全屏渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>'
            },
            propsData: {
                subtitle: 'test subtitle',
                fullscreen: true
            }
        });
        expect(wrapper.classes('sdxu-content-panel--fullscreen')).toBe(true);
    });
    it('标题右部插槽渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>',
                right: '<span>this is right</span>'
            },
            propsData: {
                subtitle: 'test subtitle',
                fullscreen: true
            }
        });
        const right = wrapper.find('.sdxu-content-panel__right');
        expect(right.element.innerHTML).toEqual('<span>this is right</span>');
    });
    it('默认插槽渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>',
                right: '<span>this is right</span>'
            },
            propsData: {
                subtitle: 'test subtitle',
                fullscreen: true
            }
        });
        const main = wrapper.find('.sdxu-content-panel__main');
        expect(main.element.innerHTML).toEqual('<span>test content</span>');
    });
    it('footer插槽渲染', () => {
        const wrapper = shallowMount(ContentPanel, {
            slots: {
                default: '<span>test content</span>',
                right: '<span>this is right</span>',
                footer: '<span>test footer</span>'
            },
            propsData: {
                subtitle: 'test subtitle',
                fullscreen: true
            }
        });
        const main = wrapper.find('.sdxu-content-panel__footer');
        expect(main.element.innerHTML).toEqual('<span>test footer</span>');
    })
});
