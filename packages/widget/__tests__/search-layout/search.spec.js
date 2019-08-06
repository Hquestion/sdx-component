import Search from '../../components/search-layout/src/Search';
import SearchItem from '../../components/search-layout/src/SearchItem';
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import ElementUI from 'element-ui';
import { t } from '@sdx/utils/src/locale';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Search', () => {
    it('test slot', () => {
        const wrapper = mount(Search, {
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.search-item').text()).toEqual('test form');
    });

    
    it('customize labelWidth', () => {
        const wrapper = mount(Search, {
            localVue,
            propsData: {
                labelWidth: '100px'
            },
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.el-form').vm.labelWidth).toBe('100px');
    });

    it('default block', () => {
        const wrapper = shallowMount(Search, {
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout').classes('sdxw-search-layout--block')).toBe(true);
    });
    
    it('customize block', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const wrapper = shallowMount(Search, {
            propsData: {
                block: randomBoo
            },
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout').classes('sdxw-search-layout--block')).toBe(randomBoo);
    });

    it('default align', () => {
        const wrapper = shallowMount(Search, {
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout').classes('sdxw-search-layout--align-left')).toBe(true);
    });

    it('customize align', () => {
        const randomBoo = ['left', 'right'][Math.floor(Math.random()*2)];
        const wrapper = shallowMount(Search, {
            propsData: {
                align: randomBoo
            },
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout').classes(`sdxw-search-layout--align-${randomBoo}`)).toBe(true);
    });

    it('triggers a click event when a handleSearch method is called', () => {
        const wrapper = mount(Search, {
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        const mockFn = jest.fn();
        wrapper.vm.$on('search', mockFn);
        wrapper.find('.sdxu-button:first-child').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted().search).toBeTruthy()
    });

    it('triggers a click event when a handleReset method is called', () => {
        const wrapper = mount(Search, {
            slots: {
                default: '<div class="search-item">test form</div><div class="search-item">test form</div><div class="search-item">test form</div>'
            }
        });
        const mockFn = jest.fn();
        wrapper.vm.$on('reset', mockFn);
        wrapper.find('.sdxw-search-layout__btn .sdxu-button:last-child').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(wrapper.emitted().reset).toBeTruthy()
    });

    it('Show reset when slots are longer than 2', () => {
        const wrapper = mount(Search, {
            slots: {
                default: '<div class="search-item">test form</div><div class="search-item">test form</div><div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout__btn .sdxu-button:last-child').text()).toBe(t('sdxCommon.Reset'));
    });

    it('Hidden reset when slots length is less than 2', () => {
        const wrapper = mount(Search, {
            slots: {
                default: '<div class="search-item">test form</div>'
            }
        });
        expect(wrapper.find('.sdxw-search-layout__btn .sdxu-button:last-child').text()).toBe(t('sdxCommon.Search'));
    });
})