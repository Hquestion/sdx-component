import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';
localVue.use(ElementUI);
import TaskFileUpload from '../../../components/file/src/popup/TaskFileUpload';

let wrapper = null;

describe('TaskFileUpload', function () {

    beforeEach(() => {
        wrapper = mount(TaskFileUpload, {
            localVue,
            sync: false,
            provide: {
                fileManager: {
                    uploadingFiles: [
                        {
                            name: 'test',
                            size: 1024,
                            status: 'uploading',
                            percentage: 10
                        }
                    ]
                }
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('列表渲染一条数据', async done => {
        await flushPromise();
        expect(wrapper.find('.sdxu-table').exists()).toBe(true);
        expect(wrapper.findAll('tbody .el-table__row').length).toBe(1);
        const headers = wrapper.findAll('thead th');
        expect(headers.at(1).text()).toEqual('大小');
        expect(headers.at(2).text()).toEqual('状态');
        expect(headers.at(3).text()).toEqual('操作');
        const rowCells = wrapper.find('tbody .el-table__row').findAll('.cell');
        expect(rowCells.at(0).text()).toEqual('test');
        expect(rowCells.at(1).text()).toEqual('1 KB');
        expect(rowCells.at(2).find('.el-progress-bar__inner').element.style.width).toEqual('10%');
        expect(rowCells.at(2).find('.el-progress__text').text()).toEqual('10%');
        expect(rowCells.at(3).find('.sdx-tingzhi').exists()).toEqual(true);
        done();
    });

    it('点击按钮删除记录', async done => {
        const fn = jest.fn(() => {
            wrapper.vm.fileManager.uploadingFiles.length = 0;
            wrapper.vm.$forceUpdate();
        });
        wrapper.setMethods({
            handleCancelUpload: fn
        });
        await flushPromise();
        const button = wrapper.find('.sdx-tingzhi');
        button.trigger('click');
        await flushPromise();
        expect(fn).toBeCalled();
        done();
    });
});
