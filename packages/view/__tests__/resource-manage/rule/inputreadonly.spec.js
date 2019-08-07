import InputReadonly from '../../../components/resource-manage/src/rule/InputReadonly';
import { shallowMount } from "@vue/test-utils";

describe('InputReadonly', () => {
    it('support size', () => {
        const wrapper = shallowMount(InputReadonly, {
            propsData: {
                size: 'small'
            },
            slots: {
                default: '<div>test</div>'
            }
        });
        expect(wrapper.classes('input-readonly--small')).toBe(true);
        expect(wrapper.html().indexOf('<div>test</div>') > 0).toBe(true);
    });
});
