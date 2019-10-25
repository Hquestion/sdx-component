import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
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

jest.mock('@sdx/utils/src/helper/shareCenter', () => {
    return {
        getUser() {
            return {
                userId: '1111'
            };
        }
    };
});
jest.mock('@sdx/utils/src/api/resource', () => {
    return {
        getResourceConfigDetail() {
            return Promise.resolve({
                maxGpuTime: 36000,
                maxCpuTime: 3600000
            });
        }
    };
});

const SdxwTaskResourceList = require('@sdx/widget/components/task-list').default;
const SdxvTaskManagement = require('../../components/task-management/src/TaskManagement').default;

describe('SdxvTaskManagement', () => {

    it('dom render', done => {
        const vm = new Vue({
            template: '<div><SdxvTaskManagement /></div>',
            components: {
                SdxvTaskManagement
            }
        }).$mount();
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        
        setTimeout(() => {
            expect(wrapper.find('.sdxu-content-panel__footer .sdxu-pagination').exists()).toBeTruthy();
            expect(wrapper.find(SdxwTaskResourceList).exists()).toBeTruthy();
            done();
        }, 300);
    })
})