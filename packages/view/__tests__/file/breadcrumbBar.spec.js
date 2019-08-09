import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

import BreadcrumbBar from '../../components/file/src/BreadcrumbBar';

let wrapper = null;

describe('BreadcrumbBar', () => {
    beforeEach(() => {
        wrapper = shallowMount(BreadcrumbBar, {
            mocks: {
                $route: {
                    name: 'test',
                    path: '/test',
                    query: {
                        path: '/folder1/folder2/folder3'
                    },
                    params: {

                    }
                }
            },
            provide: {
                fileManager: {
                    rootKind: ''
                }
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });

    it('正确解析路由并显示', () => {
        console.log(wrapper.html());
        console.log(wrapper.vm.list);
        expect(wrapper.vm.list.length).toBe(4);
        expect(wrapper.vm.list[1]).toEqual({name: 'folder1', path: '/folder1'});
        expect(wrapper.vm.list[3]).toEqual({name: 'folder3', path: '/folder1/folder2/folder3'});
    });

    it('点击面包屑时，触发回调', () => {
        const breadWrapper = wrapper.find('ellipsebreadcrumb-stub');
        const fn = jest.fn();
        wrapper.setMethods({
            handleNav: fn
        });
        breadWrapper.vm.$emit('nav');
        expect(fn).toBeCalled();
    });
});
