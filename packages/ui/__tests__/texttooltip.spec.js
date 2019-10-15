import { shallowMount, mount } from "@vue/test-utils";
import TextTooltip from '../components/text-tooltip';

describe('TextTooltip', () => {
     it('title属性作为tooltip展示', () => {
         const wrapper = shallowMount(TextTooltip, {
             propsData: {
                 title: 'test title',
                 content: 'test content'
             }
         });
         expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeTruthy();
         expect(wrapper.find('.sdxu-text-tooltip__main').text()).toEqual('test content');
         expect(wrapper.find('.sdxu-text-tooltip div').text()).toEqual('test title');
     });

     it('不传title时，默认以content作为tooltip展示', () => {
         const wrapper = shallowMount(TextTooltip, {
             propsData: {
                 title: '',
                 content: 'test content'
             }
         });
         expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeTruthy();
         expect(wrapper.find('.sdxu-text-tooltip__main').text()).toEqual('test content');
         expect(wrapper.find('.sdxu-text-tooltip div').text()).toEqual('test content');
     });

     it('content以slot的方式传入，同时不设置title', () => {
         const wrapper = shallowMount(TextTooltip, {
             slots: {
                 default: '<span>this is content</span>'
             }
         });
         expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeFalsy();
         expect(wrapper.html()).toEqual('<span><span>this is content</span></span>');
     });

     it('content以slot的方式传入,同时设置title', () => {
         const wrapper = shallowMount(TextTooltip, {
             propsData: {
                 title: 'test title'
             },
             slots: {
                 default: '<span>this is content</span>'
             }
         });
         expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeTruthy();
         expect(wrapper.find('.sdxu-text-tooltip__main').html().indexOf('<span>this is content</span>') > 0 ).toBeTruthy();
         expect(wrapper.find('.sdxu-text-tooltip div').text()).toEqual('test title');
     });

     it('content接受字符串数组传参,并以文本的形式展示', () => {
         const wrapper = shallowMount(TextTooltip, {
             propsData: {
                 content: ['this', 'is', 'content']
             }
         });
         expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeTruthy();
         expect(wrapper.find('.sdxu-text-tooltip__main').text()).toEqual('this,is,content');
         expect(wrapper.find('.sdxu-text-tooltip div').element.innerHTML.trim()).toEqual('this,is,content');
     });

    it('content接受字符串数组传参,并以inline-block的形式展示', () => {
        const wrapper = shallowMount(TextTooltip, {
            propsData: {
                content: ['this', 'is', 'content'],
                tipType: 'inline-block'
            }
        });
        expect(wrapper.find('.sdxu-text-tooltip').exists()).toBeTruthy();
        expect(wrapper.find('.sdxu-text-tooltip__main').text()).toEqual('this,is,content');
        expect(wrapper.find('.sdxu-text-tooltip div').findAll('.sdxu-text-tooltip__item').length).toEqual(3);
    });

    it('hover时，显示tooltip', done => {
        const wrapper = mount(TextTooltip, {
            propsData: {
                content: ['this', 'is', 'content'],
                tipType: 'inline-block'
            }
        });
        wrapper.find('.sdxu-text-tooltip__main').trigger('mouseover');
        wrapper.find('.sdxu-text-tooltip__main').trigger('hover');
        wrapper.find('.sdxu-text-tooltip__main').trigger('mouseenter');
        setTimeout(() => {
            expect(window.getComputedStyle(document.querySelector('.sdxu-text-tooltip__popper')).display).not.toEqual('none');
            done();
            document.querySelector('.sdxu-text-tooltip__popper').remove();
        }, 100);
    });
});

