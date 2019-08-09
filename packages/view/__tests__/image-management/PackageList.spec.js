jest.mock('../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import Vue from 'vue/dist/vue.min';
import ElementUI from 'element-ui';
import SdxuIconButton from '@sdx/ui/components/icon-button';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const PackageList = require('../../components/image-management/src/PackageList').default;

describe('PackageList', () => {
    it('test prop imageId 、search and method fetchData', () => {
        const wrapper = shallowMount(PackageList, {
            localVue,
            propsData: {
                imageId: '300277f0-349c-4932-bae3-5f8278b9afef'
            }
        });
        expect(wrapper.props('imageId')).toBe('300277f0-349c-4932-bae3-5f8278b9afef');
        expect(wrapper.contains('.sdxv-package-list')).toBeTruthy();

        wrapper.setProps({search: 'abcdefg'});
        expect(wrapper.props().search).toEqual('abcdefg');
        expect(wrapper.vm.packageName).toEqual('abcdefg');
        expect(wrapper.vm.emitResultCount).toBe(true);
    });

    it('test prop operatable, and button click event', done => {
        const mockUpgrade = jest.fn();
        const mockDelete = jest.fn();
        const vm = new Vue({
            template: '<div><PackageList imageId="300277f0-349c-4932-bae3-5f8278b9afef" :operatable="true" @deletePackage="mockDelete"></PackageList></div>',
            components: {
                PackageList
            },
            methods: {
                mockDelete
            }
        }).$mount();

        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);

        setTimeout(() => {
            expect(wrapper.props('operatable')).toBe(true);
            expect(wrapper.find(SdxuIconButton).exists()).toBe(true);
            wrapper.setMethods({
                handleUpgrade: mockUpgrade,
            })
            wrapper.find('.sdx-shengji').trigger('click');
            wrapper.find('.sdx-icon-delete').trigger('click');
            expect(mockUpgrade).toBeCalled();
            expect(mockDelete).toBeCalled();
            done();
        }, 500);
    });
});
