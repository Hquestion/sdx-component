import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvAllTaskList = require('../../components/resource-statistics/src/AllTaskList').default;
const SdxwTaskResourceList = require('@sdx/widget/components/task-list').default;

describe('SdxvAllTaskList', () => {

    it('render', () => {
        const vm = new Vue({
            template: '<div><SdxvAllTaskList /></div>',
            components: {
                SdxvAllTaskList
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);

        expect(wrapper.find(SdxwTaskResourceList).exists()).toBe(true);
    })

});
