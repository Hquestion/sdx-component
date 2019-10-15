import { shallowMount } from '@vue/test-utils';
import 'babel-polyfill';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxvComponentsState = require('../../components/component-state/src/index').default;

describe('SdxvComponentState', () => {

    it('test render', () => {
        const wrapper = shallowMount(SdxvComponentsState);

        expect(wrapper.find('.sdxv-components-state').exists()).toBe(true);
    })
})