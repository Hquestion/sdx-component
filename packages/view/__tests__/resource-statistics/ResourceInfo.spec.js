import { shallowMount } from '@vue/test-utils';
import SdxvResourceInfo from '../../components/resource-statistics/src/ResourceInfo';
import { t } from '@sdx/utils/src/locale';

describe('SdxvResourceInfo', () => {

    it('test props and computed', () => {
        const wrapper = shallowMount(SdxvResourceInfo, {
            propsData: {
                total: 10, 
                used: 1
            }
        });

        expect(wrapper.vm.type).toEqual('cpu');
        expect(wrapper.vm.title).toEqual('CPU');
        expect(wrapper.vm.unit).toEqual(`(${t('view.monitor.resourceStatistic.Core')})`);
        expect(wrapper.vm.totalDesc).toEqual(t('view.monitor.resourceStatistic.CPUTotal'));

        wrapper.setProps({
            type: 'gpu'
        });
        expect(wrapper.vm.type).toEqual('gpu');
        expect(wrapper.vm.title).toEqual('GPU');
        expect(wrapper.vm.unit).toEqual(`(${t('view.monitor.resourceStatistic.Block')})`);
        expect(wrapper.vm.totalDesc).toEqual(t('view.monitor.resourceStatistic.GPUTotal'));

        wrapper.setProps({
            type: 'mem'
        });
        expect(wrapper.vm.type).toEqual('mem');
        expect(wrapper.vm.title).toEqual(t('view.monitor.resourceStatistic.Memory'));
        expect(wrapper.vm.unit).toEqual('(GB)');
        expect(wrapper.vm.totalDesc).toEqual(t('view.monitor.resourceStatistic.MemoryTotal'));
    })
});
