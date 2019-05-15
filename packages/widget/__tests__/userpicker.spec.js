import { shallowMount, mount } from '@vue/test-utils';
import UserPicker from '../components/user-picker';
import ElementUI from 'element-ui';
import Vue from 'vue';
Vue.use(ElementUI);

jest.mock('axios');

describe('UserPicker', () => {
    it('render a button with custom name', () => {
        const wrapper = mount(UserPicker, {
            propsData: {
                type: 'user',
                value: {
                    name: '2'
                }
            }
        });
        // wrapper.setMethods({
        //     guessUser: (name, cb) => {
        //         console.log(11);
        //         cb([{uuid: 1, name:'name', type: 'user'}])
        //     }
        // });
        wrapper.find('input').trigger('input');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.el-autocomplete-suggestion__list li').exists()).toBe(true);
        })
    })
});
