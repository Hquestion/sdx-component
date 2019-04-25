import { shallowMount } from '@vue/test-utils';
import Button from '../components/button';

describe('Button', () => {
    it('render a button with custom name', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '确定'
            }
        });
        expect(wrapper.find('.sdxu-button').text()).toEqual('确定');
    })

    it('render a button with custom dom', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '<div class="sdxu-button__name">OK</div>'
            }
        });
        expect(wrapper.find('.sdxu-button').contains('div.sdxu-button__name')).toBeTruthy();
    })

    it('calls handleClick event when click on button', () => {
        const wrapper = shallowMount(Button);
        // mock自定义事件
        const mockFn = jest.fn();
        wrapper.setMethods({
            handleClick: mockFn
        });
        wrapper.find('.sdxu-button').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    })

    it('triggers a click event when a handleClick method is called', () => {
        const wrapper = shallowMount(Button);
        const mockFn = jest.fn();
        wrapper.vm.$on('click', mockFn);
        // 触发按钮的点击事件
        wrapper.find('.sdxu-button').trigger('click');
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        // 再次触发按钮点击事件
        wrapper.find('.sdxu-button').trigger('click');
        expect(mockFn).toHaveBeenCalledTimes(2);
    })
})