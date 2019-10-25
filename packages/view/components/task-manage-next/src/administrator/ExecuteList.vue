<template>
    <div class="sdxv-task-manage-executelist">
        <div class="info">
            <div
                v-for="(item) in infoList"
                :key="item.title"
            >
                gg
            </div>
        </div>
        <div class="condition">
            <SdxwSearchLayout>
                <SdxwSearchItem label="类型:">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
                    <el-select
                        size="medium"
                    >
                        <el-option />
                    </el-select>
                </SdxwSearchItem>
                
                <SdxwSearchItem label="时间">
                    <el-date-picker
                        type="monthrange"
                        range-separator="-"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        size="medium"
                    />
                </SdxwSearchItem>
                <SdxwSearchItem label="状态">
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
    name: 'SdxvExecutelist',
    data() {
        return {
            infoList: [
                {
                    total: 123,
                    title: '执行记录总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行记录总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行记录总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行记录总数',
                    manual: 63,
                    dispatch: 60
                },
                {
                    total: 123,
                    title: '执行记录总数',
                    manual: 63,
                    dispatch: 60
                },
            ]
        };
    },
    mixins: [locale],
    components: {
        [SdxwSearchLayout.SearchLayout.name]: SdxwSearchLayout.SearchLayout,
        [SdxwSearchLayout.SearchItem.name]: SdxwSearchLayout.SearchItem,
        SdxuTable
    },
};
</script>

<style lang="scss" scoped>
.sdxv-task-manage-executelist {
    .panel {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #C2CDDE;
        border-radius: 4px;
    }
    .info {
        display: flex;
        justify-content: space-between;
        height: 168px;
        @extend .panel;
        div {
            width: 20%;
            text-align: center;
            border-right: 1px solid #E4E7ED;
        }
        div:last-child {
            border-right: none;
        }
    }
}
</style>