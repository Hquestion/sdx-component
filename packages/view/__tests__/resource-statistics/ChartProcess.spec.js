import { shallowMount } from '@vue/test-utils';
import SdxvChartProcess from '../../components/resource-statistics/src/ChartProcess';

describe('SdxvChartProcess', () => {

    it('test props and computed', () => {
        const wrapper = shallowMount(SdxvChartProcess, {
            propsData: {
                total: 10,
                used: 4
            }
        });

        expect(wrapper.vm.percent).toEqual(40);

        wrapper.setProps({
            total: 110,
            used: 1
        });
        expect(wrapper.vm.percent).toEqual(1);

        wrapper.setProps({
            total: 0
        });
        expect(wrapper.vm.percent).toEqual(0);
    })

    it('test dom render', () => {
        const wrapper = shallowMount(SdxvChartProcess, {
            propsData: {
                total: 10,
                used: 4
            }
        });

        expect(wrapper.find('.sdxv-resource-chart').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-resource-chart__percent').text()).toEqual('40%');
    })
});
