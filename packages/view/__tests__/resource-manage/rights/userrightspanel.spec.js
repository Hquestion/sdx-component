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

const UserRightsPanel = require('../../../components/resource-manage/src/rights/UserRightsPanel').default;

let wrapper = null;

describe('UserRightsPanel', () => {
    beforeEach(() => {
        wrapper = mount(UserRightsPanel, {
            localVue,
            sync: false,
            stubs: {
                SdxwUserPicker: '<div class="user-picker"></div>',
                transition: false,
                RuleForm: false
            }
        })
    });

    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
        document.body.innerHTML = '';
    });

    it('正常渲染', async done => {
        await flushPromise();
        const headerWrapper = wrapper.find('thead').findAll('th');
        expect(headerWrapper.at(0).text()).toEqual('用户名');
        expect(headerWrapper.at(1).text()).toEqual('授权时间');
        expect(headerWrapper.at(2).text()).toEqual('操作');
        const bodyWrapper = wrapper.find('tbody').findAll('tr');
        expect(bodyWrapper.length).toBe(1);
        expect(bodyWrapper.at(0).findAll('td').at(0).text()).toEqual('张霞');
        expect(bodyWrapper.at(0).findAll('td').at(2).findAll('.sdxu-icon-button').length).toBe(3);
        done();
    });

    it('点击新增特权按钮弹出新增弹框', async done => {
        await flushPromise();
        const newButton = wrapper.find('.sdxu-content-panel__right .sdxu-button');
        newButton.trigger('click');
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().indexOf('新增') >=0 ).toBe(true);
        done();
    });

    it('点击查看操作按钮，弹出查看弹框', async done => {
        await flushPromise();
        const bodyWrapper = wrapper.find('tbody').findAll('tr');
        const checkButton = bodyWrapper.at(0).findAll('td').at(2).findAll('.sdxu-icon-button').at(0);
        checkButton.trigger('click');
        await flushPromise();
        let domWrapper = createWrapper(document.body);
        expect(domWrapper.find('.sdxu-dialog .el-dialog__header').text().indexOf('查看') >=0 ).toBe(true);
        done();
    });
});
