import { mount, createLocalVue, shallowMount, createWrapper  } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import sinon from 'sinon';
import { config } from '@vue/test-utils';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

jest.mock('@sdx/utils/src/api/user', () => {
    return {
        getGroups() {
            return Promise.resolve({
                groups: []
            });
        },
        getUserList() {
            return Promise.resolve({
                users: []
            });
        }
    };
});

const ShareSetting = require('../components/share-setting').default;

config.stubs.transition = false;
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ShareSetting', () => {
    it('test visible works', () => {
        var wrapper = shallowMount(ShareSetting, {
            propsData: {
                visible: true
            },
            localVue
        });
        expect(wrapper.vm.visible).toEqual(true);
    });


    it('test handler works', (done) => {
        const handler = sinon.spy();
        var wrapper = mount(ShareSetting, {
            propsData: {
                visible: true,
                handler
            },
            localVue,
            attachToDocument: true
        });
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.find('.sdxu-button.sdxu-button--primary').trigger('click');
            setTimeout(() => {
                sinon.assert.called(handler);
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });

    it('test confirm works', (done) => {
        var wrapper = mount(ShareSetting, {
            propsData: {
                visible: true
            },
            localVue,
            attachToDocument: true
        });
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.find('.sdxu-button.sdxu-button--primary').trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('confirm-edit')).toBeTruthy();
                expect(wrapper.emitted('update:visible')).toBeTruthy();
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });

    it('test cancel works', (done) => {
        var wrapper = mount(ShareSetting, {
            propsData: {
                visible: true
            },
            localVue,
            attachToDocument: true
        });
        setTimeout(() => {
            const htmlWrapper = createWrapper(document.body);
            expect(htmlWrapper.exists()).toBe(true);
            htmlWrapper.find('.sdxu-button.sdxu-button--small').trigger('click');
            setTimeout(() => {
                expect(wrapper.emitted('update:visible')).toBeTruthy();
                expect(wrapper.emitted()['update:visible'][0]).toEqual([false]);
                done();
                document.body.innerHTML = '';
                wrapper.destroy();
            }, 500);
        }, 500);
    });
});
