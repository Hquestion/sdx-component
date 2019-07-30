import Empty from '../components/empty';
import { shallowMount } from "@vue/test-utils";

describe('Empty', () => {
    it('渲染emptyType=noData', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'noData'
            }
        });
        expect(wrapper.find('use[xlink:href="#sdx-wushuju"]').exists()).toBe(true);
    });
    it('渲染emptyType=noSearchResult', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'noSearchResult'
            }
        });
        expect(wrapper.find('use[xlink:href="#sdx-wusousuojieguo"]').exists()).toBe(true);
    });
    it('渲染emptyType=noFound', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'noFound'
            }
        });
        expect(wrapper.find('use[xlink:href="#sdx-icon-test"]').exists()).toBe(true);
    });
    it('渲染emptyContent', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'test',
                emptyContent: 'test content'
            }
        });
        expect(wrapper.find('.sdxu-empty__desc').text()).toEqual('test content');
    });
    it('渲染size', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'test',
                emptyContent: 'test content',
                size: 'normal'
            }
        });
        expect(wrapper.find('svg').classes('sdxu-empty--normal')).toBe(true);
    });
    it('slot优先渲染', () => {
        const wrapper = shallowMount(Empty, {
            propsData: {
                emptyType: 'test',
                emptyContent: 'test content',
                size: 'normal'
            },
            slots: {
                default: '<div>no data!</div>'
            }
        });
        expect(wrapper.find('.sdxu-empty__desc').element.innerHTML).toEqual('<div>no data!</div>');
    })
});
