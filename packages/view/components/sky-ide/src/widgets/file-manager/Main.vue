<template>
    <!-- <SdxuContentPanel
        class="sdxv-file-main"
    > -->
    <div class="file-main">
        <OperationBar ref="operationBar" />
        <BreadcrumbBar ref="breadcrumbBar" />
        <FileTable ref="fileTable" />
    </div>
    <!-- </SdxuContentPanel> -->
</template>

<script>
// import SdxuContentPanel from '@sdx/ui/components/content-panel';
import Dexie from 'dexie';
import OperationBar from './OperationBar';
import FileTable from './FileTable';
import BreadcrumbBar from './BreadcrumbBar';

import { getFilesList } from '@sdx/utils/src/api/file';
// import { getFilesList, getMyShare, getMyAcceptedShare, getProjectShare } from '@sdx/utils/src/api/file';
// import { rootKinds, fixedRows, fixedRowsKeyMap, getDirRootKind, rootKindPathMap, PROJECT_SHARE_PATH, MY_SHARE_PATH, ACCEPTED_SHARE_PATH } from './helper/fileListTool';

export default {
    name: 'SdxvFileMain',
    data() {
        return {
            // 选中的文件列表
            checked: [],
            // 映射path与在checked中的下表，提升查找性能
            checkedMap: {},
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
            currentPath: this.rootPath,
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
            fixedRows: [],
            uploadingFiles: []
        };
    },
    props: {
        rootPath: {
            type: String,
            default: ''
        }
    },
    components: {
        BreadcrumbBar,
        FileTable,
        OperationBar
    },
    provide() {
        return {
            fileManager: this
        };
    },
    methods: {
        isProjectRoot() {
            return false;
            // return this.currentPath === PROJECT_SHARE_PATH;
        },
        isAcceptedRoot() {
            return false;
            // return this.currentPath === ACCEPTED_SHARE_PATH;
        },
        isMyShareRoot() {
            return false;
            // return this.currentPath === MY_SHARE_PATH;
        },
        isShareRoot() {
            return false;
            // return !!fixedRowsKeyMap[this.currentPath];
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
        },
        enterDirectory(dir) {
            this.resetFlags();
            this.isSearch = false;
            // 更新路径
            this.currentPath = dir;
            this.isRoot = dir === '/';
            // this.rootKind = getDirRootKind(dir);
            // 修改为加载中，准备获取数据
            this.loading = true;
            this.db.list.clear();
            // 滚动到页面顶部
            this.$refs.fileTable.init();

            let defer = this.loadFileList();
            return defer.then(res => {
                let fileList = res.children;
                this.total = res.childrenCount;
                this.loading = false;
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.error(e);
                });
            }, () => {
                let fileList = [];
                this.total = 0;
                this.loading = false;
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.error(e);
                });
            }).then(() => {
                this.$nextTick(() => {
                    this.$refs.fileTable.calcViewportVisible();
                });
            });
        },
        loadNextPage() {
            if (this.loading) return;
            if (this.loadedTotal >= this.total) return;
            this.loading = true;
            this.pageIndex++;
            // 根据当前路径分页请求
            return this.loadFileList().then(res => {
                let fileList = res.children;
                this.loading = false;
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.log(e);
                });
            }, () => {
                this.loading = false;
            });
        },
        loadFileList() {
            return getFilesList({
                start: (this.pageIndex - 1) * this.pageSize + 1,
                count: this.pageSize,
                path: this.currentPath,
                orderBy: this.orderBy,
                order: this.order
            });
        },
        async getRenderList(offset, limit) {
            // 获取需要渲染到列表中的数据
            return Object.freeze(await this.db.list.offset(offset).limit(limit).toArray());
        },
        getUploadFiles() {
            return this.$refs.operationBar.$refs.fileUploader.getUploadFiles();
        }
    },
    created() {
        // load data from storage
        this.currentPath = '';
    },
    mounted() {
        const db = new Dexie('SkyIDE-File');
        db.version(1).stores({
            list: '++,path,ownerId,name,filesystem,isFile,mimeType,fileExtension,fileShareId,createdAt,updatedAt,size'
        });
        this.db = db;
        this.enterDirectory(this.currentPath);
        this.$refs.breadcrumbBar.buildBreadcrumb('');
    },
    watch: {
        currentPath(val, oldVal) {
            if (val !== oldVal) {
                this.enterDirectory(val);
                this.$refs.breadcrumbBar.buildBreadcrumb(val);
            }
        },
        rootPath(val, oldVal) {
            if (val !== oldVal) this.currentPath = val;
        }
    }
};
</script>

<style lang="scss" scoped>
// .sdxv-file-main {
//     height: 100%;
//     padding-top: 20px;
//     /deep/ .sdxu-content-panel__main {
//         padding-top: 10px;
//     }
// }
</style>

<style lang="scss">
.file-main {
    width: 100%;
    height: 100%;
    padding: 10px;
    user-select: none;
    .el-table tr td,
    .el-table tr th.is-leaf {
        border-top: none;
        height: 30px;
        padding: 2px 0;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #fff;
    }
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgba(0, 0, 0, .1);
        border-radius: 4px;
    }
}
</style>
