<template>
    <div class="sdxv-task-manage-tasklist">
        <div class="condition">
            <SdxwSearchLayout>
                <SdxwSearchItem label="所属组：">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="类型">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
            </SdxwSearchLayout>
        </div>
        <div class="table">
            <sdxu-table>
                <el-table-column
                    :data="table"
                    :label="'任务名称'"
                />
                <el-table-column
               
                    :label="'类型'"
                /> 
                <el-table-column
               
                    :label="'配置GPU'"
                /> 
                <el-table-column
               
                    :label="'配置内存'"
                />
                <el-table-column
               
                    :label="'配置GPU'"
                />
                <el-table-column
               
                    :label="'创建人'"
                />
                <el-table-column
               
                    :label="'所属组'"
                />
                <el-table-column
               
                    :label="'创建时间'"
                />
                <el-table-column
                    :label="t('sdxCommon.Operation')"
                >
                    <template #default="{ row }">
                        <sdxu-icon-button
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                        />
                    </template>
                </el-table-column>
            </sdxu-table>
        </div>
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
export default {
    name: 'SdxvTaskList',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable
    },
    data() {
        return {
            
        };
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-tasklist {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 4px;
    }
    .condition {
        @extend .panel;
        height: 100px;
        line-height: 100px;
    }
    .table {
        @extend .panel;
        margin-top: 24px;
        height: calc(100vh - 442px);
        padding: 24px;
    }
}
</style>