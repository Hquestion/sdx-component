jest.mock('../../../utils/src/api/system');
jest.mock('../../../utils/src/api/project');

import 'babel-polyfill';
import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import SdxvPlatformResource from '../../components/resource-statistics/src/PlatformResource';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();

describe('SdxvPlatformResource', () => {

    it('test method fetchData', async done => {
        const wrapper = shallowMount(SdxvPlatformResource, {
            localVue
        });

        await flushPromise();

        expect(wrapper.vm.allocations.cpu).not.toEqual(0);
        expect(wrapper.find('.sdxv-platform-resource__title').exists()).toBeTruthy();
        expect(wrapper.findAll('.sdxv-platform-resource__chart--item').length).toEqual(3);
        done();
    })

});
