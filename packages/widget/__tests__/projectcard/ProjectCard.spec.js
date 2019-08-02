import { mount, createLocalVue } from '@vue/test-utils';
import SdxwProjectCard from '../../components/projectcard/src/ProjectCard';
import IconButton from '@sdx/ui/components/icon-button';
import ElementUI from 'element-ui';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxwProjectCard', () => {

    it('test prop meta', () => {
        const wrapper = mount(SdxwProjectCard, {
            localVue,
            propsData: {
                meta: {
                    name: 'name1',
                    isTemplate: true,
                    owner: {
                        fullName: 'full name'
                    },
                    createdAt: '2019/08/01',
                    uuid: 'uuid-123',
                    description: 'test description'
                }
            }
        });

        expect(wrapper.find('.sdxw-project-card__header--name').text()).toBe('name1');
        expect(wrapper.find('.sdxw-project-card__header--type').exists()).toBe(true);
        expect(wrapper.findAll('.sdxw-project-card__info > span').at(0).text()).toBe('full name');
        expect(wrapper.findAll('.sdxw-project-card__info > span').at(1).text()).toBe(dateFormatter('2019/08/01'));
        expect(wrapper.find('.sdxw-project-card__mask--text').text()).toBe('test description');
    });

    it('test prop viewAble, editAble, deleteAble, and click event', () => {
        const mockFn = jest.fn();
        const wrapper = mount(SdxwProjectCard, {
            localVue,
            propsData: {
                viewAble: false,
                editAble: true,
                deleteAble: true
            },
            listeners: {
                operate: mockFn
            }
        });

        wrapper.findAll(IconButton).trigger('click');
        expect(wrapper.find('.sdx-icon-detail').exists()).toBe(false);
        expect(wrapper.find('.sdx-icon-edit').exists()).toBe(true);
        expect(wrapper.find('.sdx-icon-delete').exists()).toBe(true);
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('test prop operateType', () => {
        let type = '';
        const mockFn = jest.fn((data) => {
            type = data.type;
        });
        const wrapper = mount(SdxwProjectCard, {
            localVue,
            propsData: {
                operateType: 'template'
            },
            listeners: {
                operate: mockFn
            }
        });

        wrapper.find('.sdxw-project-card__footer--select').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(type).toBe('template');

        wrapper.setProps({
            operateType: 'project'
        });
        wrapper.find('.sdxw-project-card__footer--select').trigger('click');
        expect(type).toBe('project');
    });

    it('test event mouseover and mouseout', () => {
        const wrapper = mount(SdxwProjectCard, {
            localVue,
            propsData: {
                meta: {
                    description: 'test'
                }
            }
        });

        wrapper.trigger('mouseover');
        expect(wrapper.vm.showMask).toBe(true);
        expect(wrapper.vm.showMask).toBe(true);
        wrapper.trigger('mouseout');
        expect(wrapper.vm.showMask).toBe(false);

        wrapper.setProps({
            meta: {}
        });

        wrapper.trigger('mouseover');
        expect(wrapper.vm.showMask).toBe(false);
    });
})