import { mount, shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vue from 'vue/dist/vue.min';
import SdxuLogDetail from '../components/log-detail';
const localVue = createLocalVue();
localVue.use(ElementUI);

describe('SdxuLogDetail', () => {
    it('test prop content', () => {
        const wrapper = mount(SdxuLogDetail, {
            localVue,
            propsData: {
                content: 'this is a log'
            }
        });
        
        expect(wrapper.find('.sdxu-log-detail__container--content').text()).toBe('this is a log');
    });

    it('test prop height', () => {
        const wrapper = mount(SdxuLogDetail, {
            localVue, 
            propsData: {
                height: '70vh'
            }
        });

        expect(wrapper.props('height')).toBe('70vh');
    });

    // todo: element-ui loading dom doesn't render

    // it('test prop loading', () => {
    //     const vm = new Vue({
    //         template: '<SdxuLogDetail :preLoading="true" :sufLoading="true" :loading="true"></SdxuLogDetail>',
    //         components: {
    //             SdxuLogDetail
    //         }
    //     }).$mount(document.createElement('div'));
    //     vm.child = vm.$children[0];
    //     const wrapper = createWrapper(vm);

    //     // const wrapper = mount(SdxuLogDetail, {
    //     //     localVue,
    //     //     propsData: {
    //     //         preLoading: true,
    //     //         sufLoading: true,
    //     //         loading: true
    //     //     }
    //     // });

    //     

    //     // expect(wrapper.find('.sdxu-log-detail__pre-loading').exists()).toBe(false);
    //     // expect(wrapper.find('sdxu-log-detail__suf-loading').exists()).toBe(false);
    //     // expect(wrapper.classes('sdxu-log-detail')).toBe(true);
    //     // expect(wrapper.classes('el-loading-parent--relative')).toBe(true);
    //     // setTimeout(() => {

    //     // })
    //     console.error(wrapper.html())
    //     expect(wrapper.find('.sdxu-log-detail > .el-loading-mask').isVisible()).toBe(true);
    // });

    // todo: scroll event doesn't response

    // it('test scroll event', (done) => {
    //     const mockFn = jest.fn();
    //     const wrapper = mount(SdxuLogDetail, {
    //         localVue,
    //         propsData: {
    //             content: 'test\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\ntest\n'
    //         },
    //         listeners: {
    //             scroll: mockFn
    //         }
    //     });

    //     // wrapper.setMethods({
    //     //     handleScroll: mockFn
    //     // });
    //     // wrapper.vm.$refs.scroll.$refs.scroll.scrollTo({
    //     //     y: '100%'
    //     // });
    //     // wrapper.find({ ref: 'scroll' }).vm.$refs.scroll.scrollTo({
    //     //     y: '100%'
    //     // })
    //     // expect(mockFn).toBeCalled();
    //     setTimeout(() => {
    //         // expect(mockFn).toBeCalled();
    //         // expect(mockFn).toHaveBeenCalledTimes(90);
    //         expect(wrapper.find('.sdxu-log-detail').exists()).toBe(false);
    //         done();
    //     }, 300);
        
    // })
})