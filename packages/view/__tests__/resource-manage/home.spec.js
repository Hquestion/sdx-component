const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const Home = require('../../components/resource-manage/src/Home').default;
import { shallowMount } from "@vue/test-utils";

describe('Home', () => {
    it('资源管理首页渲染正常', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.find('resourcetemplate-stub').exists()).toBeTruthy();
        expect(wrapper.find('globalrulepanel-stub').exists()).toBeTruthy();
        expect(wrapper.find('userrightspanel-stub').exists()).toBeTruthy();
    });
});
