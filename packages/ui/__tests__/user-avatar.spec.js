import { shallowMount } from '@vue/test-utils';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const SdxuUserAvatar = require('../components/user-avatar').default;

describe('User Avatar', () => {
    it('没有名字的渲染', () => {
        var wrapper = shallowMount(SdxuUserAvatar);
        expect(wrapper.find('use[xlink:href="#sdx-icon-UserInfo"]').exists()).toBe(true);
        expect(wrapper.find('.sdxu-user-avatar__name').exists()).toBe(false);
    });

    it('传入名字的渲染', () => {
        var wrapper = shallowMount(SdxuUserAvatar, {
            propsData: {
                name: 'test-name'
            }
        });
        expect(wrapper.find('use[xlink:href="#sdx-icon-UserInfo"]').exists()).toBe(true);
        expect(wrapper.find('.sdxu-user-avatar__name').exists()).toBe(true);
        expect(wrapper.find('.sdxu-user-avatar__name').text()).toEqual('test-name');
    });
});
