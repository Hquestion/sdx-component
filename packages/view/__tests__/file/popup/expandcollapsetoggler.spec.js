import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

import ExpandCollapseToggler from '../../../components/file/src/popup/ExpandCollapseToggler';

let wrapper = null;

describe('ExpandCollapseToggler', () => {
    beforeEach(() => {
        wrapper = shallowMount(ExpandCollapseToggler, {
            propsData: {
                expanded: false
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('expanded为false时，箭头正常展示，收起状态', () => {
        expect(wrapper.classes('is-reverse')).toBe(false);
        expect(wrapper.text()).toEqual('展开');
    });

    it('点击时，触发更新expanded事件', () => {
        wrapper.trigger('click');
        expect(wrapper.emitted('update:expanded')).toBeTruthy();
    });

    it('expanded为true时，箭头翻转展示，展开状态', async done => {
        wrapper.setProps({
            expanded: true
        });
        await flushPromise();
        expect(wrapper.classes('is-reverse')).toBe(true);
        expect(wrapper.text()).toEqual('收起');
        done();
    })
});
