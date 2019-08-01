// jest.mock('../../../utils/src/api/file');

import Vue from 'vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Button from '../../ui/components/button';

const mockScript = () => {
    const script = document.createElement('script');
    script.setAttribute('data-injectcss', '1');
    window.__iconfont__svg__cssinject__ = true;
    document.body.appendChild(script);
};
mockScript();

const FileSelect = require('../components/file-select').default;
import ElementUI from 'element-ui';

const localVue = createLocalVue();

localVue.use(ElementUI);

describe('FileSelectMix', () => {
   it('source为local且limit为1时，只能从本地选择文件', () => {
       var wrapper = mount(FileSelect.FileSelectMix, {
           localVue,
           attachToDocument: false,
           propsData: {
               source: 'local',
               value: '/',
               limit: 1
           }
       });
       var buttons = wrapper.findAll('.sdxu-button__dropdown--main .sdxu-button');
       expect(buttons.length).toBe(1);
       expect(buttons.at(0).text()).toEqual('本地文件');
   });
    it('source为local且limit大于1时，只能从本地选择文件和文件夹', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'local',
                value: '/',
                limit: -1
            }
        });
        var buttons = wrapper.findAll('.sdxu-button__dropdown--main .sdxu-button');
        expect(buttons.length).toBe(2);
        expect(buttons.at(0).text()).toEqual('本地文件');
        expect(buttons.at(1).text()).toEqual('本地文件夹');
    });

    it('source为ceph时且limit大于1时，只能从平台选择', done => {
        setTimeout(() => {
            var wrapper = mount(FileSelect.FileSelectMix, {
                localVue,
                attachToDocument: false,
                propsData: {
                    source: 'ceph',
                    value: '/',
                    limit: -1
                }
            });
            var buttons = wrapper.findAll('.sdxu-button__dropdown--main > .sdxu-button');
            expect(buttons.length).toBe(1);
            expect(buttons.at(0).text().indexOf('平台文件') >= 0).toEqual(true);
            expect(buttons.at(0).text().indexOf('本地文件') < 0).toEqual(true);
            expect(buttons.at(0).text().indexOf('本地文件夹') < 0).toEqual(true);
            done();
        }, 100)
    });

    it('source为all时且limit大于1时，可以从本地和平台选择', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1
            }
        });
        var buttons = wrapper.findAll('.sdxu-button__dropdown--main > .sdxu-button');
        expect(buttons.length).toBe(3);
    });

    it('inline', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true
            }
        });
        expect(wrapper.classes('is-inline')).toBeTruthy();
    });

    it('checkType passed to FileSelectPop', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file'
            }
        });
        expect(wrapper.find(FileSelect.FileSelectPop).vm.checkType).toEqual('file')
    });

    it('accept 属性被传递到upload和fileSelectPop', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file',
                accept: '.py'
            }
        });
        expect(wrapper.find(FileSelect.FileSelectPop).vm.accept).toEqual('.py');
        expect(wrapper.find('.sdxw-file-select__accept-tip').text().indexOf('.py')>=0).toBeTruthy();
        const fileInput = wrapper.findAll('input[type=file]');
        expect(fileInput.at(0).attributes('accept')).toEqual('.py');
        expect(fileInput.at(1).attributes('accept')).toEqual('.py');
    });

    it('userId,rootPath等其他属性被传递到fileSelectPop', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file',
                accept: '.py',
                userId: '123',
                rootPath: '/aa',
                checkable: false
            }
        });
        expect(wrapper.find(FileSelect.FileSelectPop).vm.userId).toEqual('123');
        expect(wrapper.find(FileSelect.FileSelectPop).vm.rootPath).toEqual('/aa');
        expect(wrapper.find(FileSelect.FileSelectPop).vm.checkable).toEqual(false);
    });

    it('showUploadList为false时不显示上传列表', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file',
                accept: '.py',
                userId: '123',
                rootPath: '/aa',
                checkable: false,
                showUploadList: false
            }
        });
        expect(wrapper.find('.sdxw-file-select__files').exists()).toBeFalsy();
    });

    it('icon', () => {
        var wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file',
                accept: '.py',
                userId: '123',
                rootPath: '/aa',
                checkable: false,
                showUploadList: false,
                icon: 'sdx-icon-plus'
            }
        });
        expect(wrapper.find('.sdx-icon-plus').exists()).toBe(true);
    });
});

describe('Upload', () => {
    let wrapper;
    let onExceed = jest.fn(),
        onProgress = jest.fn(),
        onError = jest.fn(),
        onSuccess = jest.fn();

    beforeEach(() =>{
        wrapper = mount(FileSelect.FileSelectMix, {
            localVue,
            attachToDocument: false,
            propsData: {
                source: 'all',
                value: '/',
                limit: -1,
                inline: true,
                checkType: 'file',
                accept: '.py',
                userId: '123',
                rootPath: '/aa',
                checkable: false,
                showUploadList: false,
                onExceedMaxSize: onExceed,
                onExceedMaxSizeDir: onExceed,
                onProgress: onProgress,
                onSuccess: onSuccess,
                onError: onError
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
        wrapper = null;
        onExceed = jest.fn();
        onProgress = jest.fn();
        onError = jest.fn();
        onSuccess = jest.fn();
    });





    it('handle onProgress', done => {
        setTimeout(() => {
            const uploader = wrapper.vm.$refs.fileSelect;
            const file = {size: 300*1024*1024, file: 'test.png'};
            uploader.handleProgress({}, file);
            expect(onProgress).toBeCalled();
            done();
        }, 300);
    });

    it('handle onError', done => {
        setImmediate(() => {
            const err = {data: {code: '100000'}, config: {url: '/', method: 'GET'}, status: 400};
            const file = {size: 300*1024*1024, file: 'test.png'};
            wrapper.vm.onFileError(err, file);
            expect(onError).toBeCalled();
            done()
        });
    });


    it('handle onExceed', done => {
        const file = {size: 300*1024*1024, file: 'test.png'};
        wrapper.vm.beforeUpload(file).then(() => {
            expect(onExceed).not.toBeCalled();
            done();
        }, () => {
            expect(onExceed).toBeCalled();
            done();
        });
    });

});
