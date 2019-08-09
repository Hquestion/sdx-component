import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const FileTask = require('../../../components/file/src/popup/FileTask').default;

let wrapper = null;

describe('FileTask', function () {
    beforeEach(() => {
        wrapper = shallowMount(FileTask, {
            localVue,
            propsData: {
                visible: false
            },
            provide: {
                fileManager: {
                    enterDirectory: jest.fn()
                }
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('渲染出标题，默认窗口不可见，收起状态', () => {
        expect(wrapper.classes('is-expand')).toBe(false);
        expect(wrapper.isVisible()).toBe(false);
        expect(wrapper.find('.sdxv-file-task__header-title').text()).toEqual('文件操作列表');
        expect(wrapper.findAll('.sdxv-file-task__body el-tab-pane-stub').length).toBe(3);
    });

    it('切换收起/展开状态', done => {
        wrapper.setProps({
            visible: true
        });
        setTimeout(async () => {
            expect(wrapper.classes('is-expand')).toBe(true);
            expect(wrapper.isVisible()).toBe(true);
            done();
        }, 500);
    });

    it('点击删除时，关闭窗口', async done => {
        const vm = new Vue({
            template: '<div><FileTask :visible.sync="visible"></FileTask></div>',
            data() {
                return {
                    visible: true
                }
            },
            components: {
                FileTask
            },
            provide: {
                fileManager: {
                    enterDirectory: jest.fn()
                },
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        wrapper = createWrapper(vm);
        const delIcon = wrapper.find('.delete-icon');
        delIcon.trigger('click');
        await flushPromise();
        setTimeout(() => {
            expect(wrapper.vm._visible).toBe(false);
            expect(vm.visible = false);
            done();
        }, 100);
    });

    it('选中指定tab时，同时打开窗口', done => {
        const vm = new Vue({
            template: '<div><FileTask :visible.sync="visible"></FileTask></div>',
            data() {
                return {
                    visible: false
                }
            },
            components: {
                FileTask
            },
            provide: {
                fileManager: {
                    enterDirectory: jest.fn()
                },
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        wrapper = createWrapper(vm);
        wrapper.vm.checkTab('COPY');
        setTimeout(() => {
            expect(wrapper.vm._visible).toBe(true);
            expect(vm.visible = true);
            done();
        }, 100);
    })
});
