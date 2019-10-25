import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'babel-polyfill';
import 'jest-canvas-mock';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
import SdxvChartGPU from '../../components/resource-statistics/src/ChartGPU';
import { t } from '@sdx/utils/src/locale';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvAllTaskList', () => {

    it('test dom render and computed', () => {
        const wrapper = shallowMount(SdxvChartGPU, {
            localVue,
            propsData: {
                allocations: {
                    "Tesla-K80": 4,
                    "GeForce-GTX-1080-Ti": 2
                },
                used: {
                    "Tesla-K80": 2,
                    "GeForce-GTX-1080-Ti": 1
                }
            }
        });

        expect(wrapper.vm.gpuModelKeys.length).toEqual(2);
        expect(wrapper.vm.allocationList[0].name).toEqual('Tesla-K80');
        expect(wrapper.vm.usedList[0].name).toEqual(t('view.monitor.resourceStatistic.Used'));
        expect(wrapper.vm.usedList[1].value).toEqual(2);
    })
});
