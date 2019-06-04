<template>
    <SdxuContentPanel
        :fullscreen="true"
        class="sdxv-file-main"
    >
        <OperationBar />
        <BreadcrumbBar />
        <FileTable ref="fileTable" />
        <SdxvFileTask :visible.sync="taskVisible" />
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import Dexie from 'dexie';
import OperationBar from './OperationBar';
import FileTable from './FileTable';

import { getFilesList } from '@sdx/utils/src/api/file';
import { rootKinds, fixedRows, fixedRowsNameMap, getDirRootKind } from './helper/fileListTool';
import BreadcrumbBar from './BreadcrumbBar';
import SdxvFileTask from './popup/FileTask';

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
            // 根路径类型，默认为空表示普通文件夹，用于区分我的共享/接收的共享/项目共享
            rootKind: '',
            // 是否处于搜索模式
            isSearch: false,
            // 是否正在请求数据
            loading: false,
            // 排序信息
            orderBy: 'name',
            order: 'asc',
            fixedRows,
            taskVisible: false
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
            return this.currentPath === '/fe-fixed-project-share';
        },
        enterDirectory(dir) {
            // 重置页码
            this.pageIndex = 1;
            // 重置缓存的fileList
            this.renderFiles = [];
            this.fileList = [];
            this.total = 0;
            this.loadedTotal = 0;
            this.isSearch = false;
            this.checked = [];
            this.checkedMap = {};
            this.isCheckAll = false;
            // 更新路径
            this.currentPath = dir;
            this.isRoot = dir === '/';
            this.rootKind = getDirRootKind(dir);
            // 修改为加载中，准备获取数据
            this.loading = true;
            this.db.list.clear();
            this.$refs.fileTable.init();

            let defer;
            const deferMap = {
                [rootKinds.MY_SHARE]: this.loadFileList,
                [rootKinds.ACCEPTED_SHARE]: this.loadFileList,
                [rootKinds.PROJECT_SHARE]: this.loadFileList
            };
            if (this.rootKind === '') {
                defer = this.loadFileList();
            } else {
                defer = deferMap[this.rootKind]();
            }
            return defer.then(res => {
                let fileList = res.children;
                this.total = res.total;
                this.loading = false;
                if (this.isRoot) {
                    fileList = fixedRows.concat(fileList);
                }
                return this.db.list.bulkAdd(fileList).then(() => {
                    this.loadedTotal += fileList.length;
                }, e => {
                    window.console.log(e);
                });
            }, () => {
                this.total = 0;
                this.loading = false;
            }).then(res => {
                this.$nextTick(() => {
                    this.$refs.fileTable.calcViewportVisible();
                });
            });
        },
        loadNextPage() {
            if (this.isSearch) {
                // 搜所分页
            } else {
                // 根据当前路径分页请求
                if (this.loading) return;
                if (this.loadedTotal >= this.total) return;
                this.loading = true;
                this.pageIndex ++;
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
            return getFilesList({
                start: (this.pageIndex - 1) * this.pageSize,
                count: this.pageSize,
                path: this.currentPath,
                orderBy: this.orderBy,
                order: this.order
            });
        },
        loadSearchResult() {

        },
        async getRenderList(offset, limit) {
            // 获取需要渲染到列表中的数据
            return Object.freeze(await this.db.list.offset(offset).limit(limit).toArray());
        }
    },
    mounted() {
        const db = new Dexie('SdxvFile');
        db.version(1).stores({
            list: '++,userId,name,path,filesystem,isFile,mimeType,fileExtension,fileShareDetailId,createdAt,updatedAt,size'
        });
        this.db = db;
        this.currentPath = this.$route.query.path || '/';
        this.enterDirectory(this.currentPath);
    },
    watch: {
        $route(val, oldval) {
            this.currentPath = val.query.path || '/';
            if (val.query.path !== oldval.query.path) {
                this.enterDirectory(this.currentPath);
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
