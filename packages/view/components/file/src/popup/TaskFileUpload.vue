<template>
    <div class="sdxv-task-file-upload">
        <SdxuTable
            :data="list"
            height="420"
            style="width: 100%"
            size="small"
        >
            <el-table-column
                label="文件名"
                min-width="90"
                prop="name"
                show-overflow-tooltip
            />
            <el-table-column
                label="大小"
                min-width="40"
                prop="size"
            >
                <template slot-scope="scope">
                    {{ scope.row.size }}
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
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
                label="操作"
                min-width="40"
            >
                <template slot-scope="scope">
                    <div
                        class="handle-bar"
                        v-show="scope.row.status === 'success' || scope.row.status === 'error'"
                    >
                        <SdxuIconButton icon="sdx-icon sdx-icon-delete" title="删除" @click="handleCancelUpload(scope.row)" />
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
export default {
    name: 'SdxvTaskFileUpload',
    components: {
        SdxuTable,
        SdxwFoldLabel: SdxwFoldLabel.FoldLabel,
        SdxuIconButton
    },
    inject: ['fileManager'],
    data() {
        return {

        };
    },
    props: {
        uploadFileList: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        list() {
            return this.fileManager.uploadingFiles;
        }
    },
    methods: {
        handleCancelUpload(row) {
            this.fileManager.$refs.operationBar.$refs.fileUploader.handleRemove(row);
        },
        getRowLabel(row) {
            let label = '上传中';
            if (row.status === 'success') {
                label = '已完成';
            } else if (row.status === 'error'){
                label = '上传失败';
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
        isEmpty() {
            return this.list.every(item => item.status === 'success' || item.status === 'error');
        }
    },
    watch: {
        list: {
            deep: true,
            immediate: false,
            handler(val) {
                if (val.every(item => item.status === 'success' || item.status === 'error')) {
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
