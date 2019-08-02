jest.mock('../../utils/src/api/project');
jest.mock('../../utils/src/api/system');

import 'babel-polyfill';
import { mount, createLocalVue } from '@vue/test-utils';
import SdxwPodLog from '../components/pod-log';
import { wrap } from 'module';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxwPodLog', () => {

    it('test prop podName and function getForwardLog', done => {
        const wrapper = mount(SdxwPodLog, {
            localVue,
            propsData: {
                podName: 'test1234'
            }
        });
        const mockFn = jest.fn();
        wrapper.setMethods({
            getForwardLog: mockFn
        })

        expect(wrapper.props('podName')).toBe('test1234');
        setTimeout(() => {
            expect(wrapper.vm.startedAt !== '').toBe(true);
            expect(mockFn).toBeCalled();
            done();
        }, 500);
    })

    it('test prop type, and render log', done => {
        const wrapper = mount(SdxwPodLog, {
            localVue,
            propsData: {
                type: 'system',
                podName: 'test1234'
            }
        });
        setTimeout(() => {
            expect(wrapper.vm.startedAt).toBe('');
            expect(wrapper.find('.sdxu-log-detail__container--content').text()).toBe('first linesecond linethird line')
            done();
        }, 500);
    });

    it('test prop method', done => {
        const wrapper = mount(SdxwPodLog, {
            localVue,
            propsData: {
                method: 'tail',
                podName: 'test1234'
            }
        });
        const mockGetCodeInfo = jest.fn();
        wrapper.setMethods({
            getCodeInfo: mockGetCodeInfo
        });

        setTimeout(() => {
            expect(mockGetCodeInfo).toBeCalled();
            expect(mockGetCodeInfo).toHaveBeenCalledTimes(1);
            done();
        }, 500);
    });

    it('test prop autoPull and followScroll, and function getBackwardLog', done => {
        const wrapper = mount(SdxwPodLog, {
            localVue,
            propsData: {
                podName: 'test1234',
                method: 'tail',
                autoPull: true,
                followScroll: true
            }
        });
        const mockGotoBottom = jest.fn();
        const mockStartAutoPull = jest.fn();
        const mockGetBackwardLog = jest.fn();
        wrapper.setMethods({
            startAutoPull: mockStartAutoPull,
            gotoBottom: mockGotoBottom,
            getBackwardLog: mockGetBackwardLog
        });

        setTimeout(() => {
            expect(mockGotoBottom).toBeCalled();
            expect(mockStartAutoPull).toBeCalled();
            expect(mockGetBackwardLog).toBeCalled();
            done();
        }, 500);
    })
})