<template>
    <div
        class="sdxv-image-task"
        v-loading="loading"
    >
        <SdxuTable
            :data="tableData"
            @sort-change="handleSortChange"
            :default-sort="{prop: 'createdAt', order: 'descending'}"
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
                sortable="custom"
            >
                <template
                    slot-scope="scope"
                >
                    {{ dateFormatter(scope.row.createdAt) }}
                </template>
            </el-table-column>
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
                        @click="handleShowCompareDialog(scope.row)"
                    />
                    <SdxuIconButton
                        icon="sdx-icon sdx-chakanrizhi"
                        title="查看日志"
                        v-if="scope.row.operations.includes('log')"
                        @click="handelShowBuilderLog(scope.row.uuid)"
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
                v-if="total"
                :current-page.sync="current"
                :page-size="pageSize"
                :total="total"
                @current-change="currentChange"
            />
        </div>
        <package-detail-compare-dialog
            :visible.sync="showComparePackageDialog"
            :image-builder="currentImageBuilder"
        />
        <build-log-dialog
            :visible.sync="showBuildLogDialog"
            :image-builder-id="currentImageBuilderId"
        />
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import {getImageTaskList, removeImageTask} from '@sdx/utils/src/api/image';
import { removeBlankAttr, paginate } from '@sdx/utils/src/helper/tool';
import MessageBox from '@sdx/ui/components/message-box';
import SdxuPagination from '@sdx/ui/components/pagination';
import FoldLabel from '@sdx/widget/components/fold-label';
import {imageTaskLabel} from '@sdx/utils/src/const/relation';
import PackageDetailCompareDialog from '../PackageDetailCompareDialog';
import BuildLogDialog from '../BuildLogDialog';
import {dateFormatter} from '@sdx/utils/src/helper/transform';
export default {
    name: 'ImageTaskTable',
    data() {
        return {
            tableData: [],
            searchTask: {
                start: 1,
                count: 10,
                order: 'desc',
                orderBy: 'createdAt'
            },
            current: 1,
            pageSize: 10,
            total: 0,
            imageTaskLabel,
            showComparePackageDialog: false,
            currentImageBuilder: {},
            showBuildLogDialog: false,
            currentImageBuilderId: '',
            loading: false
        };
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: 'all'
        },
        imageType: {
            type: String,
            default: ''
        },
        buildType: {
            type: String,
            default: ''
        }
    },
    components: {
        SdxuTable,
        SdxuIconButton,
        SdxuPagination,
        [FoldLabel.FoldLabel.name]: FoldLabel.FoldLabel,
        PackageDetailCompareDialog,
        BuildLogDialog
    },
    methods: {
        dateFormatter,
        taskList(params) {
            removeBlankAttr(params);
            getImageTaskList(params)
                .then(data =>{
                    this.tableData = data.data;
                    this.total = data.total;
                }).finally(() => {
                    this.loading = false;
                });
        },
        deleteImageTask(id) {MessageBox.confirm.error({
            title: '确定要删除选中的镜像任务吗？',
            content: '确定删除后不可恢复哦',
            type: 'alert'
        }).then(() => {
            removeImageTask(id)
                .then(()=> {
                    this.initImageTaskList();
                });
        });
        },
        currentChange(val) {
            this.current = val;
            this.initImageTaskList();
        },
        initImageTaskList(reset) {
            if (reset) this.current = 1;
            this.loading = true;
            const params = {
                name: this.name,
                ...paginate(this.current, this.pageSize),
                imageType: this.imageType,
                buildType: this.buildType,
                state:this.state,
                order: this.searchTask.order,
                orderBy: this.searchTask.orderBy,
            };
            removeBlankAttr(params);
            this.taskList(params);
        },
        handleSortChange({ order }) {
            if (!order) {
                return;
            }
            this.searchTask.order = order === 'descending' ? 'desc' : 'asc';
            this.initImageTaskList();
        },
        handleShowCompareDialog(imageBuilder) {
            this.currentImageBuilder = imageBuilder;
            this.showComparePackageDialog = true;
        },
        handelShowBuilderLog(id) {
            this.currentImageBuilderId = id;
            this.showBuildLogDialog = true;
        },
    },

};
</script>

<style scoped lang="scss">
</style>
