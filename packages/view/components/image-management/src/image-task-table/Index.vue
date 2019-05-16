<template>
    <div class="sdxv-image-task">
        <SdxuTable
            :data="tableData"  
        >
            <el-table-column
                prop="name"
                label="镜像名称"
            />
            <el-table-column
                prop="version"
                label="版本号"
            />
            <el-table-column
                prop="imageType"
                label="镜像种类"
            />
            <el-table-column
                prop="buildType"
                label="构建方式"
            />
            <el-table-column
                label="状态"
                prop="state"
            >
                <template
                    slot-scope="scope"
                >
                    <SdxwFoldLabel
                        :plain="true"
                        :type="imageTaskLabel[scope.row.state.label]"
                        :status="scope.row.state.needPull ? 'loading' : ''"
                    >
                        {{ scope.row.state.content }}
                    </SdxwFoldLabel>
                </template>
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间"
            />
            <el-table-column
                style="width: 15%"
                label="操作"
            >
                <template
                    slot-scope="scope"
                    class="icon"
                >
                    <SdxuIconButton
                        icon="sdx-icon sdx-baobijiao"
                        title="比较"
                        v-if="scope.row.operations.includes('diff')"
                    />
                    <SdxuIconButton
                        icon="sdx-icon sdx-chakanrizhi"
                        title="查看日志"
                        v-if="scope.row.operations.includes('log')"
                    />
                    <SdxuIconButton
                        icon="sdx-icon sdx-icon-delete"
                        title="删除"
                        v-if="scope.row.operations.includes('remove')"
                        @click="deleteImageTask(scope.row.uuid)"
                    />
                </template>
            </el-table-column>
        </SdxuTable>
        <div class="pagination">
            <sdxu-pagination
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import {getImageTaskList, removeImageTask} from '@sdx/utils/src/api/image';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuPagination from '@sdx/ui/components/pagination';
import FoldLabel from '@sdx/widget/components/fold-label';
import {imageTaskLabel} from '@sdx/utils/src/consts/relation';
export default {
    name: '',
    data() {
        return {
            tableData: [],
            searchTask: {
                imageType: '',
                name: '',
                version: '',
                projectName: '',
                state: '',
                buildType: '',
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'createdAt'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            imageTaskLabel
        };
    },
    components: {
        SdxuTable,
        SdxuIconButton,
        SdxuPagination,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
    },
    methods: {
        taskList() {
            getImageTaskList(this.searchTask)
                .then(data =>{
                    this.tableData = data.data;
                    this.total = data.total;
                });
        },
        deleteImageTask(id) {MessageBox.confirm.error({
            title: '确定要删除选中的镜像任务吗？',
            content: '确定删除后不可恢复哦',
            type: 'alert'
        }).then(() => {
            removeImageTask(id)
                .then(()=> {
                    this.taskList();
                });
        });    
        },
        currentChange() {
            this.searchTask = Object.assign({}, this.searchTask, {
                start: (this.current - 1) * 10 + 1
            });
            this.taskList();
        },
    },
    created() {
        this.taskList();
    }
};
</script>

<style scoped lang="scss">
</style>
