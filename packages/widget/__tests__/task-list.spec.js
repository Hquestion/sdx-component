jest.mock('../../utils/src/api/project');

import 'babel-polyfill';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import SdxwResourceTaskList from '../components/task-list';
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
// import ElementUI from 'element-ui';
const localVue = createLocalVue();
// localVue.use(ElementUI);

// mock script标签
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

describe('SdxwResourceTaskList', () => {

    it('test prop ranking', () => {
        const wrapper = shallowMount(SdxwResourceTaskList, {
            localVue,
            propsData: {
                ranking: true
            }
        });

        expect(wrapper.vm.sortOrders.length).toBe(1);
        expect(wrapper.vm.queryParams.states).toBe('RUNNING,LAUNCHING,KILLING');
        expect(wrapper.find(SdxwSearchLayout).isEmpty()).toBe(true);
        expect(wrapper.find('.sdxw-task-resource-list__pagination').exists()).toBe(false);
    });
})
