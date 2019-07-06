<template>
    <SdxuContentPanel
        :fullscreen="true"
        class="sdxv-file-main"
    >
        <OperationBar ref="operationBar" />
        <BreadcrumbBar />
        <FileTable ref="fileTable" />
        <SdxvFileTask :visible.sync="taskVisible" ref="fileTask"/>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import Dexie from 'dexie';
import OperationBar from './OperationBar';
import FileTable from './FileTable';

import { getFilesList, searchFiles, getMyShare, getMyAcceptedShare, getProjectShare, searchShareFiles } from '@sdx/utils/src/api/file';
import { rootKinds, fixedRows, fixedRowsKeyMap, getDirRootKind, rootKindPathMap, PROJECT_SHARE_PATH, MY_SHARE_PATH, ACCEPTED_SHARE_PATH } from './helper/fileListTool';
import BreadcrumbBar from './BreadcrumbBar';
import SdxvFileTask from './popup/FileTask';

console.log(searchShareFiles.cancelTimer);

export default {
    name: 'SdxvFileMain',
    data() {
        return {
            // 选中的文件列表
            checked: [],
            // 映射path与在checked中的下表，提升查找性能
            checkedMap: {},
            // 是否全选，全选时需要在加载下一页的时候默认选中加载出来的路径列表
            isCheckAll: false,
            // 搜索关键字
            searchKey: '',
            // 动态渲染到列表中的文件列表
            renderFiles: [],
            // 当前路径下的文件列表
            fileList: [],
            // 当前路径下总文件数
            total: 0,
            // 当前路径下已加载的文件总数
            loadedTotal: 0,
            // 当前路径下的分页页码，路径变更时，重置pageIndex
            pageIndex: 1,
            // 每页文件个数
            pageSize: 100,
            // 当前是否位于根路径
            isRoot: true,
            // 当前路径
            currentPath: '/',
            // 当前路径的详细信息
            currentPathMeta: {},
            // 根路径类型，默认为空表示普通文件夹，用于区分我的共享/接收的共享/项目共享
            rootKind: '',
            // 是否处于搜索模式
            isSearch: false,
            // 是否正在请求数据
            loading: false,
            // 排序信息
            orderBy: 'updatedAt',
            order: 'desc',
            fixedRows,
            taskVisible: false,
            uploadingFiles: []
        };
    },
    components: {
        SdxvFileTask,
        BreadcrumbBar,
        FileTable,
        OperationBar,
        SdxuContentPanel
    },
    provide(){
        return {
            fileManager: this
        };
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    methods: {
        isProjectRoot() {
            return this.currentPath === PROJECT_SHARE_PATH;
        },
        isAcceptedRoot() {
            return this.currentPath === ACCEPTED_SHARE_PATH;
        },
        isMyShareRoot() {
            return this.currentPath === MY_SHARE_PATH;
        },
        isShareRoot() {
            return !!fixedRowsKeyMap[this.currentPath];
        },
        resetFlags() {
            // 重置页码
            this.pageIndex = 1;
            // 重置缓存的fileList
            this.renderFiles = [];
            this.fileList = [];
            this.total = 0;
            this.loadedTotal = 0;
            this.searchKey = '';
            this.resetCheck();
        },
        resetCheck() {
            this.checked = [];
            this.checkedMap = {};
            this.isCheckAll = false;
        },
        enterDirectory(dir) {
            this.resetFlags();
            this.isSearch = false;
            // 更新路径
            this.currentPath = dir;
            this.isRoot = dir === '/';
            this.rootKind = getDirRootKind(dir);
            // 修改为加载中，准备获取数据
            this.loading = true;
            this.db.list.clear();
            // 滚动到页面顶部
            this.$refs.fileTable.init();

            let defer;
            const deferMap = {
                [rootKinds.MY_SHARE]: this.loadMyShare,
                [rootKinds.ACCEPTED_SHARE]: this.loadAcceptedShare,
                [rootKinds.PROJECT_SHARE]: this.loadProjectShare
            };
            if (this.rootKind === '') {
                defer = this.loadFileList();
            } else {
                defer = (this.isShareRoot() ? deferMap[this.rootKind] : this.loadFileList)();
            }
            return defer.then(res => {
                let fileList = res.children;
                this.total = res.childrenCount;
                this.loading = false;
                if (this.isRoot) {
                    fileList = fixedRows.concat(fileList);
                    this.total = res.childrenCount + fixedRows.length;
                }
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.error(e);
                });
            }, () => {
                let fileList = [];
                this.total = 0;
                this.loading = false;
                if (this.isRoot) {
                    fileList = fixedRows;
                    this.total = fixedRows.length;
                }
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.error(e);
                });
            }).then(res => {
                this.$nextTick(() => {
                    this.$refs.fileTable.calcViewportVisible();
                });
            });
        },
        enterSearch(dir, key) {
            this.resetFlags();
            this.isSearch = true;
            this.searchKey = key;
            this.currentPath = dir;
            this.isRoot = dir === '/';
            this.rootKind = getDirRootKind(dir);
            // 修改为加载中，准备获取数据
            this.loading = true;
            this.db.list.clear();
            // 滚动到页面顶部
            this.$refs.fileTable.init();
            return this.loadSearchResult().then(res => {
                let fileList = res.files;
                this.total = res.total;
                this.loading = false;
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.error(e);
                });
            }, () => {
                this.total = 0;
                this.loading = false;
            }).then(res => {
                this.$nextTick(() => {
                    this.$refs.fileTable && this.$refs.fileTable.calcViewportVisible();
                });
            }, err => {
                this.loading = false;
                window.console.error(err);
            });
        },
        loadNextPage() {
            if (this.loading) return;
            if (this.loadedTotal >= this.total) return;
            this.loading = true;
            this.pageIndex ++;
            if (this.isSearch) {
                // 搜所分页
                return this.loadSearchResult().then(res => {
                    let fileList = res.files;
                    this.loading = false;
                    return this.db.list.bulkAdd(fileList).then(() => {
                        this.loadedTotal += fileList.length;
                    }, e => {
                        window.console.log(e);
                    });
                },() => {
                    this.loading = false;
                });
            } else {
                // 根据当前路径分页请求
                return this.loadFileList().then(res => {
                    let fileList = res.children;
                    this.loading = false;
                    return this.db.list.bulkAdd(fileList).then(() => {
                        this.loadedTotal += fileList.length;
                    }, e => {
                        window.console.log(e);
                    });
                },() => {
                    this.loading = false;
                });
            }
        },
        loadFileList() {
            if (this.rootKind === '') {
                return getFilesList({
                    start: (this.pageIndex - 1) * this.pageSize + 1,
                    count: this.pageSize,
                    path: this.currentPath,
                    orderBy: this.orderBy,
                    order: this.order
                });
            } else {
                let path = '', ownerId;
                path = this.currentPath.replace(eval(`/\\${rootKindPathMap[this.rootKind]}(.*)/`), '$1');
                if (this.rootKind === rootKinds.PROJECT_SHARE) {
                    path = '/' + path.split('/').slice(2).join('/');
                }
                ownerId = this.$route.query.ownerId;
                return getFilesList({
                    ownerId: ownerId,
                    start: (this.pageIndex - 1) * this.pageSize + 1,
                    count: this.pageSize,
                    path: path,
                    orderBy: this.orderBy,
                    order: this.order
                });
            }
        },
        loadShare(kind, start, count) {
            let map = {
                [rootKinds.MY_SHARE]: getMyShare,
                [rootKinds.ACCEPTED_SHARE]: getMyAcceptedShare,
                [rootKinds.PROJECT_SHARE]: getProjectShare,
            };
            return map[kind]({
                start: start || (this.pageIndex - 1) * this.pageSize + 1,
                count: count || this.pageSize,
                path: '',
                orderBy: this.orderBy,
                order: this.order
            });
        },
        loadMyShare(start, count) {
            return this.loadShare(rootKinds.MY_SHARE, start, count);
        },
        loadAcceptedShare(start, count) {
            return this.loadShare(rootKinds.ACCEPTED_SHARE, start, count);
        },
        loadProjectShare(start, count) {
            return this.loadShare(rootKinds.PROJECT_SHARE, start, count);
        },
        loadSearchResult() {
            if (this.isShareRoot()) {
                return this.loadShare(this.rootKind, 1, -1).then(res => {
                    const files = res.children;
                    let paths = [], uuids = [];
                    files.forEach(file => {
                        paths.push(this.rootKind === rootKinds.PROJECT_SHARE ? '/' : file.path);
                        uuids.push(file.ownerId);
                    });
                    return searchShareFiles({
                        uuids: uuids,
                        paths: paths,
                        keyword: this.searchKey
                    });
                });
            } else {
                let path = this.currentPath;
                let ownerId = '';
                if (this.rootKind !== '') {
                    // 协作项目的第一级为虚假目录，替换成/
                    if (this.rootKind === rootKinds.PROJECT_SHARE) {
                        path = '/' + this.currentPath.split('/').slice(3).join('/');
                        ownerId = this.$route.query.ownerId;
                    } else {
                        path = '/' + this.currentPath.split('/').slice(2).join('/');
                        ownerId = this.$route.query.ownerId;
                    }
                }
                return searchFiles({
                    ownerId: ownerId,
                    start: (this.pageIndex - 1) * this.pageSize + 1,
                    count: this.pageSize,
                    path,
                    orderBy: this.orderBy,
                    order: this.order,
                    keyword: this.searchKey
                });
            }
        },
        async getRenderList(offset, limit) {
            // 获取需要渲染到列表中的数据
            return Object.freeze(await this.db.list.offset(offset).limit(limit).toArray());
        },
        getUploadFiles() {
            return this.$refs.operationBar.$refs.fileUploader.getUploadFiles();
        }
    },
    mounted() {
        const db = new Dexie('SdxvFile');
        db.version(1).stores({
            list: '++,path,ownerId,name,filesystem,isFile,mimeType,fileExtension,fileShareId,createdAt,updatedAt,size'
        });
        this.db = db;
        this.currentPath = this.$route.query.path || '/';
        if (this.$route.query.search) {
            this.enterSearch(this.currentPath, this.$route.query.search);
        } else {
            this.enterDirectory(this.currentPath);
        }
    },
    // activated() {
    //     const db = new Dexie('SdxvFile');
    //     db.version(1).stores({
    //         list: '++,userId,name,path,filesystem,isFile,mimeType,fileExtension,fileShareDetailId,createdAt,updatedAt,size'
    //     });
    //     this.db = db;
    //     this.currentPath = this.$route.query.path || '/';
    //     if (this.$route.query.search) {
    //         this.enterSearch(this.currentPath, this.$route.query.search);
    //     } else {
    //         this.enterDirectory(this.currentPath);
    //     }
    //     this.unwatch = this.$watch('$route', (val, oldval) => {
    //         this.currentPath = val.query.path || '/';
    //         if (val.query.search) {
    //             this.enterSearch(this.currentPath, val.query.search);
    //         } else {
    //             if (val.query.path !== oldval.query.path || val.query.search !== oldval.query.search) {
    //                 this.enterDirectory(this.currentPath);
    //             }
    //         }
    //     });
    // },
    // deactivated() {
    //     this.unwatch && this.unwatch();
    // },
    watch: {
        $route(val, oldval) {
            searchFiles.cancelTimer();
            searchShareFiles.cancelTimer();
            this.currentPath = val.query.path || '/';
            if (val.query.search) {
                this.enterSearch(this.currentPath, val.query.search);
            } else {
                if (val.query.path !== oldval.query.path || val.query.search !== oldval.query.search) {
                    this.enterDirectory(this.currentPath);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.sdxv-file-main {
    height: 100%;
}
</style>
