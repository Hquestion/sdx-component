import 'babel-polyfill';
import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import SdxuButton from '@sdx/ui/components/button';

import SdxvLogList from '../../../../components/task-management/src/task-detail/common/LogList';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvLogList', () => {

    it('test props', () => {
        const wrapper = mount(SdxvLogList, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdfdf'
                }]
            }
        });

        expect(wrapper.find('.sdxv-log-list__item--name').text()).toEqual('dfdfdf');
    })

    it('test method handleGotoLogPage', () => {
        const wrapper = mount(SdxvLogList, {
            localVue,
            propsData: {
                pods: [{
                    name: 'dfdfdf'
                }]
            }
        });

        const mockFn = jest.fn();
        wrapper.setMethods({
            handleGotoLogPage: mockFn 
        });
        wrapper.findAll(SdxuButton).at(0).trigger('click');

        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledWith('dfdfdf', 'tail');

        wrapper.findAll(SdxuButton).at(1).trigger('click');

        expect(mockFn).toBeCalledWith('dfdfdf', 'head');
        expect(mockFn).toHaveBeenCalledTimes(2);
    })
})