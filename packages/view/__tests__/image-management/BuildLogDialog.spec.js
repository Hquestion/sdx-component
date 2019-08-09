jest.mock('../../../utils/src/api/image');

import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvBuildLogDialog = require('../../components/image-management/src/BuildLogDialog').default;
const SdxuDialog = require('@sdx/ui/components/dialog').default;


describe('SdxvBuildLogDialog', () => {

    it('test prop imageBuilderId, and test method fetchLogInfo when emit open event', done => {
        const wrapper = mount(SdxvBuildLogDialog, {
            localVue,
            propsData: {
                imageBuilderId: 'test-image-builder-id-sfdaf343'
            }
        });

        wrapper.find(SdxuDialog).vm.$emit('open');

        setTimeout(() => {
            expect(wrapper.vm.imageBuilderId).toEqual('test-image-builder-id-sfdaf343');
            expect(wrapper.vm.logInfo !== '').toBe(true);
            done();
        }, 300);
    })

    it('test data autoPull', () => {
        const wrapper = shallowMount(SdxvBuildLogDialog, {
            localVue
        });

        const startPolling = jest.fn();
        const stopPolling = jest.fn();

        wrapper.setMethods({
            startPolling,
            stopPolling
        })
        wrapper.setData({
            autoPull: true
        });

        expect(startPolling).toBeCalled();

        wrapper.setData({
            autoPull: false
        });
        expect(stopPolling).toBeCalled();
    })
});
