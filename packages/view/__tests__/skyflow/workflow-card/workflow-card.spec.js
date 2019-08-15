import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import IconButton from '@sdx/ui/components/icon-button';
import { dateFormatter } from '@sdx/utils/src/helper/transform';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const WorkflowCard = require('../../../components/skyflow/src/workflow-card/WorkflowCard.vue').default;

describe('WorkflowCard', () => {

    it('test prop meta', () => {
        const wrapper = mount(WorkflowCard, {
            localVue,
            propsData: {
                meta: {
                    name: 'name1',
                    isTemplate: true,
                    user: {
                        fullName: 'full name'
                    },
                    createdAt: '2019/08/01',
                    uuid: 'uuid-123',
                    description: 'test description'
                }
            }
        });

        expect(wrapper.find('.sdxv-workflow-card__header--name').text()).toBe('name1');
        expect(wrapper.findAll('.sdxv-workflow-card__info > span').at(0).text()).toBe('full name');
        expect(wrapper.findAll('.sdxv-workflow-card__info > span').at(1).text()).toBe(dateFormatter('2019/08/01'));
        expect(wrapper.find('.sdxv-workflow-card__mask--text').text()).toBe('test description');
    });

    it('test click event', () => {
        const mockFn = jest.fn();
        const wrapper = mount(WorkflowCard, {
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
        expect(mockFn).toHaveBeenCalledTimes(4);
    });

    it('test prop operateType', () => {
        let type = '';
        const mockFn = jest.fn((data) => {
            type = data.type;
        });
        const wrapper = mount(WorkflowCard, {
            localVue,
            propsData: {
                operateType: 'template'
            },
            listeners: {
                operate: mockFn
            }
        });

        wrapper.find('.sdxv-workflow-card__footer--select').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(type).toBe('template');

        wrapper.setProps({
            operateType: 'workflow'
        });
        wrapper.find('.sdxv-workflow-card__footer--select').trigger('click');
        expect(type).toBe('workflow');
    });

    it('test event mouseover and mouseout', () => {
        const wrapper = mount(WorkflowCard, {
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
