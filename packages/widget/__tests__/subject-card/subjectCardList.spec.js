import { shallowMount } from '@vue/test-utils';
import SdxwSubjectCardList from '../../components/subject-card/src/SubjectCardList';

describe('SdxwSubjectCardList', () => {

    it('test render', () => {
        const wrapper = shallowMount(SdxwSubjectCardList);

        expect(wrapper.classes('sdxw-subject-card-list')).toBe(true);
    });
})