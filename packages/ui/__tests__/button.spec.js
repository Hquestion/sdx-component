import { shallowMount, mount } from '@vue/test-utils';
import Button from '../components/button';
import flushPromise from 'flush-promises';
import Vue from 'vue';
Vue.component(Button.name, Button);

describe('Button', () => {
    it('render a button with custom name', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '确定'
            }
        });
        expect(wrapper.find('.sdxu-button').text()).toEqual('确定');
    });

    it('render a button with custom dom', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '<div class="sdxu-button__name">OK</div>'
            }
        });
        expect(wrapper.find('.sdxu-button').contains('div.sdxu-button__name')).toBeTruthy();
    });

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
    });

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
    });

    // prop size
    it('render button with regular size', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                size: 'regular'
            }
        });
        expect(wrapper.classes('sdxu-button--regular')).toBe(true);
    });

    it('render button with small size', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                size: 'small'
            }
        });
        expect(wrapper.classes('sdxu-button--small')).toBe(true);
    });

    it('render button with types', () => {
        const supportTypes = ['primary', 'success', 'warning', 'error', 'default', 'text'];
        const randomType = Math.floor(Math.random() * supportTypes.length);
        const wrapper = shallowMount(Button, {
            propsData: {
                type: supportTypes[randomType]
            }
        });
        expect(wrapper.classes(`sdxu-button--${supportTypes[randomType]}`)).toBe(true);
    });

    it('render button with prop invert', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const trueWrapper = shallowMount(Button, {
            propsData: {
                invert: randomBoo
            }
        });
        expect(trueWrapper.classes('is-invert')).toBe(randomBoo);
    });

    it('render button with prop plain', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const trueWrapper = shallowMount(Button, {
            propsData: {
                plain: randomBoo
            }
        });
        expect(trueWrapper.classes('is-plain')).toBe(randomBoo);
    });

    it('render button with prop disabled', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const trueWrapper = shallowMount(Button, {
            propsData: {
                disabled: randomBoo
            }
        });
        expect(trueWrapper.classes('is-disabled')).toBe(randomBoo);
    });

    it('render button with prop icon', () => {
        const trueWrapper = shallowMount(Button, {
            propsData: {
                icon: 'icon-test'
            }
        });
        const icon = trueWrapper.find('.sdxu-button__icon');
        expect(icon.exists()).toBe(true);
        expect(icon.classes('icon-test')).toBe(true);
    });

    it('render button with prop icon when button in loading status', () => {
        const trueWrapper = shallowMount(Button, {
            propsData: {
                icon: 'icon-test',
                loading: true
            }
        });
        const icon = trueWrapper.find('.sdxu-button__icon');
        expect(icon.exists()).toBe(true);
        expect(icon.classes('icon-test')).toBe(false);
        expect(icon.classes('sdx-icon-loading')).toBe(true);
    });

    it('render button with prop iconOnly', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                iconOnly: true,
                icon: 'icon-test'
            }
        });
        const icon = wrapper.find('.sdxu-button__icon');
        expect(icon.exists()).toBe(true);
        expect(wrapper.classes('is-icon')).toBe(true);
        const dropdownIcon = wrapper.find('.sdxu-button__icon--dropdown');
        expect(dropdownIcon.exists()).toBe(false);
    });

    it('render button with prop block', () => {
        const wrapper = shallowMount(Button, {
            propsData: {
                block: true
            }
        });
        expect(wrapper.classes('is-block')).toBe(true);
    });

    it('pass dropdown buttons with slot dropdown, set trigger and dropdown size', done => {
        const triggerRandom = ['hover', 'click'][Math.floor(Math.random()*2)];
        const keepDropdownOpenRandom = [true, false][Math.floor(Math.random()*2)];
        const eventMap = {
            'hover': 'mouseover',
            'click': 'click'
        };
        const wrapper = shallowMount(Button, {
            propsData: {
                trigger: triggerRandom,
                dropdownWidth: '100px',
                keepDropdownOpen: keepDropdownOpenRandom
            },
            components: {
                SdxuButton: Button
            },
            slots: {
                dropdown: [
                    '<SdxuButton>第一个下拉</SdxuButton>',
                    '<SdxuButton>第二个下拉</SdxuButton>',
                    '<SdxuButton>第三个下拉</SdxuButton>'
                ]
            }
        });
        expect(wrapper.find('.sdxu-button__dropdown').exists()).toBe(true);
        wrapper.trigger(eventMap[triggerRandom]);
        flushPromise().then(() => {
            expect(wrapper.vm.dropdownVisible).toBe(true);
            const firstButton = wrapper.find('.sdxu-button .sdxu-button');
            firstButton.trigger('click');
            flushPromise().then(() => {
                expect(wrapper.vm.dropdownVisible).toBe(keepDropdownOpenRandom);
                done();
            });
        });
    });

});
