import { mount, createLocalVue } from '@vue/test-utils';
import 'babel-polyfill';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const SdxwTaskResourceList = require('@sdx/widget/components/task-list').default;
const SdxvTaskResourceRanking = require('../../components/resource-statistics/src/TaskResourceRanking').default;

describe('SdxvTaskResourceRanking', () => {

    it('dom render', () => {
        const wrapper = mount(SdxvTaskResourceRanking, {
            localVue
        });

        expect(wrapper.find('.sdxv-task-resource-ranking').exists()).toBeTruthy();
        expect(wrapper.find('.sdxv-task-resource-ranking__more').exists()).toBeTruthy();
        expect(wrapper.find(SdxwTaskResourceList).exists()).toBeTruthy();
    })

    it('test click event', done => {
        const wrapper = mount(SdxvTaskResourceRanking, {
            localVue
        });
        const handGotoTasksList = jest.fn();
        wrapper.setMethods({
            handGotoTasksList
        });
        setTimeout(() => {
            wrapper.find('.sdxv-task-resource-ranking__more').trigger('click');
            expect(handGotoTasksList).toBeCalled();
            done();
        }, 300);
        
    })
})