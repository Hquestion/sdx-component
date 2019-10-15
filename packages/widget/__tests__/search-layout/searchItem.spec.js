
import SearchItem from '../../components/search-layout/src/SearchItem';
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import ElementUI from 'element-ui';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Search', () => {
    it('test slot', () => {
        const wrapper = shallowMount(SearchItem, {
            slots: {
                default: '<div class="search-item">test form</div>'
            },
            provide: {
                active() {
                    return 'activeValue'
                }
            }
        });
        expect(wrapper.find('.search-item').text()).toEqual('test form');
    });

    it('customize labelWidth', () => {
        const wrapper = shallowMount(SearchItem, {
            localVue,
            propsData: {
                label: '100px'
            },
            slots: {
                default: '<div class="search-item">test form</div>'
            },
            provide: {
                active() {
                    return 'activeValue'
                }
            }
        });
        expect(wrapper.find('el-form-item-stub').attributes('label')).toBe('100px');
    });
})