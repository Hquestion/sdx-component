jest.mock('../../../utils/src/api/system');

import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import Vue from 'vue/dist/vue.min';
import ElementUI from 'element-ui';
import 'babel-polyfill';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvComponentStateList = require('../../components/component-state/src/ComponentStateList').default;

describe('SdxvComponentStateList', () => {

    it('test prop type', () => {
        const wrapper = shallowMount(SdxvComponentStateList, {
            localVue,
            propsData: {
                type: 'base'
            }
        });
        expect(wrapper.vm.params.namespace).toEqual('kube-system,skydiscovery');

        wrapper.setProps({
            type: 'system'
        });
        expect(wrapper.vm.params.namespace).toEqual('skydiscovery-system');
    })

    it('test method fetchData', done => {
        const wrapper = shallowMount(SdxvComponentStateList, {
            localVue
        });
        setTimeout(() => {
            expect(wrapper.vm.componentList.length > 0).toBe(true);
            done();
        }, 500);
    })

    it('test click log button', done => {
        const vm = new Vue({
            template: '<div><SdxvComponentStateList /></div>',
            components: {
                SdxvComponentStateList
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);

        const mockFn = jest.fn();
        wrapper.setMethods({
            handleViewLog: mockFn
        });

        setTimeout(() => {
            wrapper.find('.sdx-chakanrizhi').trigger('click');
            expect(mockFn).toBeCalled();
            done();
        }, 500);
    })
})