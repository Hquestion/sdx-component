import ResourceCard from '../../../components/resource-manage/src/template/ResourceCard';
import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
const localVue = createLocalVue();
import ElementUI from 'element-ui';
localVue.use(ElementUI);
import IconButton from '@sdx/ui/components/icon-button';
import sinon from "sinon";
import flushPromise from 'flush-promises';

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

    it('渲染正常', () => {
        expect(wrapper.find('.sdx-cpu-dashboard').exists()).toBeTruthy();
        expect(wrapper.find('.sdx-icon-GPU-dashboard').exists()).toBeFalsy();

        expect(wrapper.classes('is-cpu')).toBe(true);
        expect(wrapper.findAll('.detail .cate-group').at(0).find('.cate-type').text()).toEqual('CPU');
        expect(wrapper.findAll('.detail .cate-group').at(0).find('.cate-count').text()).toEqual('1核');
        expect(wrapper.findAll('.detail .cate-group').at(1).find('.cate-type').text()).toEqual('内存');
        expect(wrapper.findAll('.detail .cate-group').at(1).find('.cate-count').text()).toEqual('1G');
        expect(wrapper.find(IconButton).exists()).toBe(true);
    });

    it('触发删除', done => {
        wrapper.find(IconButton).trigger('click');
        setTimeout(() => {
            const dialogWrapper = createWrapper(document.body);
            expect(dialogWrapper.find('.sdxu-message-box').exists()).toBe(true);
            dialogWrapper.findAll('.sdxu-button').at(1).trigger('click');
            flushPromise().then(res => {
                expect(wrapper.emitted().delete).toBeTruthy();
                done();
            });
        }, 500);
    });
});
