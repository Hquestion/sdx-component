import { shallowMount, mount } from '@vue/test-utils';
import 'babel-polyfill';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvComponentStateLogDialog = require('../../components/component-state/src/ComponentStateLogDialog').default;

describe('SdxvComponentStateLogDialog', () => {

    it('test prop pod', () => {
        const wrapper = shallowMount(SdxvComponentStateLogDialog, {
            propsData: {
                pod: {
                    podName: 'test-pod-name-asdfsf123'
                }
            }
        });

        expect(wrapper.vm.pod.podName).toEqual('test-pod-name-asdfsf123');
    })
});
