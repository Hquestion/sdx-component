import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
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
const TaskCard = require('../../../components/project-management/src/project-detail/TaskCard.vue').default;

describe('TaskCard', () => {

    it('test prop meta', () => {
        const wrapper = mount(TaskCard, {
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

        expect(wrapper.find('.sdxv-task-card__header--name').text()).toBe('name1');
        expect(wrapper.findAll('.sdxv-task-card__info > span').at(0).text()).toBe('full name');
        expect(wrapper.findAll('.sdxv-task-card__info > span').at(1).text()).toBe(dateFormatter('2019/08/01'));
    });

    it('test render works', () => {
        const wrapper = mount(TaskCard, {
            localVue,
            propsData: {
                meta: {
                    name: 'name1',
                    owner: {
                        fullName: 'full name'
                    },
                    createdAt: '2019/08/01',
                    uuid: 'uuid-123',
                    description: 'test description',
                    type: 'CONTAINERDEV',
                    state: 'RUNNING',
                    externalUrl: 'www../dsa//dsa'
                }
            }
        });

        expect(wrapper.find('.sdxv-task-card__link--container').text()).toBe('ContainerDev');
    });

})
