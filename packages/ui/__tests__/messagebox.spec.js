import { shallowMount, createWrapper } from "@vue/test-utils";
import mb from '../components/message-box';
import Button from '../components/button';

const statusIconMap = {
    error: 'sdx-icon-error',
    success: 'sdx-icon-success',
    info: 'sdx-icon-info',
    warning: 'sdx-icon-warning'
};

describe('MessageBox', () => {
    it('渲染title', done => {
        setTimeout(() => {
            mb({
                title: 'test'
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            expect(wrapper.find('.sdxu-message-box__header').text()).toEqual('test');
            mb.close();
            done();
        }, 500);
    });

    it('渲染content', done => {
        setTimeout(() => {
            mb({
                content: 'test content'
            });
            console.log(document.body.innerHTML);
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            expect(wrapper.find('.sdxu-message-box__main').text()).toEqual('test content');
            mb.close();
            done();
        }, 500);
    });

    it('渲染type=confirm', done => {
        setTimeout(() => {
            mb({
                content: 'test content',
                type: 'confirm'
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            expect(wrapper.findAll('.sdxu-button').length).toEqual(2);
            mb.close();
            done()
        }, 500);
    });

    it('渲染type=alert', done => {
        setTimeout(() => {
            mb({
                content: 'test content',
                type: 'alert'
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            expect(wrapper.findAll('.sdxu-button').length).toEqual(1);
            mb.close();
            done();
        }, 500);
    });

    it('渲染status=warning', done => {
        setTimeout(() => {
            mb({
                content: 'test content',
                type: 'alert',
                status: 'warning'
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            expect(wrapper.find('.sdxu-message-box__header i').classes(statusIconMap['warning'])).toBe(true);
            mb.close();
            done();
        }, 500);
    });

    it('点击关闭按钮关闭messgaebox', done => {
        setTimeout(() => {
            mb({
                content: 'test content',
                type: 'alert',
                status: 'warning'
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            setTimeout(() => {
                const vm = wrapper.element.__vue__.$parent;
                expect(vm.visible).toBe(true);
                wrapper.find('.sdxu-message-box__icon-close').trigger('click');
                expect(vm.visible).toBe(false);
                mb.close();
                done();
            }, 500);
        }, 500);
    });

    it('点击确定时进入promise回调', done => {
        setTimeout(() => {
            const fn = jest.fn();
            mb.confirm({
                content: 'test content',
                status: 'warning'
            }).then(res => {
                fn(res);
            });
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            setTimeout(() => {
                wrapper.find('.sdxu-button:last-child').trigger('click');
                setTimeout(() => {
                    expect(fn).toBeCalled();
                    expect(fn).toBeCalledWith('confirm');
                    const vm = wrapper.element.__vue__.$parent;
                    expect(vm.visible).toBe(false);
                    mb.close();
                    done();
                }, 0);
            }, 0);
        }, 500);
    });

    it('点击取消时，进入promise回调', done => {
        setTimeout(() => {
            const fn = jest.fn();
            mb.confirm.warning({
                content: 'test content',
            }).then(res => {

            }, fn);
            const wrapper = createWrapper(document.body.querySelector('.sdxu-message-box__wrap'));
            setTimeout(() => {
                wrapper.find('.sdxu-button:first-child').trigger('click');
                setTimeout(() => {
                    expect(fn).toBeCalled();
                    expect(fn).toBeCalledWith('cancel');
                    const vm = wrapper.element.__vue__.$parent;
                    expect(vm.visible).toBe(false);
                    mb.close();
                    done();
                }, 0);
            }, 0);
        }, 500);
    });
});
