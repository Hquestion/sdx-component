import ResourceCard from '../../../components/resource-manage/src/template/ResourceCard';
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
const localVue = createLocalVue();
import ElementUI from 'element-ui';
localVue.use(ElementUI);
import IconButton from '@sdx/ui/components/icon-button';

let wrapper = null;

describe('ResourceCard', () => {
    beforeEach(() => {
        wrapper = mount(ResourceCard, {
            localVue,
            propsData: {
                type: 'CPU',
                count: [1,1]
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    it('渲染正常', done => {
        expect(wrapper.find('.sdx-cpu-dashboard').exists()).toBeTruthy();
        expect(wrapper.find('.sdx-icon-GPU-dashboard').exists()).toBeFalsy();

        expect(wrapper.classes('is-cpu')).toBe(true);
        expect(wrapper.findAll('.detail .cate-group').at(0).find('.cate-type').text()).toEqual('CPU');
        expect(wrapper.findAll('.detail .cate-group').at(0).find('.cate-count').text()).toEqual('1核');
        expect(wrapper.findAll('.detail .cate-group').at(1).find('.cate-type').text()).toEqual('内存');
        expect(wrapper.findAll('.detail .cate-group').at(1).find('.cate-count').text()).toEqual('1G');
        expect(wrapper.find(IconButton).exists()).toBe(true);
        expect(wrapper.find(IconButton).isVisible()).toBe(false);
        wrapper.element.dispatchEvent('mouseover');
        setTimeout(() => {
            expect(wrapper.find(IconButton).isVisible()).toBe(true);
            wrapper.find(IconButton).trigger('click');
            setTimeout(() => {

            });
            done();
        }, 100)
    });
});
