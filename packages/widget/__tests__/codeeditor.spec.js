import { shallowMount, createLocalVue, createWrapper } from "@vue/test-utils";
import Vue from 'vue/dist/vue.min';
import Button from '../../ui/components/button';

const localVue = createLocalVue();

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const CodeEditor = require('../components/code-editor').default;

describe('CodeEditor', () => {
    it('title & visible', done => {
        const vm = new Vue({
            template: '<div><CodeEditor v-model="code" :visible.sync="visible" :title="title"></CodeEditor></div>',
            data() {
                return {
                    code: '',
                    visible: false,
                    title: 'test'
                };
            },
            components: {
                CodeEditor
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        expect(wrapper.find('.el-dialog__header').text()).toEqual('test');
        expect(window.getComputedStyle(wrapper.element).display).toEqual('none');
        vm.visible = true;
        Vue.nextTick(() => {
            expect(window.getComputedStyle(wrapper.element).display).not.toEqual('none');
            wrapper.findAll(Button).at(0).trigger('click');
            setTimeout(() => {
                expect(window.getComputedStyle(wrapper.element).display).toEqual('none');
                done();
            }, 1000);
        });
    });

    it('v-model', done => {
        const vm = new Vue({
            template: '<div><CodeEditor v-model="code" :visible.sync="visible" :title="title" ref="editor"></CodeEditor></div>',
            data() {
                return {
                    code: '',
                    visible: false,
                    title: 'test'
                };
            },
            components: {
                CodeEditor
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        const editorVm = wrapper.find(CodeEditor).vm;
        editorVm.$emit('confirm', '1111');
        expect(vm.code).toEqual('1111');
        done();
    });

    it('saveHandler', done => {
        var fn = jest.fn(() => Promise.resolve());
        const vm = new Vue({
            template: '<div><CodeEditor v-model="code" :visible.sync="visible" :title="title" ref="editor" :save-handler="confirmHandler"></CodeEditor></div>',
            data() {
                return {
                    code: '',
                    visible: false,
                    title: 'test'
                };
            },
            methods: {
                confirmHandler: fn
            },
            components: {
                CodeEditor
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        const wrapper = createWrapper(vm);
        wrapper.findAll(Button).at(1).trigger('click');
        setTimeout(() => {
            expect(fn).toBeCalled();
            done();
        }, 200);
    });
});
