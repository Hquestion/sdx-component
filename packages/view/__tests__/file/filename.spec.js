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

const FileName = require('../../components/file/src/FileName').default;

let wrapper = null;

describe('FileName', () => {
    beforeEach(() => {
        wrapper = shallowMount(FileName, {
            localVue,
            propsData: {
                row: {
                    name: 'file1.py',
                    path: '/file1.py',
                    ownerId: '123456',
                    fileExtension: '.py',
                    isFile: true
                }
            },
            provide: {
                fileTable: {
                    editingRow: null
                }
            }
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('渲染普通文件', async done => {
        await flushPromise();
        expect(wrapper.find('.sdxv-file__item-icon use[xlink:href="#sdx-morenwenjian"]').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file__item-name').html().indexOf('<span>file1.py</span>') > 0).toBe(true);
        done();
    });

    it('文件重命名或新增文件', () => {
        wrapper.destroy();
        wrapper = shallowMount(FileName, {
            localVue,
            propsData: {
                row: {
                    name: 'file1.py',
                    path: '/file1.py',
                    ownerId: '123456',
                    fileExtension: '.py',
                    isFile: true
                }
            },
            provide: {
                fileTable: {
                    editingRow: {
                        name: 'file1.py',
                        path: '/file1.py',
                        ownerId: '123456',
                        fileExtension: '.py',
                        isFile: true
                    }
                }
            }
        });
        expect(wrapper.find('sdxuinput-stub').exists()).toBe(true);
        expect(wrapper.find('.accept-icon').exists()).toBe(true);
        expect(wrapper.find('.cancel-icon').exists()).toBe(true);
        wrapper.find('.accept-icon').trigger('click');
        expect(wrapper.emitted('save-rename')).toBeTruthy();
        wrapper.find('.cancel-icon').trigger('click');
        expect(wrapper.emitted('cancel-rename')).toBeTruthy();
    });

    it('渲染zip文件', async done => {
        wrapper.setProps({
            row: {
                name: 'file2.zip',
                path: '/file2.zip',
                ownerId: '123456',
                fileExtension: '.zip',
                isFile: true
            }
        });
        expect(wrapper.find('elpopover-stub').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file__item-icon use[xlink:href="#sdx-yasuowenjian"]').exists()).toBe(true);
        done();
    });

    it('渲染文件夹', () => {
        wrapper.setProps({
            row: {
                name: 'file2',
                path: '/file2',
                ownerId: '123456',
                fileExtension: '',
                isFile: false
            }
        });
        expect(wrapper.find('.sdxv-file__item-icon use[xlink:href="#sdx-wenjianjia"]').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file__item-name').html().indexOf('<span>file2</span>') > 0).toBe(true);
        expect(wrapper.find('elpopover-stub').exists()).toBe(false);
        expect(wrapper.find('sdxuinput-stub').exists()).toBe(false);
    });

    it('渲染共享文件夹', () => {
        wrapper.setProps({
            row: {
                name: 'file2',
                path: '/file2',
                ownerId: '123456',
                fileExtension: '',
                isFile: false,
                fileShareId: '22'
            }
        });
        expect(wrapper.find('.sdxv-file__item-icon use[xlink:href="#sdx-yigongxiangwenjianjia"]').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file__item-name').html().indexOf('<span>file2</span>') > 0).toBe(true);
        expect(wrapper.find('elpopover-stub').exists()).toBe(false);
        expect(wrapper.find('sdxuinput-stub').exists()).toBe(false);
    });

    it('渲染前端写死的共享文件夹', () => {
        wrapper.setProps({
            row: {
                name: 'file3',
                path: '/file3',
                ownerId: '123456',
                fileExtension: '',
                isFile: false,
                fileShareId: '',
                fixed: true
            }
        });
        expect(wrapper.find('.sdxv-file__item-icon use[xlink:href="#sdx-gongxiangwenjianjia"]').exists()).toBe(true);
        expect(wrapper.find('.sdxv-file__item-name').html().indexOf('<span>file3</span>') > 0).toBe(true);
        expect(wrapper.find('elpopover-stub').exists()).toBe(false);
        expect(wrapper.find('sdxuinput-stub').exists()).toBe(false);
    });
});
