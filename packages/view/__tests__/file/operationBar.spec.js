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

const OperationBar = require('../../components/file/src/OperationBar').default;

let wrapper;
const fileProvider = {
    isProjectRoot() {}
};
describe('OperationBar', () => {

    afterEach(() => {
        wrapper = null;
    });

    it('搜索状态下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: true,
                    rootKind: '',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(true);
    });

    it('普通目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: '',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(true);
    });

    it('我的共享根目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'MY_SHARE',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => true,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(false);
    });

    it('我的共享子目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'MY_SHARE',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(false);
    });

    it('接收的共享根目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'ACCEPTED_SHARE',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => true,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(false);
    });

    it('接收的共享子目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'ACCEPTED_SHARE',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(false);
    });

    it('协作项目共享根目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'PROJECT_SHARE',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => true,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(false);
    });

    it('协作项目共享子目录下按钮展示', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: 'PROJECT_SHARE',
                    currentPath: '/fixed-project-share-files/xxx/xxxx',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        expect(wrapper.find('.sdxv-operation-bar__operation-mkdir').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-upload').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-share').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-cshare').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-download').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-copy').exists()).toBe(false);
        expect(wrapper.find('.sdxv-operation-bar__operation-move').exists()).toBe(true);
        expect(wrapper.find('.sdxv-operation-bar__operation-del').exists()).toBe(true);
    });

    it('点击按钮触发回调', () => {
        wrapper = mount(OperationBar, {
            localVue,
            provide: {
                fileManager: {
                    isSearch: false,
                    rootKind: '',
                    currentPath: '/xx/xxx/xxxx',
                    checked: [{
                        name: 'file1',
                        fileShareId: ''
                    }, {
                        name: 'file2',
                        fileShareId: ''
                    }],
                    isAcceptedRoot:() => false,
                    isProjectRoot: () => false,
                    isMyShareRoot: () => false,
                    $refs: {
                        fileTable: {
                            btnStatus: {
                                batchDownloading: false
                            }
                        }
                    }
                }
            },
            mocks: {
                $route: {
                    query: {

                    }
                }
            }
        });
        const download = jest.fn(),
            mkdir = jest.fn(),
            move = jest.fn(),
            share = jest.fn(),
            cancelShare = jest.fn(),
            del = jest.fn(),
            copy = jest.fn();
        wrapper.setMethods({
            createFolder: mkdir,
            handleDownload: download,
            handleShare: share,
            handleCancelShare: cancelShare,
            handleCopy: copy,
            handleMove: move,
            handleDelete: del
        });
        wrapper.find('.sdxv-operation-bar__operation-mkdir').trigger('click');
        expect(mkdir).toBeCalled();
        wrapper.find('.sdxv-operation-bar__operation-share').trigger('click');
        expect(share).toBeCalled();
        wrapper.find('.sdxv-operation-bar__operation-download').trigger('click');
        expect(download).toBeCalled();
        wrapper.find('.sdxv-operation-bar__operation-move').trigger('click');
        expect(move).toBeCalled();
        wrapper.find('.sdxv-operation-bar__operation-del').trigger('click');
        expect(del).toBeCalled();
    });
});
