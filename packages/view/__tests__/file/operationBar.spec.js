import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);
import OperationBar from '../../components/file/src/OperationBar';

let wrapper;
describe('OperationBar', () => {
    beforeEach(() => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {}
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
    });

    afterEach(() => {
        wrapper = null;
    });
});
