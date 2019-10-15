import { shallowMount } from '@vue/test-utils';
import BaseInfoItem from '../../../../components/task-management/src/task-detail/common/BaseInfoItem';

describe('BaseInfoItem', () => {

    it('test prop label', () => {
        const wrapper = shallowMount(BaseInfoItem, {
            propsData: {
                label: 'hello'
            }
        });

        expect(wrapper.find('.sdxv-info-container__item--label').text()).toEqual('hello：');
    })

    it('test prop value', () => {
        const wrapper = shallowMount(BaseInfoItem, {
            propsData: {
                value: ''
            }
        });

        expect(wrapper.find('.sdxv-info-container__item--value').text()).toEqual('-');

        wrapper.setProps({
            value: 2
        });

        expect(wrapper.find('.sdxv-info-container__item--value').text()).toEqual('2');
    })

    it('test prop multiLine', () => {
        const wrapper = shallowMount(BaseInfoItem);

        expect(wrapper.find('.is-multi-line').exists()).toBeFalsy();

        wrapper.setProps({
            multiLine: true
        });

        expect(wrapper.find('.is-multi-line').exists()).toBeTruthy();
    })

    it('test prop strip', () => {
        const wrapper = shallowMount(BaseInfoItem);

        expect(wrapper.find('.is-strip').exists()).toBeFalsy();

        wrapper.setProps({
            strip: true
        });

        expect(wrapper.find('.is-strip').exists()).toBeTruthy();
    })

    it('test slot', () => {
        const wrapper = shallowMount(BaseInfoItem, {
            slots: {
                label: 'hello',
                value: 'sdf234'
            }
        });

        expect(wrapper.find('.sdxv-info-container__item--label').text()).toEqual('hello');
        expect(wrapper.find('.sdxv-info-container__item--value').text()).toEqual('sdf234');
    })
})