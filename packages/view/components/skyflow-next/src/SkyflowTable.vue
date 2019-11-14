<template>
    <div class="sdxv-skyflow-table">
        <sdxu-table
            :data="table"
        >
            <el-table-column
                prop="id"
                :label="'执行ID'"
            />
            <el-table-column
                prop="execute"
                :label="'执行方式'"
            /> 
            <el-table-column
                prop="startTime"
                :label="'执行开始时间'"
            /> 
            <el-table-column
                prop="endTime"
                :label="'执行结束时间'"
            />
            <el-table-column
                prop="executionTime"
                :label="'执行时长'"
            />
            <el-table-column
                prop="state"
                :label="'状态'"
            >
                <template #default="{ row }">
                    <SdxwFoldLabel
                        :plain="true"
                        :type="row.state"
                    >
                        已完成
                    </SdxwFoldLabel>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('sdxCommon.Operation')"
                min-width="172px"
            >
                <template #default="{ row }">
                    <SdxuIconButtonGroup>
                        <SdxuButton
                            type="primary"
                            size="regular"
                            :plain="true"
                        >
                            {{ '取消执行' }}
                        </SdxuButton>
                        <SdxuButton
                            type="primary"
                            size="regular"
                            :plain="true"
                        >
                            {{ '详情' }}
                        </SdxuButton>
                        <sdxu-icon-button
                           
                            icon="sdx-icon sdx-icon-delete"
                            :title="t('sdxCommon.Delete')"
                        />
                        <sdxu-icon-button
                           
                            icon="sdx-icon sdx-icon-edit"
                            :title="t('sdxCommon.Edit')"
                        />
                    </SdxuIconButtonGroup>
                </template>
            </el-table-column>
        </sdxu-table>
    </div>
</template>

<script>
import SdxuButton from '@sdx/ui/components/button';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';
import SdxwFoldLabel from '@sdx/widget/components/fold-label';
import SdxuIconButtonGroup from '@sdx/ui/components/icon-button-group';

export default {
    name: 'SdxvPackageTable',
    mixins: [locale],
    components: {
        SdxuButton,
        SdxuTable,
        SdxwFoldLabel: SdxwFoldLabel.FoldLabel,
        SdxuIconButtonGroup
    },
    props: {
        
    },
    data() {
        return {
            table: [{
                id: '2016-05-02',
                execute: '手动执行',
                startTime: '2016-05-02',
                endTime: '2016-05-02',
                executionTime: '1m3s',
                finish: 'finish'
            }, {
                id: '2016-05-02',
                execute: '手动执行',
                startTime: '2016-05-02',
                endTime: '2016-05-02',
                executionTime: '1m3s',
                finish: 'finish'
            }, {
                id: '2016-05-02',
                execute: '手动执行',
                startTime: '2016-05-02',
                endTime: '2016-05-02',
                executionTime: '1m3s',
                finish: 'finish'
            }, {
                id: '2016-05-02',
                execute: '手动执行',
                startTime: '2016-05-02',
                endTime: '2016-05-02',
                executionTime: '1m3s',
                finish: 'finish'
            }]
        };
    },
    computed: {
       
    },
    methods: {

    },
    watch: {
        
    },
    created() {
     
    }
};
</script>

<style lang="scss" scoped>
.sdxv-skyflow-table {
    & /deep/ {
        .sdxu-button {
            padding: 0;
        }
    }
}
</style>
