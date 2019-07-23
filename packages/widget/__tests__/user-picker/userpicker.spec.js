jest.mock('../../../utils/src/api/user');

import {shallowMount, mount, createLocalVue, createWrapper} from '@vue/test-utils';
import UserPicker from '../../components/user-picker';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
const localVue = createLocalVue();
localVue.use(ElementUI);
import SdxuInput from '@sdx/ui/components/input';
import AutoComplete from '@sdx/ui/components/autocomplete';

describe('UserPicker', () => {
    it('触发input事件时，获取数据并展示', done => {
        const wrapper = mount(UserPicker, {
            localVue,
            propsData: {
                type: 'user',
                value: {
                    name: '2'
                }
            }
        });
        wrapper.find(SdxuInput).vm.$emit('input', 'zhang');
        setTimeout(() => {
            expect(wrapper.findAll('.el-autocomplete-suggestion__list li').exists()).toBe(true);
            expect(wrapper.findAll('.el-autocomplete-suggestion__list li').length).toEqual(3);
            done();
        }, 500)
    });

    it('触发select事件时，同步v-model', done => {
        const vm = new Vue({
            template: '<div><UserPicker ref="picker" v-model="data" type="user"></div>',
            data() {
                return {
                    data: {
                        name: '2'
                    }
                }
            },
            components: {
                UserPicker
            }
        }).$mount(document.createElement('div'));
        vm.child = vm.$children[0];
        var wrapper = createWrapper(vm);
        let pickerVm = wrapper.vm;
        let inputVm = wrapper.find(SdxuInput).vm;
        let acVm = wrapper.find(AutoComplete).vm;
        inputVm.$emit('input', 'zhang');
        setTimeout(() => {
            expect(pickerVm.value).toEqual({name: 'zhang'});
            acVm.$emit('select', {name: 'zhangsan', uuid: '3'});
            setTimeout(() => {
                expect(vm.data).toEqual({name: 'zhangsan', uuid: '3'});
                done();
            }, 1000)
        }, 500)
    });
});
