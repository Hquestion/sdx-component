import RuleForm from '../../../components/resource-manage/src/rule/RuleForm';
import { shallowMount, createLocalVue } from "@vue/test-utils";
import ElementUI from 'element-ui';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

let wrapper = null;

describe('RuleForm', () => {
    beforeEach(() => {
        wrapper = shallowMount(RuleForm, {
            localVue,
            propsData: {
                readonly: false,
                mode: 'h'
            }
        })
    });

    afterEach(() => {
        wrapper = null;
    });

    it('html渲染正常', async done => {
        await flushPromise();
        expect(wrapper.find('el-form-stub').attributes('labelposition')).toEqual('right');
        const formItems = wrapper.findAll('el-form-stub el-form-item-stub');
        expect(formItems.length).toBe(5);
        expect(formItems.at(0).find('sdxuinput-stub').attributes('value')).toEqual('3');
        expect(formItems.at(1).find('elselect-stub').attributes('value')).toEqual('1000/2147483648');
        expect(formItems.at(1).find('sdxuinput-stub').attributes('value')).toEqual('3');
        expect(formItems.at(2).find('sdxuinput-stub').attributes('value')).toEqual('5');
        expect(formItems.at(3).find('sdxuinput-stub').attributes('value')).toEqual('1');
        expect(formItems.at(4).find('sdxuinput-stub').attributes('value')).toEqual('1');
        done();
    });

    it('只读模式时，不可编辑', async done => {
        wrapper = shallowMount(RuleForm, {
            localVue,
            propsData: {
                readonly: true,
                mode: 'h'
            }
        });
        await flushPromise();
        expect(wrapper.find('el-form-stub').attributes('labelposition')).toEqual('right');
        expect(wrapper.find('el-form-stub sdxuinput-stub').exists()).toBeFalsy();
        expect(wrapper.find('el-form-stub inputreadonly-stub').exists()).toBeTruthy();
        done();
    });

    it('外部可调用save,cancel,getConfig方法', async done => {
        await flushPromise();
        expect(typeof wrapper.vm.save).toEqual('function');
        expect(typeof wrapper.vm.cancel).toEqual('function');
        expect(typeof wrapper.vm.getConfig).toEqual('function');
        done();
    });
});
