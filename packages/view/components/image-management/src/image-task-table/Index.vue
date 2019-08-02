<template>
    <div
        class="sdxv-image-task"
        v-loading="loading"
    >
        <div class="content">
            <SdxuTable
                :data="tableData"
                @sort-change="handleSortChange"
                :default-sort="{prop: 'createdAt', order: 'descending'}"
            >
                <el-table-column
                    prop="name"
                    :label="t('view.image.Columns.imageName')"
                />
                <el-table-column
                    prop="version"
                    :label="t('view.image.Columns.version')"
                />
                <el-table-column
                    prop="imageType"
                    :label="t('view.image.Columns.imageType')"
                />
                <el-table-column
                    prop="buildTypeText"
                    :label="t('view.image.Columns.buildType')"
                />
                <el-table-column
                    :label="t('view.image.Columns.state')"
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
                            {{ t(`view.image.States.${(scope.row.state.label).slice(0, 1) + (scope.row.state.label).slice(1).toLocaleLowerCase()}`) }}
                        </SdxwFoldLabel>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createdAt"
                    :label="t('view.image.Columns.createdAt')"
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
                    :label="t('sdxCommon.Operation')"
                >
                    <template
                        slot-scope="scope"
                        class="icon"
                    >
                        <SdxuIconButton
                            icon="sdx-icon sdx-baobijiao"
                            :title="t('view.image.Columns.compare')"
                            v-if="scope.row.showDiff"
                            @click="handleShowCompareDialog(scope.row)"
                        />
                        <SdxuIconButton
                            icon="sdx-icon sdx-chakanrizhi"
                            :title="t('view.image.Columns.viewLog')"
                            v-if="scope.row.showLog"
                            @click="handelShowBuilderLog(scope.row.uuid)"
                        />
                        <SdxuIconButton
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                            v-if="scope.row.showRemove"
                            @click="deleteImageTask(scope.row.uuid)"
                        />
                    </template>
                </el-table-column>
            </SdxuTable>
        </div>
       
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
import { getUser } from '@sdx/utils/src/helper/shareCenter';
import { BUILD_TYPE_LABEL } from '@sdx/utils/src/const/image';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'ImageTaskTable',
    mixins: [locale],
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
            loading: false,
            refreshTimer: null
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
    beforeDestroy () {
        clearInterval(this.refreshTimer);
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
            const currentUser = getUser();
            removeBlankAttr(params);
            getImageTaskList(params)
                .then(data =>{
                    this.tableData = data.data;
                    this.total = data.total;
                    this.tableData.forEach(item => {
                        const isOwnImage = (item.owner && item.owner.uuid) === currentUser.userId;
                        item.showDiff = isOwnImage && item.buildType === 'ONLINE';
                        item.showRemove = isOwnImage && (item.state.label === 'FAILED' || item.state.label  === 'FINISHED');
                        item.showLog = isOwnImage;
                        item.buildTypeText = BUILD_TYPE_LABEL[item.buildType];
                    });
                    if (this.tableData.length && this.tableData.find(item => item.state.needPull)) {
                        if (!this.refreshTimer) {
                            this.refreshTimer = setInterval(this.initImageTaskList, 3000, false, true);
                        }
                    } else {
                        clearInterval(this.refreshTimer);
                    }
                }).finally(() => {
                    this.loading = false;
                });
        },
        deleteImageTask(id) {MessageBox.confirm.error({
            title: this.t('view.image.delete_the_selected_mirror_task'),
            content: this.t('view.image.can_not_be_restored_after_deletion'),
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
        initImageTaskList(reset, hideLoading) {
            if (reset) this.current = 1;
            this.loading = hideLoading ? false : true;
            const params = {
                name: this.name,
                ...paginate(this.current, this.pageSize),
                imageType: this.imageType,
                buildType: this.buildType,
                state:this.state,
                order: this.searchTask.order,
                orderBy: this.searchTask.orderBy,
                ownerId: getUser().userId
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
