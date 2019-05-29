<template>
    <SdxuContentPanel :fullscreen="true" class="sdxv-file-main">
        <OperationBar></OperationBar>
        <BreadcrumbBar></BreadcrumbBar>
        <FileTable></FileTable>
    </SdxuContentPanel>
</template>

<script>
import SdxuContentPanel from '@sdx/ui/components/content-panel';
import OperationBar from './OperationBar';
import FileTable from './FileTable';

import { getFilesList } from '@sdx/utils/src/api/file';
import { rootKinds } from './helper/fileListTool';
import BreadcrumbBar from './BreadcrumbBar';

const fixedRows = [
    {name: '我的共享', isFile: false, path: '/fe-fixed-my-share', fixed: true, key: rootKinds.MY_SHARE},
    {name: '收到的共享', isFile: false, path: '/fe-fixed-accepted-share', fixed: true, key: rootKinds.ACCEPTED_SHARE},
    {name: '协作项目文件', isFile: false, path: '/fe-fixed-project-share', fixed: true, key: rootKinds.PROJECT_SHARE}
];

export default {
    name: 'SdxvFileMain',
    data() {
        return {
            // 选中的个数
            checked: [],
            checkedMap: {},
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
            isSearch: false
        };
    },
    components: {
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
    mounted() {
        getFilesList().then(res => {
            this.fileList = res.children;
            this.total = res.total;
        });
    }
};
</script>

<style lang="scss" scoped>
.sdxv-file-main {
    height: 100%;
}
</style>
