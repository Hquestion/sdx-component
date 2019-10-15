jest.mock('../../../../../utils/src/api/system');

import { mount, createLocalVue, createWrapper } from '@vue/test-utils';
import 'jest-canvas-mock';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
import { t } from '@sdx/utils/src/locale';
import MonitorInfo from '../../../../components/task-management/src/task-detail/common/MonitorInfo';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvSaveAsDialog', () => {

    it('test prop pods', () => {
        const wrapper = mount(MonitorInfo, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdf'
                }, {
                    name: 'gdgfh'
                }]
            },
            stubs: {
                'el-select': true,
                'el-option': true
            },
            sync: false
        });

        expect(wrapper.vm.currentPod).toEqual('dfdf');
    })

    it('test prop polling', done => {
        const wrapper = mount(MonitorInfo, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdf'
                }, {
                    name: 'gdgfh'
                }],
                polling: false
            },
            stubs: {
                'el-select': true,
                'el-option': true
            },
            sync: false
        });

        const startPolling = jest.fn();
        const stopPolling = jest.fn();
        wrapper.setMethods({
            startPolling,
            stopPolling
        });

        wrapper.setProps({
            polling: true
        });
        setTimeout(() => {
            expect(startPolling).toBeCalled();
            wrapper.setProps({
                polling: false
            });
            setTimeout(() => {
                expect(stopPolling).toBeCalled();
                done();
            }, 300);
        }, 300);
    })

    it('test prop hasGpu', done => {
        const wrapper = mount(MonitorInfo, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdf'
                }, {
                    name: 'gdgfh'
                }],
                hasGpu: false
            },
            stubs: {
                'el-select': true,
                'el-option': true
            },
            sync: false
        });

        expect(wrapper.findAll('.sdxv-monitor-info__chart--item').length).toEqual(2);
        setTimeout(() => {
            wrapper.setProps({
                hasGpu: true
            });
            setTimeout(() => {
                expect(wrapper.findAll('.sdxv-monitor-info__chart--item').length).toEqual(4);
                done();
            }, 300);
        }, 300);
    })

    it('test method fetchData', done => {
        const wrapper = mount(MonitorInfo, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdf'
                }, {
                    name: 'gdgfh'
                }]
            },
            stubs: {
                'el-select': true,
                'el-option': true
            },
            sync: false
        });

        setTimeout(() => {
            expect(wrapper.vm.statList.length).not.toEqual(0);
            done();
        }, 300);
    })
})