import { shallowMount } from '@vue/test-utils';
import SdxuRadialProgress from '../components/radial-progress';

describe('RadialProgress', () => {
    it('test render', () => {
        const wrapper = shallowMount(SdxuRadialProgress, {
            propsData: {
                totalSteps: 10,
                completedSteps: 5
            }
        });

        expect(wrapper.classes('sdxu-radial-progress')).toBe(true);
        expect(wrapper.find('.sdxu-radial-progress__inner').exists()).toBe(true);
    })
})