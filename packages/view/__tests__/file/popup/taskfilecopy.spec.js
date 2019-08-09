import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
import Vue from 'vue/dist/vue.min';
localVue.use(ElementUI);

import TaskFileUpload from '../../../components/file/src/popup/TaskFileCopy';

let wrapper = null;

describe('TaskFileUpload', function () {
    beforeEach(() => {
        wrapper = mount(TaskFileUpload, {
            localVue,
            sync: false,
            provide: {
                taskPop: {}
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('无数据时渲染暂无数据', async done => {
        expect(wrapper.find('.el-table__empty-block').exists()).toBe(true);
        done();
    });

    it('修改数据正确渲染', async done => {
        wrapper.setData({
            copyFileList: [
                {
                    extra: {
                        copiedBytes: 100,
                        totalBytes: 1024,
                        progressInPercentage: 10,
                        speedPerSecInBytes: 10,
                        remainingTimeInSec: 50
                    },
                    args: {
                        path: '/path1',
                        targetPath: '/path2',
                        state: 'PENDING'
                    },
                    jobId: '1'
                }
            ]
        });
        await flushPromise();
        expect(wrapper.find('.el-table__empty-block').exists()).toBe(false);
        expect(wrapper.findAll('tbody .el-table__row').length).toBe(1);
        expect(wrapper.findAll('tbody tr').length).toBe(2);
        expect(wrapper.find('.el-table__expanded-cell').exists()).toBe(true);
        done();
    });

    it('点击取消按钮时调用删除函数', async done => {
        wrapper.setData({
            copyFileList: [
                {
                    extra: {
                        copiedBytes: 100,
                        totalBytes: 1024,
                        progressInPercentage: 10,
                        speedPerSecInBytes: 10,
                        remainingTimeInSec: 50
                    },
                    args: {
                        path: '/path1',
                        targetPath: '/path2',
                        state: 'PENDING'
                    },
                    jobId: '1'
                }
            ]
        });
        await flushPromise();
        const fn = jest.fn();
        wrapper.setMethods({
            handleStopTask: fn
        });
        wrapper.find('.sdxu-icon-button').trigger('click');
        await flushPromise();
        expect(fn).toBeCalled();
        expect(fn).toBeCalledWith('1');
        done();
    });
});
