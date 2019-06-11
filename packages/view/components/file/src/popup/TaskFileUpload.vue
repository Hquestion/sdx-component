<template>
    <div class="sdxv-task-file-upload">
        <SdxuTable
            :data="list"
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
    data() {
        return {
            list: [
                {
                    name: '文件名称.csv',
                    size: 1000,
                    status: 'uploading',
                    percentage: 80
                },
                {
                    name: '文件名称.csv',
                    size: 1000,
                    status: 'success',
                    percentage: 80
                },
                {
                    name: '文件名称.csv',
                    size: 1000,
                    status: 'error',
                    percentage: 80
                }
            ]
        };
    },
    props: {
        uploadFileList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        handleCancelUpload() {},
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
        }
    },
    watch: {
        uploadFileList: {
            deep: true,
            handler(val) {
                if (val.every(item => item.status === 'success')) {
                    this.$emit('upload-list-empty');
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
