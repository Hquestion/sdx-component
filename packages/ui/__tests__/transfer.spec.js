import { shallowMount, mount} from '@vue/test-utils';
import transfer from '../components/transfer';
import Button from '../components/button';
import flushPromise from 'flush-promises';
import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI)
Vue.component(transfer.name, transfer);

describe('transfer', () => {
    it('render Transfer with loading', () => {
        const randomBoo = [true, false][Math.floor(Math.random()*2)];
        const wrapper = mount(transfer, {
            propsData: {
                loading: randomBoo
            }
        });

        expect(wrapper.props().loading).toBe(randomBoo)
    });

    it('render Transfer with placeholder', () => {
        const wrapper = mount(transfer, {
            propsData: {
                placeholder: 'test placeholder'
            }
        });
        expect(wrapper.vm.placeholder).toEqual('test placeholder');
    });

    it('render Transfer with tags', () => {
        const wrapper = mount(transfer, {
            propsData: {
                tags: ['test', 'placeholder']
            }
        });
        expect(wrapper.vm.tags).toEqual(['test', 'placeholder']);
    });

    it('triggers removeAllTag', () => {
        const wrapper = mount(transfer, {
            propsData: {
                tags: ['test', 'placeholder']
            }
        });
    
        wrapper.find('.sdxu-transfer__moveall .sdxu-button').trigger('click');
        expect(wrapper.vm.checkedTags).toEqual([]);
    });

})