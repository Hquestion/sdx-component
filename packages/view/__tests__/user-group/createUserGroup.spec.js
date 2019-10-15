import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const CreateUserGroup = require('../../components/user-group/src/CreateUserGroup').default;

let wrapper = null;

describe('CreateUserGroup', () => {
    beforeEach(() => {
        wrapper = mount(CreateUserGroup, {
            propsData: {
                meta: undefined,
                visible: true,
            },
            sync: false,
            stubs: {
                transition: false
            }
        })
    });

    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('渲染为创建', async done => {
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().includes('创建')).toBe(true);
        done();
    });

    it('渲染为编辑', async done => {
        await flushPromise();
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
        wrapper = mount(CreateUserGroup, {
            propsData: {
                meta: {
                    uuid: '12'
                },
                visible: true,
            },
            sync: false,
            stubs: {
                transition: false
            }
        });
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().includes('编辑')).toBe(true);
        done();
    });

});
