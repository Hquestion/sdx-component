<template>
    <div class="sdxv-package-table">
        <sdxu-table>
            <el-table-column
                :data="table"
                :label="'执行ID'"
            />
            <el-table-column
               
                :label="'执行方式'"
            /> 
            <el-table-column
               
                :label="'执行开始时间'"
            /> 
            <el-table-column
               
                :label="'执行结束时间'"
            />
            <el-table-column
               
                :label="'执行时长'"
            />
            <el-table-column
               
                :label="'状态'"
            />
            <el-table-column
                :label="t('sdxCommon.Operation')"
            >
                <template #default="{ row }">
                    <sdxu-icon-button
                        icon="sdx-icon sdx-shengji"
                        :title="t('sdxCommon.Upgrade')"
                    />
                    <sdxu-icon-button
                        icon="sdx-icon sdx-icon-delete"
                        :title="t('sdxCommon.Delete')"
                    />
                    <sdxu-icon-button
                        icon="sdx-icon sdx-icon-delete"
                        :title="t('sdxCommon.Delete')"
                    />
                    <sdxu-icon-button
                        icon="sdx-icon sdx-icon-delete"
                        :title="t('sdxCommon.Delete')"
                    />
                </template>
            </el-table-column>
        </sdxu-table>
    </div>
</template>

<script>
import SdxuInput from '@sdx/ui/components/input';
import SdxuButton from '@sdx/ui/components/button';
import SdxuIconButton from '@sdx/ui/components/icon-button';
import SdxuTable from '@sdx/ui/components/table';
import locale from '@sdx/utils/src/mixins/locale';

export default {
    name: 'SdxvPackageTable',
    mixins: [locale],
    components: {
        SdxuInput,
        SdxuButton,
        SdxuIconButton,
        SdxuTable,
    },
    props: {
        
    },
    data() {
        return {
            table: []
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

<style>

</style>
