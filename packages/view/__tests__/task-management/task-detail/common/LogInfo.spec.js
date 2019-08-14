import 'babel-polyfill';
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';

import SdxvLogInfo from '../../../../components/task-management/src/task-detail/common/LogInfo';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvLogInfo', () => {

    it('test props', () => {
        const wrapper = mount(SdxvLogInfo, {
            localVue,
            propsData: {
                podName: 'test-podname',
                method: 'head'
            }
        });

        expect(wrapper.vm.podName).toEqual('test-podname');
        expect(wrapper.find('.sdxu-content-panel__title span:first-child').text()).toEqual('head');
    })
})