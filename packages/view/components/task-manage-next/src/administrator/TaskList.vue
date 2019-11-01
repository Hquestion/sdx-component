<template>
    <div class="sdxv-task-manage-tasklist">
        <SdxwSearchLayout ref="searchLayout">
            <SdxwSearchItem label="任务名称：">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="创建人：">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="所属组：">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
            <SdxwSearchItem label="类型：">
                <el-select
                    size="large"
                >
                    <el-option />
                </el-select>
            </SdxwSearchItem>
        </SdxwSearchLayout>
        <div class="table">
            <SdxuScroll>
                <sdxu-table>
                    <el-table-column
                        :data="table"
                        :label="'任务名称'"
                    />
                    <el-table-column
               
                        :label="'类型'"
                    /> 
                    <el-table-column
               
                        :label="'创建人'"
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
                <sdxu-pagination
                    class="pagination"
                    :page-size="10"
                    :total="45"
                />
            </sdxuscroll>
        </div>
    </div>
</template>

<script>
import SdxwSearchLayout from '@sdx/widget/components/search-layout';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
import SdxuPagination from '@sdx/ui/components/pagination';
import SdxuScroll from '@sdx/ui/components/scroll';
export default {
    name: 'SdxvTaskList',
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable,
        SdxuPagination,
        SdxuScroll
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    }
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-tasklist {
    & /deep/ {
        .__view {
            width: 100% !important;
        }
    }
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 2px;
    }
    .table {
        @extend .panel;
        margin-top: 24px;
        height: calc(100vh - 378px);
        padding: 24px;
    }
    .pagination {
        margin-top: 24px;
    }
}
</style>