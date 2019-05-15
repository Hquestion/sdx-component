<template>
    <div class="">
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
                    {{ scope.row.content }}
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
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import {getImageTaskList, removeImageTask} from '@sdx/utils/src/api/image';
import MessageBox from '@sdx/ui/components/message-box';
export default {
    name: '',
    data() {
        return {
            tableData: [],
            total: 0,
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
        };
    },
    components: {
        SdxuTable,
        SdxuIconButton
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
            
        }
    },
    created() {
        this.taskList();
    }
};
</script>

<style scoped lang="scss">
</style>
