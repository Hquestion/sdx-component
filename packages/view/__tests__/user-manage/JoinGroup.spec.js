import { shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';
const localVue = createLocalVue();
import flushPromise from 'flush-promises';
localVue.use(ElementUI);
const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};


mockScript();
const JoinGroup = require('../../components/user-manage/src/components/JoinGroup').default;
let wrapper = null;
describe('JoinGroup', () => {
    beforeEach(() => {
        wrapper = mount(JoinGroup, {
            localVue,
            propsData: {
                user: {
                    groups: [
                        {
                            createdAt:"2019-08-06T01:47:38.258000Z",
                            description:"",
                            name:"hxl",
                            permissions:[],
                            roles:[],
                            updatedAt:"2019-08-06T01:54:31.261000Z",
                            users:[],
                            uuid:"988fd8a4-3820-4587-a570-8b1e8f277122",
                        }
                    ]
                }
            },
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
            }
        });
        
    });

    afterEach(() => {
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染正常',  done => {
        let domWrapper = createWrapper(document.body);
        setTimeout(() => {
            expect(wrapper.find('.sdxu-dialog').exists()).toBeTruthy();
            expect(domWrapper.find('.el-dialog__header').exists()).toBeTruthy();
            expect(domWrapper.find('.sdxu-transfer').exists()).toBeTruthy();
            expect(domWrapper.find('.el-dialog__footer').exists()).toBeTruthy();
            done();
        }, 500);
    });

    it('点击确定按钮，confirm方法被调用', async done => {
        await flushPromise();
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
        wrapper = mount(JoinGroup, {
            localVue,
            propsData: {
                user: {
                    groups: [
                        {
                            createdAt:"2019-08-06T01:47:38.258000Z",
                            description:"",
                            name:"hxl",
                            permissions:[],
                            roles:[],
                            updatedAt:"2019-08-06T01:54:31.261000Z",
                            users:[],
                            uuid:"988fd8a4-3820-4587-a570-8b1e8f277122",
                        }
                    ]
                }
            },
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
            }
        });
        await flushPromise();
        const mockFn = jest.fn();
        wrapper.setMethods({
            confirm: mockFn
        });
        let domWrapper = createWrapper(document.body);
        domWrapper.find('.sdxu-dialog__footer .sdxu-button:last-child').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });

    it('点击close，close方法被调用', async done => {
        await flushPromise();
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
        wrapper = mount(JoinGroup, {
            localVue,
            propsData: {
                user: {
                    groups: [
                        {
                            createdAt:"2019-08-06T01:47:38.258000Z",
                            description:"",
                            name:"hxl",
                            permissions:[],
                            roles:[],
                            updatedAt:"2019-08-06T01:54:31.261000Z",
                            users:[],
                            uuid:"988fd8a4-3820-4587-a570-8b1e8f277122",
                        }
                    ]
                }
            },
            stubs: {
                transition: false,
                'el-form': true,
                'el-form-item': true,
                'el-select': true,
                'el-option': true
            }
        });
        await flushPromise();
        const mockFn = jest.fn();
        wrapper.setMethods({
            close: mockFn
        });
        let domWrapper = createWrapper(document.body);
        domWrapper.find('.sdxu-dialog__footer .sdxu-button:first-child').trigger('click');
        await flushPromise();
        expect(mockFn).toBeCalled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
    });

})