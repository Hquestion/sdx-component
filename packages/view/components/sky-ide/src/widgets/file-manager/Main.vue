<template>
    <div
        class="skyide-file-main"
        tabindex="1"
    >
        <OperationBar ref="operationBar" />
        <BreadcrumbBar ref="breadcrumbBar" />
        <FileTable ref="fileTable" />
    </div>
</template>

<script>
import OperationBar from './OperationBar';
import FileTable from './FileTable';
import BreadcrumbBar from './BreadcrumbBar';
import locale from '@sdx/utils/src/mixins/locale';

import { getFilesList } from '@sdx/utils/src/api/file';

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
    mixins: [locale],
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
    inject: {
        app: {
            default: () => {}
        }
    },
    computed: {
        fileTable() {
            return this.$refs.fileTable;
        }
    },
    methods: {
        isProjectRoot() {
            return false;
        },
        isAcceptedRoot() {
            return false;
        },
        isMyShareRoot() {
            return false;
        },
        isShareRoot() {
            return false;
        },
        resetFlags(keepList) {
            // 重置页码
            this.pageIndex = 1;
            // 重置缓存的fileList
            if (!keepList) this.renderFiles = [];
            this.total = 0;
            this.loadedTotal = 0;
            this.searchKey = '';
        },
        enterDirectory(dir, keepList) {
            this.resetFlags(keepList);
            this.isSearch = false;
            // 更新路径
            this.currentPath = dir;
            this.isRoot = dir === '/';
            this.$refs.fileTable.emptyLabel = this.t('view.file.Loading');
            // 修改为加载中，准备获取数据
            this.loading = true;
            // 滚动到页面顶部
            this.$refs.fileTable.init();

            let defer = this.loadFileList();
            return defer.then(res => {
                let fileList = res.children;
                if (!fileList.length) this.$refs.fileTable.emptyLabel = '';
                this.renderFiles = res.children;
                this.total = res.childrenCount;
                this.loadedTotal += fileList.length;
                this.loading = false;
            }, () => {
                this.total = 0;
                this.loading = false;
                this.loadedTotal = 0;
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
                this.renderFiles.push(...fileList);
                this.loading = false;
                this.loadedTotal += fileList.length;
            }, () => {
                this.loading = false;
            });
        },
        loadFileList() {
            return getFilesList({
                start: (this.pageIndex - 1) * this.pageSize + 1,
                count: -1,
                path: this.currentPath,
                orderBy: this.orderBy,
                order: this.order
            });
        },
        getRenderList() {
            // 获取需要渲染到列表中的数据
            return Promise.resolve(this.renderFiles);
        },
        refresh() {
            this.enterDirectory(this.currentPath, true);
        },
        makeFile() {
            this.$refs.fileTable.makeFile();
        },
        handleFileDelete(fileRemoved) {
            this.renderFiles.splice(this.renderFiles.findIndex((item => item === fileRemoved)), 1);
        }
    },
    created() {
        this.currentPath = this.app.file.currentPath;
    },
    mounted() {
        this.enterDirectory(this.currentPath);
        this.$refs.breadcrumbBar.buildBreadcrumb('');
    },
    watch: {
        currentPath(val, oldVal) {
            if (val !== oldVal) {
                this.enterDirectory(val);
                this.$refs.breadcrumbBar.buildBreadcrumb(val);
                this.app.file.currentPath = val;
            }
        },
        rootPath(val, oldVal) {
            if (val !== oldVal) this.currentPath = val;
        }
    }
};
</script>

<style lang="scss" scoped>
.skyide-file-main {
    width: 100%;
    height: 100%;
    user-select: none;
    box-sizing: border-box;
    & /deep/ {
        .el-table tr td,
        .el-table tr th.is-leaf {
            border-top: none;
            height: 30px;
            padding: 2px 0;
        }
    }
}
</style>
