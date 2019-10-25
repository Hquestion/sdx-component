<template>
    <div class="sdxv-task-file-upload">
        <SdxuTable
            :data="list"
            height="420"
            style="width: 560px"
            size="small"
        >
            <el-table-column
                :label="t('view.file.FileName')"
                min-width="90"
                prop="name"
                show-overflow-tooltip
            />
            <el-table-column
                :label="t('sdxCommon.Size')"
                min-width="40"
                prop="size"
            >
                <template slot-scope="scope">
                    {{ scope.row.size | byteFormatter }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Status')"
                min-width="120"
            >
                <template slot-scope="scope">
                    <div>
                        <SdxwFoldLabel :label="getRowLabel(scope.row)" :plain="true" :type="getRowType(scope.row)" :status="getRowStatus(scope.row)"/>
                    </div>
                    <el-progress
                        :percentage="parseFloat(scope.row.percentage.toFixed(0))"
                        :status="scope.row.status === 'success'?'success':''"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Operation')"
                min-width="40"
            >
                <template slot-scope="scope">
                    <div
                        class="handle-bar"
                        v-if="scope.row.status === 'success' || scope.row.status === 'error'"
                    >
                        <SdxuIconButton icon="sdx-icon sdx-icon-delete" :title="t('sdxCommon.Delete')" @click="handleCancelUpload(scope.row)" />
                    </div>
                    <div
                        class="handle-bar"
                        v-else
                    >
                        <SdxuIconButton icon="sdx-icon sdx-tingzhi" :title="t('sdxCommon.Stop')" @click="handleCancelUpload(scope.row)" />
                    </div>
                </template>
            </el-table-column>
        </SdxuTable>
    </div>
</template>

<script>
import SdxuTable from '@sdx/ui/components/table';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import transformMixin from '@sdx/utils/src/mixins/transformFilter';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxvTaskFileUpload',
    components: {
        SdxuTable,
        SdxwFoldLabel: SdxwFoldLabel.FoldLabel,
        SdxuIconButton
    },
    mixins: [transformMixin, locale],
    inject: ['fileManager'],
    data() {
        return {

        };
    },
    computed: {
        list() {
            return this.fileManager.uploadingFiles || [];
        }
    },
    methods: {
        handleCancelUpload(row) {
            this.fileManager.$refs.operationBar.$refs.fileUploader.handleRemove(row);
        },
        getRowLabel(row) {
            let label = this.t('view.file.Uploading');
            if (row.status === 'success') {
                label = this.t('view.file.Finish');
            } else if (row.status === 'error'){
                label = this.t('view.file.UploadFail');
            }
            return label;
        },
        getRowType(row) {
            let label = 'create';
            if (row.status === 'success') {
                label = 'finish';
            } else if (row.status === 'error'){
                label = 'error';
            }
            return label;
        },
        getRowStatus(row) {
            let label = 'loading';
            if (row.status === 'success') {
                label = '';
            } else if (row.status === 'error'){
                label = 'warning';
            }
            return label;
        },
        isTaskEmpty() {
            return this.list.every(item => item.status === 'success' || item.status === 'error');
        },
        isListEmpty() {
            return this.list.length === 0;
        },
        deleteAllTasks() {
            this.list.forEach(file => this.handleCancelUpload(file));
        }
    },
    watch: {
        list: {
            deep: true,
            immediate: false,
            handler() {
                if (this.isTaskEmpty()) {
                    this.$emit('empty');
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~@sdx/utils/src/theme-common/var";
    .option-icon {
        color: $sdx-info-color;
    }
</style>
