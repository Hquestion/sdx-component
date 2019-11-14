import { mount, createLocalVue } from '@vue/test-utils';
import SdxwCreateProjectCard from '../components/create-project-card'
import ElementUI from 'element-ui';
import { dateFormatter } from '@sdx/utils/src/helper/transform';
import SdxuButton from '@sdx/ui/components/button';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxwCreateProjectCard', () => {
    it('test prop meta', () => {
        const wrapper = mount(SdxwCreateProjectCard, {
            localVue,
            propsData: {
                meta: {
                    name: 'edison',
                    owner: {
                        fullName: 'fullname'
                    },
                    createdAt: '2019/08/01',
                    uuid: 'uuid12'
                }
            }
        });
        expect(wrapper.find('.sdxw-create-project-card__header').text()).toBe('edison');
        expect(wrapper.findAll('.sdxw-create-project-card__info > span').at(1).text()).toBe('fullname');
        expect(wrapper.find('.time > span:last-child').text()).toBe(dateFormatter('2019/08/01'))
    });

    it('test click event', () => {
        const mockFn = jest.fn();
        const wrapper = mount(SdxwCreateProjectCard, {
            localVue,
            listeners: {
                operate: mockFn
            }
        });

        wrapper.findAll(SdxuButton).trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
})