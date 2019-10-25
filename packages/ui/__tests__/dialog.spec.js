import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import flushPromise from 'flush-promises';
import sinon from 'sinon';
const Vue = createLocalVue();
import Button from '../components/button';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();
const SdxuDialog = require('../components/dialog').default;

describe('Dialog', () => {
    it('render dialog with prop visible=true and title', () => {
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog'
            },
            slots: {
                default: 'dialog content'
            }
        });

        expect(wrapper.vm.title).toEqual('test dialog');
        expect(wrapper.vm.visible).toEqual(true);
        expect(wrapper.find('.el-dialog__header').text()).toEqual('test dialog');
    });

    it('render dialog with random prop size', () => {
        const sizeRandom = ['normal', 'small', 'large'][Math.floor(Math.random() * 3)];
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog',
                size: sizeRandom
            },
            slots: {
                default: 'dialog content'
            }
        });
        expect(wrapper.classes(`sdxu-dialog--${sizeRandom}`)).toBe(true);
    });

    it('render dialog with prop noFooter', () => {
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog',
                noFooter: true
            },
            slots: {
                default: 'dialog content'
            }
        });
        expect(wrapper.find('.sdxu-button').exists()).toBe(false);
    });

    it('render dialog with prop confirmLabel', () => {
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog',
                confirmLabel: 'test-confirm'
            },
            slots: {
                default: 'dialog content'
            }
        });
        expect(wrapper.find('.sdxu-button:last-child').text()).toEqual('test-confirm');
    });

    it('render dialog with prop cancelLabel', () => {
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog',
                cancelLabel: 'test-cancel'
            },
            slots: {
                default: 'dialog content'
            }
        });
        expect(wrapper.find('.sdxu-button:first-child').text()).toEqual('test-cancel');
    });

    it('render dialog with titleIcon', () => {
        const wrapper = mount(SdxuDialog, {
            propsData: {
                visible: true,
                title: 'test dialog',
                titleIcon: 'test-icon'
            },
            slots: {
                default: 'dialog content'
            }
        });
        expect(wrapper.find('.el-dialog--center').exists()).toBe(true);
        expect(wrapper.find('use[xlink:href="#test-icon"]').exists()).toBe(true);
    });

    it('传入confirmHandler时，点击确认按钮调用confirmHandler', () => {
        const handleConfirm = sinon.stub();
        const wrapper = mount(SdxuDialog, {
            propsData: {
                confirmHandler: () => {
                    return new Promise(resolve => resolve(handleConfirm()))
                }
            },
            slots: {
                default: 'dialog content'
            }
        });

        wrapper.find('.sdxu-button:last-child').trigger('click');
        expect(handleConfirm.called).toBe(true);
    });
});
