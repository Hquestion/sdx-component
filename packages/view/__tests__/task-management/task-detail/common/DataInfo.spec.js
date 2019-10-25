import { shallowMount } from '@vue/test-utils';
import SdxvDataInfo from '../../../../components/task-management/src/task-detail/common/DataInfo';

describe('SdxvDataInfo', () => {

    it('test prop datasources', () => {
        const wrapper = shallowMount(SdxvDataInfo, {
            propsData: {
                datasources: [{
                    name: 'test',
                    host: '192.111.111.1',
                    port: '2045'
                }]
            }
        });

        expect(wrapper.find('.sdxv-data-datasource').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-data-datasource__name').text()).toEqual('test');
    })

    it('test prop datasets', () => {
        const wrapper = shallowMount(SdxvDataInfo, {
            propsData: {
                datasets: [{
                    name: 'test-dataset'
                }]
            }
        });

        expect(wrapper.find('.sdxv-data-dataset').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-data-dataset').text()).toEqual('test-dataset');
    })
})