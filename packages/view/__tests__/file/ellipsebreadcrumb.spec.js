import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

import EllipseBreadcrumb from '../../components/file/src/EllipseBreadcrumb';

let wrapper;

describe('EllipseBreadcrumb', () => {
    beforeEach(() => {
        wrapper = shallowMount(EllipseBreadcrumb, {
            propsData: {
                breadcrumb: [
                    {name: 'level1'},
                    {name: 'level2'},
                    {name: 'level3'}
                ],
                maxVisible: 7
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    it('不超过maxVisible个时正常渲染', () => {
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').length).toEqual(3);
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(0).text()).toEqual('level1');
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(2).text()).toEqual('level3');
    });

    it('等于maxVisible个时正常渲染', () => {
        wrapper = shallowMount(EllipseBreadcrumb, {
            propsData: {
                breadcrumb: [
                    {name: 'level1'},
                    {name: 'level2'},
                    {name: 'level3'},
                    {name: 'level4'},
                    {name: 'level5'},
                    {name: 'level6'},
                    {name: 'level7'},
                ],
                maxVisible: 7
            }
        });
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').length).toEqual(7);
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(0).text()).toEqual('level1');
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(6).text()).toEqual('level7');
    });

    it('超过maxVisible个时，渲染省略号', () => {
        wrapper = shallowMount(EllipseBreadcrumb, {
            propsData: {
                breadcrumb: [
                    {name: 'level1'},
                    {name: 'level2'},
                    {name: 'level3'},
                    {name: 'level4'},
                    {name: 'level5'},
                    {name: 'level6'},
                    {name: 'level7'},
                    {name: 'level8'},
                    {name: 'level9'},
                ],
                maxVisible: 7
            }
        });
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').length).toEqual(7);
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(0).text()).toEqual('level1');
        expect(wrapper.findAll('.sdxu-ellipse-breadcrumb__name').at(6).text()).toEqual('level9');
        expect(wrapper.text().indexOf('...') > 0).toEqual(true);
    });

    it('点击时触发nav事件', () => {
        wrapper.findAll('.sdxu-ellipse-breadcrumb__item').at(1).trigger('click');
        expect(wrapper.emitted().nav).toBeTruthy();
    });
});
