import { mount, createLocalVue, shallowMount, createWrapper  } from '@vue/test-utils';
import sinon from 'sinon';
import ElementUI from 'element-ui';
import { config } from '@vue/test-utils';

config.stubs.transition = false;
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

jest.mock('@sdx/utils/src/api/user', () => {
    return {
        changePassword() {
            return Promise.resolve();
        }
    };
});
jest.mock('@sdx/utils/src/helper/shareCenter', () => {
    return {
        getUser() {
            return {
                userId: '1111'
            };
        }
    };
});

const ChangePassword = require('../components/change-password').default;

describe('ChangePassword', () => {
    it('test visible works', () => {
        var wrapper = mount(ChangePassword, {
            propsData: {
                visible: true
            },
            localVue
        });
        expect(wrapper.vm.visible).toEqual(true);
        expect(wrapper.classes('sdxw-change-password')).toEqual(true);
        wrapper.destroy();
    });


    it('test handler works', (done) => {
        const handler = sinon.spy();
        var wrapper = mount(ChangePassword, {
            propsData: {
                visible: true,
                handler
            },
            localVue
        });
        wrapper.setData({
            changePwdForm: {
                oldPasswd: 'asd123456',
                newPasswd: 'asd1234567',
                repeatNewPasswd: 'asd1234567'
            }
        })
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.findAll('.sdxu-button').at(1).trigger('click');
            setTimeout(() => {
                sinon.assert.called(handler);
                console.log('wrapper.emitted()', wrapper.emitted());
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(ChangePassword, {
            propsData: {
                visible: true
            },
            localVue
        });
        wrapper.setData({
            changePwdForm: {
                oldPasswd: 'asd123456',
                newPasswd: 'asd1234567',
                repeatNewPasswd: 'asd1234567'
            }
        })
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.findAll('.sdxu-button').at(1).trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('close')).toBeTruthy();
                expect(wrapper.emitted('on-success')).toBeTruthy();
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });

    it('test cancel works', (done) => {
        var wrapper = mount(ChangePassword, {
            propsData: {
                visible: true
            },
            localVue
        });
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.findAll('.sdxu-button').at(0).trigger('click');
            setTimeout(() => {
                console.log('wrapper.emitted()', wrapper.emitted());
                expect(wrapper.emitted()['update:visible'][0]).toEqual([false]);
                expect(wrapper.emitted('close')).toBeTruthy();
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });
});
