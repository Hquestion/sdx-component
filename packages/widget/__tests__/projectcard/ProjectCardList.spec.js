import { shallowMount } from '@vue/test-utils';
import SdxwProjectCardList from '../../components/projectcard/src/ProjectCardList';

describe('SdxwProjectCardList', () => {

    it('test render', () => {
        const wrapper = shallowMount(SdxwProjectCardList);

        expect(wrapper.classes('sdxw-project-card-list')).toBe(true);
    });
})