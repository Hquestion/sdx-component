import { mount } from '@vue/test-utils';
import SdxvDetailContainer from '../../../../components/task-management/src/task-detail/common/DetailContainer';

describe('SdxvDetailContainer', () => {

    it('test slots', () => {
        const wrapper = mount(SdxvDetailContainer, {
            slots: {
                'base-info-right': '1',
                'base-info': '2',
                'running-info': '3',
                'resource-info': '4',
                'data-info': '5',
                'log-info': '6',
                'realtime-monitor': '7'
            }
        });

        const infoWrapperArray = wrapper.findAll('.sdxv-info-container');
        const mainWrapperArrya = wrapper.findAll('.sdxu-content-panel__main');
        expect(wrapper.find('.sdxu-content-panel__right').text()).toEqual('1');
        expect(infoWrapperArray.at(0).text()).toEqual('2');
        expect(infoWrapperArray.at(1).text()).toEqual('3');
        expect(mainWrapperArrya.at(2).text()).toEqual('4');
        expect(mainWrapperArrya.at(3).text()).toEqual('5');
        expect(mainWrapperArrya.at(4).text()).toEqual('6');
        expect(mainWrapperArrya.at(5).text()).toEqual('7');
    })
})