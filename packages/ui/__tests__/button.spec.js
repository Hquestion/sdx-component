import { shallowMount } from '@vue/test-utils';
import Button from '../components/button';
import { t } from '@sdx/utils/src/locale';

describe('Button', () => {
    it('render a button with default name', () => {
        const wrapper = shallowMount(Button);
        expect(wrapper.find('.sdxui-button').text()).toEqual('OK');
        // expect(wrapper.find('.sdxui-button').text()).toEqual(t('ui.button.ok'));
    })

    it('render a button with custom name', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '确定'
            }
        });
        expect(wrapper.find('.sdxui-button').text()).toEqual('确定');
    })

    it('render a button with custom dom', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: '<div class="sdxui-button__name">OK</div>'
            }
        });
        expect(wrapper.find('.sdxui-button').contains('div.sdxui-button__name')).toBeTruthy();
    })
})