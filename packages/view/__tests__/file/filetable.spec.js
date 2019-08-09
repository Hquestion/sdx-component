import {shallowMount, mount, createLocalVue, createWrapper} from "@vue/test-utils";
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'babel-polyfill';
import flushPromise from 'flush-promises';
const localVue = createLocalVue();
localVue.use(ElementUI);

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const FileTable = require('../../components/file/src/FileTable').default;

let wrapper = null;

describe('FileTable', () => {
    beforeEach(() => {
        wrapper = mount(FileTable, {
            localVue,
            sync: false,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: '',
                    checked: [{
                        name: 'file1',
                        path: '/file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        path: '/file2',
                        fileShareId: ''
                    }],
                    checkedMap: {
                        '/file1': 0,
                        '/file2': 1
                    },
                    renderFiles: [{
                        name: 'file1',
                        fileShareId: '',
                        path: '/file1',
                        isFile: true,
                        user: {
                            fullName: 'test'
                        },
                        ownerId: '11'
                    }, {
                        name: 'file2',
                        fileShareId: '',
                        path: '/file2',
                        isFile: false,
                        user: {
                            fullName: 'test'
                        },
                        ownerId: '11'
                    }, {
                        name: 'file3',
                        fileShareId: '',
                        path: '/file3',
                        isFile: false,
                        user: {
                            fullName: 'test'
                        },
                        ownerId: '11'
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    isShareRoot:() => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            stubs: {
                FileName: true,
                SdxvFolderSelect: true,
                SdxwShareSetting: true
            }
        })
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('文件列表渲染正确', done => {
        setTimeout(() => {
            expect(wrapper.find('.sdxu-table').exists()).toBeTruthy();
            expect(wrapper.find('.sdxv-file-table__checkbar').exists()).toBe(true);
            expect(wrapper.find('.sdxv-file-table__checkbar').isVisible()).toBe(true);
            expect(wrapper.find('.sdxv-file-table__checkbar').text().indexOf('已选中2个') >= 0).toBe(true);
            expect(wrapper.find('thead').exists()).toBe(false);

            const tableRows = wrapper.findAll('.el-table__row');
            expect(tableRows.length).toBe(3);
            expect(wrapper.findAll('filename-stub').length).toBe(3);

            expect(tableRows.at(0).find('.sdxu-icon-button-group').exists()).toBe(true);
            expect(tableRows.at(0).find('.sdxu-icon-button-group').findAll('.sdxu-icon-button').length).toBe(7);
            expect(tableRows.at(0).find('.sdxu-icon-button-group').findAll('.sdxu-icon-button-group__ellipse-item').length).toBe(4);
            done();
        }, 500);
    });

    it('切换选中文件，checkbar变化', done => {
        setTimeout(async () => {
            const unselectedRow = wrapper.findAll('.el-table__row input[type=checkbox]').at(2);
            unselectedRow.trigger('click');
            await flushPromise();
            expect(unselectedRow.element.checked).toBe(true);
            expect(wrapper.vm.fileManager.checked.length).toBe(3);
            wrapper.vm.$forceUpdate();
            await flushPromise();
            expect(wrapper.find('.sdxv-file-table__checkbar').text().indexOf('已选中3个') >= 0).toBe(true);
            wrapper.vm.fileManager.checked.length = 0;
            wrapper.vm.$forceUpdate();
            await flushPromise();
            expect(wrapper.find('.sdxv-file-table__checkbar').isVisible()).toBe(false);
            expect(wrapper.find('thead').exists()).toBe(true);
            done();
        }, 500);
    });

    it('点击按钮，触发相应操作', async done => {
        setTimeout(async () => {
            const rowWrapper = wrapper.find('.el-table__row');
            const buttonWrappers = rowWrapper.findAll('.sdxu-icon-button-group .sdxu-icon-button');

            buttonWrappers.at(0).trigger('click');
            await flushPromise();
            setTimeout(async () => {
                const shareDialog = wrapper.find('sdxwsharesetting-stub');
                expect(shareDialog.isVisible()).toBe(true);

                const downloadMock = jest.fn();

                wrapper.vm.OPERATION_MAP['DOWNLOAD'] = downloadMock;
                wrapper.vm.$forceUpdate();
                await flushPromise();
                buttonWrappers.at(1).trigger('click');
                expect(downloadMock).toBeCalled();

                const ellipseButtons = wrapper.findAll('.sdxu-icon-button-group .sdxu-icon-button-group__ellipse-item');

                ellipseButtons.at(0).trigger('click');
                await setImmediate(() => {});
                expect(wrapper.find('sdxvfolderselect-stub').isVisible()).toBe(true);

                ellipseButtons.at(1).trigger('click');
                await flushPromise();
                expect(wrapper.vm.editingRow.name).toBe('file1');

                ellipseButtons.at(2).trigger('click');
                const bodyWrapper = createWrapper(document.body);
                expect(bodyWrapper.find('.sdxu-message-box').exists()).toBe(true);
                document.body.innerHTML = '';

                const pathMock = jest.fn();
                wrapper.vm.OPERATION_MAP['PATH'] = pathMock;
                wrapper.vm.$forceUpdate();
                await flushPromise();
                ellipseButtons.at(3).trigger('click');
                expect(pathMock).toBeCalled();
                done();
            }, 100)

        }, 500);
    });
});
