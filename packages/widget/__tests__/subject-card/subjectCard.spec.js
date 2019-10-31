import { mount, createLocalVue } from '@vue/test-utils';
import SdxwSubjectCard from '../../components/subject-card/src/SubjectCard';
import Button from '@sdx/ui/components/button';
import ElementUI from 'element-ui';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxwSubjectCard', () => {

    it('test prop meta', () => {
        const wrapper = mount(SdxwSubjectCard, {
            localVue,
            propsData: {
                meta: {
                    iconName: '私有项目',
                    title: 'title',
                    taskNumber: 5,
                    creator: 'edison',
                    createdAt: '2019/08/01',
                    description: 'test description',
                    type: 'project',
                    owner: {
                        uuid: 'uuid-123',
                    }
                }
            }
        });

        expect(wrapper.find('.sdxw-subject-card__icon > div').text()).toBe('私有项目');
        expect(wrapper.find('.sdxw-subject-card__content--info > .left > .title').text()).toBe('title');
        expect(wrapper.find('.sdxw-subject-card__content--info  > .right > div:last-child').text()).toBe(`创建于${dateFormatter('2019/08/01')}`);
        expect(wrapper.find('.sdxw-subject-card__content--description').text()).toBe('test description');
    });

    it('test prop taskType', () => {
        const wrapper = mount(SdxwSubjectCard, {
            localVue,
            propsData: {
                meta: {
                    iconName: '私有项目',
                    title: 'title',
                    taskNumber: 5,
                    creator: 'edison',
                    createdAt: '2019/08/01',
                    description: 'test description',
                    type: 'task',
                    owner: {
                        uuid: 'uuid-123',
                    }
                }
            }
        });

        expect(wrapper.find('.sdxw-subject-card__icon > div').text()).toBe('私有项目');
        expect(wrapper.find('.sdxw-subject-card__content--top > .left > .title').text()).toBe('title');
        expect(wrapper.find('.sdxw-subject-card__content--bottom  > .creator').text()).toBe('edison');
        expect(wrapper.find('.sdxw-subject-card__taskdesc').text()).toBe('test description');
    });

    it('test click event', () => {
        const mockFn = jest.fn();
        const wrapper = mount(SdxwSubjectCard, {
            localVue,
            propsData: {
                meta: {
                    iconName: '私有项目',
                    title: 'title',
                    taskNumber: 5,
                    creator: 'edison',
                    createdAt: '2019/08/01',
                    description: 'test description',
                    type: 'project',
                    owner: {
                        uuid: 'uuid-123',
                    },
                    showEdit: true,
                    showRemove: true
                }
            },
            listeners: {
                operate: mockFn
            }
        });

        wrapper.findAll(Button).trigger('click');
        expect(wrapper.find('.sdx-icon-detail').exists()).toBe(false);
        expect(wrapper.find('.sdx-icon-edit').exists()).toBe(true);
        expect(wrapper.find('.sdx-icon-delete').exists()).toBe(true);
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('test prop cardType', () => {
        const wrapper = mount(SdxwSubjectCard, {
            localVue,
            propsData: {
                operateType: 'template'
            },
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
        const wrapper = mount(SdxwSubjectCard, {
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