jest.mock('../../../utils/src/api/project');

import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import SdxvUserResourceList from '../../components/resource-statistics/src/UserResourceList';
import { t } from '@sdx/utils/src/locale';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxvUserResourceList', () => {

    it('test props', done => {
        const wrapper = mount(SdxvUserResourceList, {
            localVue
        });
        expect(wrapper.vm.title).toBe('');
        expect(wrapper.vm.ranking).toBe(false);
        expect(wrapper.vm.searchable).toBe(true);
        expect(wrapper.vm.sortOrders.length).toBe(3);
        expect(wrapper.find('.sdxv-user-resource-list__more').exists()).toBeFalsy();
        expect(wrapper.find('.sdxv-user-resource-list__search').exists()).toBeTruthy();
        expect(wrapper.find('.sdxu-content-panel__title').find('span').text()).toBe(t('view.monitor.resourceStatistic.AllUserResourceStatistics'));
        expect(wrapper.find('.sdxv-user-resource-list__pagination').exists()).toBeTruthy();

        wrapper.setProps({
            title: '章三',
            ranking: true
        });

        setTimeout(() => {
            expect(wrapper.vm.sortOrders.length).toBe(1);
            expect(wrapper.find('.sdxu-content-panel__title').find('span').text()).toBe('章三');
            expect(wrapper.find('.sdxv-user-resource-list__more').exists()).toBeTruthy();
            expect(wrapper.find('.sdxv-user-resource-list__search').exists()).toBeFalsy();
            expect(wrapper.find('.sdxv-user-resource-list__pagination').exists()).toBeFalsy();
            wrapper.setProps({
                searchable: false,
                ranking: false
            })
            setTimeout(() => {
                expect(wrapper.vm.sortOrders.length).toBe(3);
                expect(wrapper.find('.sdxv-user-resource-list__more').exists()).toBeFalsy();
                expect(wrapper.find('.sdxv-user-resource-list__search').exists()).toBeFalsy();
                expect(wrapper.find('.sdxv-user-resource-list__pagination').exists()).toBeTruthy();
                done();
            }, 300);
        }, 300);
    })

    it('test method fetchData', done => {
        const wrapper = mount(SdxvUserResourceList, {
            localVue,
            propsData: {
                ranking: true
            }
        });

        setTimeout(() => {
            expect(wrapper.vm.userResourceList.length).toBeTruthy();
            expect(wrapper.vm.total).toBeTruthy();
            done();
        }, 300);
    })

    it('test excute handGotoUserResourceList when click more button', done => {
        const wrapper = mount(SdxvUserResourceList, {
            localVue,
            propsData: {
                ranking: true
            }
        });
        const handGotoUserResourceList = jest.fn();
        wrapper.setMethods({
            handGotoUserResourceList
        })
        
        setTimeout(() => {
            wrapper.find('.sdxv-user-resource-list__more').trigger('click');
            expect(handGotoUserResourceList).toBeCalled();
            done();
        }, 300);
    })
})